// /assets/js/signup-logic.js

import { auth, database } from './firebase-config.js'; // Import auth and database

document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const signupButton = document.getElementById('signup-button');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    const showError = (message) => {
        successMessage.style.display = 'none';
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    };

    const showSuccess = (message) => {
        errorMessage.style.display = 'none';
        successMessage.textContent = message;
        successMessage.style.display = 'block';
    };

    const handleSignup = async () => {
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        errorMessage.style.display = 'none';
        
        // --- Input Validation ---
        if (!username || !email || !password || !confirmPassword) {
            return showError("All fields are required.");
        }
        if (password !== confirmPassword) {
            return showError("Passwords do not match.");
        }
        if (password.length < 6) {
            return showError("Password must be at least 6 characters long.");
        }
        
        // Phase 1 Requirement: .edu verification
        if (!email.toLowerCase().endsWith('.edu')) {
            return showError("Registration requires a valid college (.edu) email address.");
        }
        // --- End Validation ---

        signupButton.disabled = true;
        signupButton.textContent = "Registering...";
        
        try {
            // 1. Firebase Command to create the user
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // 2. Add Username to the User Profile
            await user.updateProfile({
                displayName: username,
            });

            // 3. Store User Data/Role in Firebase Realtime Database
            await database.ref('users/' + user.uid).set({
                username: username,
                email: email,
                role: 'Freshman', // Assign default role
                // We'll let the user update their major later
            });
            
            showSuccess(`Success! Account created for ${username}. Redirecting to login...`);
            
            // Redirect after a delay
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000); 

        } catch (error) {
            let displayMsg = "Registration failed.";
            if (error.code === 'auth/email-already-in-use') {
                displayMsg = "This email is already registered.";
            } else if (error.code === 'auth/invalid-email') {
                displayMsg = "Invalid email format.";
            }

            showError(displayMsg);
            signupButton.disabled = false;
            signupButton.textContent = "Register Account";
        }
    };

    signupButton.addEventListener('click', handleSignup);
});

