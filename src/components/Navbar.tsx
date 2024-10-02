import React, { useEffect, useState } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { auth, db } from '../firebaseConfig'; // Import your Firebase config
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface NavbarProps {
    onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userData, setUserData] = useState<{ username: string; imageUrl: string } | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser; // Get the current user
            if (user) {
                const userDocRef = doc(db, 'users', user.uid); // Reference to the user's document
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const data = userDocSnap.data();
                    setUserData({
                        username: data.username,
                        imageUrl: data.imageUrl, // Make sure imageUrl is available in your Firestore
                    });
                } else {
                    console.log('No such user document!');
                }
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign out from Firebase
        } catch (error) {
            console.error("Logout error: ", error);
        }
    };

    return (
        <header className="bg-gray-900 text-white flex items-center justify-between p-4 z-50 relative">
            <button onClick={onToggleSidebar} className="text-white focus:outline-none">
                <FaBars className="text-2xl" />
            </button>
            <h1 className="text-xl font-bold md:text-2xl">Admin Dashboard</h1>
            <div className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center">
                    {userData ? (
                        <img
                            src={userData.imageUrl}
                            alt="User Avatar"
                            className="w-8 h-8 rounded-full mr-2"
                        />
                    ) : (
                        <FaUserCircle className="text-2xl" />
                    )}
                    <span>{userData ? userData.username : 'User'}</span>
                </button>
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                        <ul className="py-2">
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
