import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// The function to submit the form request to Firestore
export const submitFormRequest = async (
  formData: any,  // Consider typing this for better TypeScript support
  resetForm: () => void,
  setError: (error: string) => void,
  setOpenSnackbar: (open: boolean) => void
) => {
  try {
    // Add the form data to the 'form_requests' collection in Firestore
    await addDoc(collection(db, 'form_requests'), {
      ...formData,
      status: 'pending',  // Ensure the request status is set to 'pending'
      timestamp: Timestamp.now(),  // Use Firestore's Timestamp for consistency
    });

    console.log('Form submitted successfully!');
    resetForm();  // Reset the form fields after successful submission
    setOpenSnackbar(true);  // Open the Snackbar for success feedback (optional if you want to show a success message)
    
  } catch (error) {
    console.error('Error submitting the form: ', error);
    // Handle any errors during submission
    setError('Error submitting the form: ' + (error instanceof Error ? error.message : error));
    setOpenSnackbar(true);  // Open the Snackbar with the error message
  }
};
