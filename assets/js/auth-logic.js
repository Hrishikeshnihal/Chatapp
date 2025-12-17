// /assets/js/auth-logic.js

import { auth } from './firebase-config.js'; // Import auth for sign-in logic

document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('login-button');
    const errorMessage = document.getElementById('error-message');

    // Check if user is already logged in (redirect them away from login page)
    auth.onAuthStateChanged(user => {
        if (user) {
            window.location.href = 'index.html';
        }
    });

    const showError = (message) => {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    };

    const handleLogin = async () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        errorMessage.style.display = 'none';

        if (!email || !password) {
            return showError("Please enter both email and password.");
        }

        // Phase 1 Requirement: Check for the .edu domain
        if (!email.toLowerCase().endsWith('.edu')) {
            return showError("Access denied. Please use a valid college (.edu) email address.");
        }

        loginButton.disabled = true;
        loginButton.textContent = "Logging In...";
        
        try {
            // Firebase command to sign in the user
            await auth.signInWithEmailAndPassword(email, password);
            
            // Success! The auth.onAuthStateChanged listener will handle the redirect

        } catch (error) {
            let displayMsg = "Login failed. Check your email and password.";
            if (error.code === 'auth/user-not-found') {
                displayMsg = "No account found. Please sign up.";
            } else if (error.code === 'auth/wrong-password') {
                displayMsg = "Incorrect password.";
            }

            showError(displayMsg);
            loginButton.disabled = false;
            loginButton.textContent = "Login";
        }
    };

    loginButton.addEventListener('click', handleLogin);

    // Allow pressing Enter key to submit
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
});

