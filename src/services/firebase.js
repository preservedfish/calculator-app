import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

firebase.auth().signInAnonymously();
const db = firebase.database();

const createCalculation = (calculation) => {
  const sanitizedInput = calculation.replace(/[^0-9*/%.()+-]/gim, '').trim();
  // eslint-disable-next-line no-eval
  const result = eval(sanitizedInput);
  db.ref('calculations').push({
    calculation: sanitizedInput,
    result,
  });
};

const getCalculations = (setCalculations) => {
  db.ref('calculations').on('value', (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const transformedData = Object.keys(data)
        .map((key) => ({
          id: key,
          ...data[key],
        }))
        .reverse();
      setCalculations(
        transformedData.slice(0, transformedData.length <= 10 ? undefined : 10)
      );
    } else {
      throw new Error("Couldn't fetch calculations");
    }
  });
};

export default { createCalculation, getCalculations };
