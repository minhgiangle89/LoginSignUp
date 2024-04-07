import React, { useState } from 'react';
import './LoginPage.css'; // Importing the CSS for styling

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(''); // State to handle login errors

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submit action
        try {
            const response = await fetch('http://localhost:5156/Users/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                // Handle login success, e.g., redirecting to another page or storing the token
            } else {
                // Handle server-side validation errors
                const errorData = await response.json();
                setLoginError(errorData.message || 'An error occurred during login.');
            }
        } catch (error) {
            // Handle network errors
            console.error('Login failed:', error);
            setLoginError('Failed to connect to the server.');
        }

    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Login</h2>
                {loginError && <div className="login-error">{loginError}</div>}
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Log In</button>
            </form>
        </div>
    );
};

export default LoginPage;