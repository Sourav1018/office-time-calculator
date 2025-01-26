// Use IndexedDB for persistent notification storage
const DB_NAME = 'NotificationDB';
const STORE_NAME = 'notifications';
let db;

// Initialize IndexedDB
function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

// Register background sync
async function registerBackgroundSync() {
  try {
    await self.registration.sync.register('check-notifications');
  } catch (err) {
    console.log('Background sync registration failed:', err);
  }
}

// Check notifications
async function checkNotifications() {
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.getAll();

  request.onsuccess = () => {
    const notifications = Array.from(request.result || []);
    const now = Date.now();

    notifications.forEach(notification => {
      if (now >= notification.scheduledTime) {
        self.registration.showNotification(notification.title, notification.options);
        store.delete(notification.id);
      }
    });
  };
}

// Installation handler
self.addEventListener('install', () => self.skipWaiting());

// Activation handler with DB init
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      clients.claim(),
      initDB().then(() => {
        registerBackgroundSync();
        setInterval(checkNotifications, 60000);
      })
    ])
  );
});

// Message handler for notification scheduling
self.addEventListener('message', async ({ data }) => {
  const { type } = data;

  const handlers = {
    'SCHEDULE_NOTIFICATION': async () => {
            // Wait for DB initialization if needed
            if (!db) {
              await initDB();
            }

      const notification = {
        id: 'checkout',
        title: data.title,
        options: {
          ...data.options,
          requireInteraction: true,
          tag: 'checkout-reminder'
        },
        scheduledTime: data.delay
      };

      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      await store.put(notification);
    },

    'CANCEL_NOTIFICATION': async () => {
      // Wait for DB initialization if needed
      if (!db) {
        await initDB();
      }

      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      await store.delete('checkout');
    }
  };

  await handlers[type]?.();
});

// Handle sync events
self.addEventListener('sync', (event) => {
  if (event.tag === 'check-notifications') {
    event.waitUntil(checkNotifications());
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  clients.openWindow('/office-time-calculator/');
});

// Keep service worker active
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
