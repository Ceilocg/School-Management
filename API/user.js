import { db, auth } from './firebaseConfig.js';
import { collection, updateDoc, deleteDoc, doc, getDocs, getDoc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';


// Firestore collection reference
const usersCollection = collection(db, 'users');

// Function to create a new user
export const createUser = async (userData) => {
  try {
    // First, create user using email and password authentication
    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    const userId = userCredential.user.uid;  // Retrieve the user ID from Firebase Auth

    // Add user details to Firestore with the userId as the document ID
    const userRef = await setDoc(doc(usersCollection, userId), {
      fullname: userData.fullname,
      username: userData.username,
      email: userData.email,
      role: userData.role,
      imageUrl: userData.imageUrl || '',
      status: userData.status,
    });

    console.log('User created with ID: ', docRef.id); 
    return docRef.id;  // Return the user ID
  } catch (error) {
    console.error('Error creating user: ', error);
    throw error;
  }
};




// Function to update a user by ID
export const updateUser = async (id, updatedData) => {
  try {
    const userDoc = doc(db, 'users', id);
    await updateDoc(userDoc, updatedData);
    console.log('User updated with ID: ', id);
  } catch (error) {
    console.error('Error updating user: ', error);
    throw error;
  }
};

// Function to patch (partially update) a user by ID
export const patchUser = async (id, partialData) => {
  try {
    const userDoc = doc(db, 'users', id);
    await updateDoc(userDoc, partialData);
    console.log('User partially updated with ID: ', id);
  } catch (error) {
    console.error('Error partially updating user: ', error);
    throw error;
  }
};

// Function to delete a user by ID
export const deleteUser = async (id) => {
  try {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc);
    console.log('User deleted with ID: ', id);
  } catch (error) {
    console.error('Error deleting user: ', error);
    throw error;
  }
};

// Function to fetch all users
export const fetchUsers = async () => {
  try {
    const snapshot = await getDocs(usersCollection);
    const userRecords = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return userRecords;
  } catch (error) {
    console.error('Error fetching users: ', error);
    throw error;
  }
};

// Function to get a single user by ID
export const getUserById = async (id) => {
  try {
    const userDoc = doc(db, 'users', id);
    const docSnap = await getDoc(userDoc);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log('No such document!');
      return null; // Document not found
    }
  } catch (error) {
    console.error('Error getting user: ', error);
    throw error;
  }
};
