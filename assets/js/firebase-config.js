// /assets/js/firebase-config.js

// ** IMPORTANT: Replace with your actual Firebase config **
const firebaseConfig = {
    apiKey: "AIzaSyC...your-api-key...", 
    authDomain: "college-chat-app-123.firebaseapp.com", 
    databaseURL: "https://college-chat-app-123-default-rtdb.firebaseio.com", 
    projectId: "college-chat-app-123", 
    storageBucket: "college-chat-app-123.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdefg",
};

// Initialize Firebase App
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service and Auth service
export const database = firebase.database();
export const auth = firebase.auth();

// Define the reference path for our current channel
export const channelRef = database.ref('channels/algorithms-402');
