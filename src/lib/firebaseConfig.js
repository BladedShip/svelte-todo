import { API_KEY,AUTH_DOMAIN,PROJECT_ID,STORAGE_BUCKET,MESSAGING_SENDER_ID,APP_ID } from '$env/static/private';

export const firebaseConfig = {
    apiKey: import.meta.env.API_KEY,
    authDomain: import.meta.env.AUTH_DOMAIN,
    projectId: import.meta.env.PROJECT_ID,
    storageBucket: import.meta.env.STORAGE_BUCKET,
    messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,
    appId: import.meta.env.APP_ID
  };

