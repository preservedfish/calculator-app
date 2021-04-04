# Calculator App

A calculator app built for an exercise. Mainly uses React and Firebase. Hosted here: https://calculator-56c99.web.app/

The last 10 calculations are displayed and synced among users. The calculator supports basic Javascript arithmetic, `+, -, *, **, /, %`.

## Technologies used
[React](https://reactjs.org/docs/getting-started.html) as the main library, [Firebase](https://firebase.google.com/docs) for the database and hosting, [Jest](https://jestjs.io/docs/en/getting-started) for testing.

[React Bootstrap](https://react-bootstrap.github.io/getting-started/introduction) for the UI framework, [Docker](https://docs.docker.com/) for container support.

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

## Docker
You can also run this program in a container via [Docker](https://www.docker.com/). The instructions will assume that you have Docker installed and already took care of registering a project with Firebase.

### Building an image
    docker build -t calculator-app .
Check that Docker is open and that your current directory is this program, then run the above command. This will create an image called calculator-app with a size around 573MB.

### Running a container
    docker run -e REACT_APP_API_KEY=phony-value -e REACT_APP_AUTH_DOMAIN=phony-value -e REACT_APP_PROJECT_ID=phony-value -e REACT_APP_STORAGE_BUCKET=phony-value -e REACT_APP_MESSAGING_SENDER_ID=phony-value -e REACT_APP_APP_ID=phony-value -p 3000:3000 calculator-app
Running a container is a bit more involved. You will enter the above command after the image has been created, but you'll also have to insert all of the values in your Firebase's config as environment variables. Replace each instance of `phony-value` in the above command with the appropriate value.

After the container is running, open http://localhost:3000 in a browser to access the calculator.

### Stopping the container
To stop the container, you can either enter the following in Command Prompt:

    docker stop <container_name>

...or stop it through the Docker Desktop client.

### Testing
To run this program's tests, run `npm test` in the root directory. Use `npm test -- --coverage` to generate a coverage report, or `npm test -- --verbose` to see individual test results.

## Solving the problem
1. React via `create-react-app` was used due to its familiarity and easy-of-use.
1. I decided to go with a calculator that uses text input instead of buttons, because I believe the former can potentially be easier to use and more useful.
    1. Because of this, I had to choose how I would do the calculations themselves. `eval()`, although risky, was chosen so that I wouldn't have to dedicate time to writing a function for each arithmetic operation.
    1. Since `eval()` is being used, I've included code that sanitizes the input to minimize security risks.
1. To keep the calculations persistent between sessions, I decided to use a database. I chose Firebase instead of the more familiar MongoDB because the latter would require me to use Web Sockets or GraphQL to keep the calculations synced among users.
    1. Firebase's Realtime Database meant I wouldn't have to use additional libraries.
    1. I would also be able to host this program using Firebase.
1. I've included a basic notification system that lets the user know if an error has occurred. The errors from `eval()` are somewhat cryptic, so each error is prefixed by a custom error message.
1. To improve the user experience, Bootstrap was used as the UI framework. This made the notification system easier to implement due to React Bootstrap's built-in components.

## Future considerations
There are several things I couldn't implement due to time contraints, but would be worth considering for the future:
1. More thorough error handling. The current implementation doesn't catch everything, and I've yet to test how it handles asynchronous operations.
1. Incorporating Bootstrap further. For example, transitions could be used, and a spinner could indicate if the calculations haven't loaded yet. The page could also look nicer on mobile browsers.
1. Additional testing, since coverage isn't ideal. Integration tests should be used to check Firebase functionality. The opening/closing of a notification could also be tested.
