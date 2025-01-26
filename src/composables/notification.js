export function notifyUser() {
  if (Notification.permission === 'granted') {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(function (registration) {
        registration.showNotification('Timer is up!', {
          body: 'Your timer has ended.',
          icon: '/icon.png', // Path to your notification icon
        })
      })
    }
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
        icon: '/icon.png',
        badge: '/badge.png',
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
