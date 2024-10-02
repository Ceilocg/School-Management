import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; // Import your Firebase config
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            await signInWithEmailAndPassword(auth, email, password); // Use Firebase Auth to log in
            navigate('/'); // Redirect to home after successful login
        } catch (err) {
            setError('Failed to log in. Please check your credentials.'); // Set error message
            setOpenSnackbar(true); // Open Snackbar
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div
            className="flex items-center justify-center h-screen"
            style={{
                backgroundImage: "url('https://i.ibb.co/SdYsqpn/382103576-748388327301878-8681280576890683558-n.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
            }}
        >
            <div
                className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full"
                style={{
                    position: 'relative',
                    zIndex: 1,
                    opacity: 0.9, // Optional: Adjust the background card opacity for better visibility
                }}
            >
                <h2 className="text-2xl mb-4 text-white text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-300">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Update email state
                            className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Update password state
                            className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                {/* New button for requesting a form styled as a button */}
                <div className="mt-4 text-center">
                    <button
                        onClick={() => navigate('/request-form')}
                        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-200"
                    >
                        Request a Form
                    </button>
                </div>
            </div>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Login;
