import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCudAtPeTBCToIJNfF1huHI1LWHtreu8So',
  authDomain: 'nwitter-2fb63.firebaseapp.com',
  projectId: 'nwitter-2fb63',
  storageBucket: 'nwitter-2fb63.appspot.com',
  messagingSenderId: '919867594289',
  appId: '1:919867594289:web:29dc738bc28d1dc7842710',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
