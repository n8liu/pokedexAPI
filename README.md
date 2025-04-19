# Minimalistic Pokédex

A simple web application that displays Pokémon information fetched from the [PokeAPI](https://pokeapi.co/).

## Features

*   Displays a list of Pokémon with their:
    *   National Pokédex ID
    *   Name
    *   Default Sprite Image
    *   Types
    *   Base Stats
*   Fetches data directly from the PokeAPI v2.
*   Configured for easy deployment to Firebase Hosting.

## Running Locally

Since this is a static application (HTML, CSS, JavaScript), you can simply open the `index.html` file directly in your web browser.

Alternatively, you can use a simple local web server:

1.  **Navigate to the project directory:**
    ```bash
    cd /path/to/pokeAPI
    ```
2.  **Start a simple HTTP server (requires Python 3):**
    ```bash
    python3 -m http.server
    ```
3.  Open your browser to `http://localhost:8000` (or the port specified by the server).

*(Note: The project also contains a basic `server.js` file using Node.js/Express, but it is not required for the current functionality or for Firebase deployment. It was part of an earlier development iteration.)*

## Deployment (Firebase Hosting)

The application is configured for deployment to Firebase Hosting.

1.  **Prerequisites:**
    *   [Node.js and npm](https://nodejs.org/) installed.
    *   [Firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli) installed (`npm install -g firebase-tools`).
    *   Logged into Firebase (`firebase login`).
    *   A Firebase project created.

2.  **Configure Project ID:**
    *   Edit the `.firebaserc` file.
    *   Replace `"YOUR_FIREBASE_PROJECT_ID"` (or the current value) with your actual Firebase Project ID.

3.  **Install Dependencies:**
    *   Run `npm install` in the project directory (this mainly installs `firebase-tools` locally for the script).

4.  **Deploy:**
    *   Run the deploy script:
        ```bash
        npm run deploy
        ```
    *   This command will deploy the contents of the current directory (as defined in `firebase.json`) to your Firebase Hosting site.
