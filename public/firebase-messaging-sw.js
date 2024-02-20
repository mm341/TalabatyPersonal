importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBNIn1V247leTpKIMRsgTxgOCGyQaUHs2k",
  authDomain: "talabatee-7f524.firebaseapp.com",
  projectId: "talabatee-7f524",
  storageBucket: "talabatee-7f524.appspot.com",
  messagingSenderId: "137569750943",
  appId: "1:137569750943:web:2f6902ea16e2b45d36f7aa",
  measurementId: "G-6Y2F6LLL18"
};

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
