import { db } from './firebaseConfig.js'
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc } from 'firebase/firestore';

// Firestore collection reference
const usersCollection = collection(db, 'users');

// Function to create a new user
export const createUser = async (userData) => {
  try {
    const docRef = await addDoc(usersCollection, userData);
    console.log('User created with ID: ', docRef.id);
    return docRef.id; // Return the ID of the created user
  } catch (error) {
    console.error('Error adding user: ', error);
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
    await updateDoc(userDoc, partialData); // Update only the fields provided in partialData
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
    const userRecords = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
