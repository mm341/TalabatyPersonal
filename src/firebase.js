import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBNIn1V247leTpKIMRsgTxgOCGyQaUHs2k",
  authDomain: "talabatee-7f524.firebaseapp.com",
  projectId: "talabatee-7f524",
  storageBucket: "talabatee-7f524.appspot.com",
  messagingSenderId: "137569750943",
  appId: "1:137569750943:web:2f6902ea16e2b45d36f7aa",
  measurementId: "G-6Y2F6LLL18"
};
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey: "BHr2aawOakYpWTmDLO9WzKAUYqVcGTmsKOxnZm6A_9y7RrW4vU4YUpCrv3wD53wwelR23QEMuud_QmvZhlUukg4",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.error(err);
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
