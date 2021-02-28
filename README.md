# Calculator App

A calculator app built for an exercise. Uses React and Firebase. 

The last 10 calculations are displayed and synced among users. The calculator supports basic Javascript arithmetic, `+, -, *, **, /, %`.

## To-Dos
Functionality-wise the program successfully performs calculations and displays the 10 most recent ones in descending order. There are a few more things to do, however:

1. Make a production build and deploy it

## Installation
### Installing the dependencies
Installing the dependencies is simple. First clone the repository using `git`:

    git clone https://github.com/preservedfish/calculator-app

Then switch to the directory and install the dependencies using `npm`:

    npm install
Before you start the program with `npm start` and access the calculator at http://localhost:3000, there's one more thing to do:
### Registering a Firebase project
This program uses a Firebase database, so you'll need to set one up yourself. First register at the [Firebase website](https://firebase.google.com/), then create a project. An in-depth tutorial can be found [here](https://www.robinwieruch.de/firebase-tutorial), but basically you'll have to setup a Realtime Database and allow anonymous sign-ins for authentication. This entails changing the Realtime Database rules like so:

    "rules": {
        ".read": "auth != null",
        ".write": "auth != null"
    }
Afterwards, go to Project Settings and find your config. It should resemble something like this: 

    const firebaseConfig = {
        apiKey: "phony-value",
        authDomain: "phony-value",
        databaseURL: "phony-value",
        projectId: "phony-value",
        storageBucket: "phony-value",
        messagingSenderId: "phony-value",
        appId: "phony-value"
    };
You'll need to add these to the program somehow. The easier but less secure way is to go to `/services/firebase.js` and replace the values in the `config` object with your own. The slightly more involved but secure way is to create a `.env` file in the root directory and incorporate your config as environment variables. It would look like this:

    REACT_APP_API_KEY=phony-value
    REACT_APP_AUTH_DOMAIN=phony-value
    REACT_APP_PROJECT_ID=phony-value
    REACT_APP_STORAGE_BUCKET=phony-value
    REACT_APP_MESSAGING_SENDER_ID=phony-value
    REACT_APP_APP_ID=phony-value
Either way, once you're done you just need to run `npm start` and access the program at http://localhost:3000.
