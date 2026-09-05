export function notifyUser(title = 'Timer is up!', body = 'Your timer has ended.') {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.showNotification(title, {
        body: body,
        icon: '/office-time-calculator/notification-icon.png',
        badge: '/office-time-calculator/badge-icon.png',
        vibrate: [300, 100, 300],
      })
    })
  }
}

export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    return false
  }

  const permission = await Notification.requestPermission()
  return permission === 'granted'
}

export const scheduleNotification = (title, options, delay) => {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return
  }

  setTimeout(() => {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(title, {
        ...options,
        icon: options.icon || '/office-time-calculator/notification-icon.png',
        badge: options.badge || '/office-time-calculator/badge-icon.png',
        requireInteraction: true,
      })
    })
  }, delay)
}

// @deprecated
export function requestNotificationPermissionGPT() {
  if (Notification.permission !== 'granted') {
    Notification.requestPermission().then(function (permission) {
      if (permission === 'granted') {
        console.log('Notification permission granted')
      } else {
        console.log('Notification permission denied')
      }
    })
  }
}
