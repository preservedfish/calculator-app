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
  // Regex limits input to digits and math operators
  const sanitizedInput = calculation.replace(/[^0-9*/%.()+-]/gim, '').trim();

  // eslint-disable-next-line no-eval
  const result = eval(sanitizedInput);
  db.ref('calculations').push({
    calculation: sanitizedInput,
    result,
  });
};

const getCalculations = (setCalculations) => {
  // Listener that triggers once then every time the data changes
  db.ref('calculations').on('value', (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();

      /* Array is reversed so that most recent calculations are first
      In the database, the calculation objects are the values of id keys
      So nested objects are turned into normal objects with a new id property
      */
      const transformedData = Object.keys(data)
        .map((key) => ({
          id: key,
          ...data[key],
        }))
        .reverse();

      setCalculations(
        transformedData.slice(0, transformedData.length <= 10 ? undefined : 10)
      );
    }
  });
};

export default { createCalculation, getCalculations };
