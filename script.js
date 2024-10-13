// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCla4YitqW2-Ho80cc4Zx2z4dP1v6xPkJw",
    authDomain: "elite24-632f1.firebaseapp.com",
    projectId: "elite24-632f1",
    storageBucket: "elite24-632f1.appspot.com",
    messagingSenderId: "47289588952",
    appId: "1:47289588952:web:5e5ab4456a8d67302a8bad",
    measurementId: "G-WG42L7SYRE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// References to elements in your HTML
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const logoutButton = document.getElementById('logout-btn');
const authMessage = document.getElementById('auth-message');
const tapButton = document.getElementById('tap-btn');
const userScoreDisplay = document.getElementById('user-score');
const globalScoreDisplay = document.getElementById('global-score');

let userScore = 0;

// Event listener for signup
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('User signed up:', userCredential.user);
            authMessage.textContent = "Signup successful. Now you can login.";
            signupForm.reset();
        })
        .catch((error) => {
            console.error('Signup error:', error.message);
            authMessage.textContent = error.message;
        });
});

// Event listener for login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('User signed in:', userCredential.user);
            // Show the game section
            document.getElementById('auth-section').style.display = 'none';
            document.getElementById('game-section').style.display = 'block';
        })
        .catch((error) => {
            console.error('Login error:', error.message);
            authMessage.textContent = error.message;
        });
});

// Event listener for logout
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            console.log('User signed out');
            document.getElementById('auth-section').style.display = 'block';
            document.getElementById('game-section').style.display = 'none';
        })
        .catch((error) => {
            console.error('Logout error:', error.message);
        });
});

// Event listener for tapping
tapButton.addEventListener('click', () => {
    userScore++;
    userScoreDisplay.textContent = userScore;
});

// Check user authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is signed in:', user);
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('game-section').style.display = 'block';
    } else {
        console.log('No user is signed in.');
        document.getElementById('auth-section').style.display = 'block';
        document.getElementById('game-section').style.display = 'none';
    }
});
