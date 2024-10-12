import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import Firebase config

interface Request {
  id: string;
  firstName: string;
  lastName: string;
  depedForm: string;
  lrn: number;
  contactNumber: number;
  email: string;
  strand: string;
  tvlSubOption?: string; // Add optional field for TVL sub-option
  yearGraduated: string;
  gradeLevel: string;
  status: string;
  timestamp: any;
}

// Function to format the Firestore timestamp
const formatTimestamp = (timestamp: any) => {
  if (!timestamp) {
    return 'No timestamp available';
  }

  try {
    const date = timestamp.toDate(); // Convert Firestore timestamp to JS Date
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(date);
  } catch (error) {
    console.error('Error formatting timestamp: ', error);
    return 'Invalid date';
  }
};

const Notifications: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const requestQuery = query(collection(db, 'form_requests'));

      onSnapshot(requestQuery, (querySnapshot) => {
        const requestsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          depedForm: doc.data().depedForm,
          lrn: doc.data().lrn || 'N/A',
          contactNumber: doc.data().contactNumber || 'N/A',
          email: doc.data().email || 'N/A',
          strand: doc.data().strand || 'N/A',
          tvlSubOption: doc.data().tvlSubOption || null, // Fetch tvlSubOption if exists
          yearGraduated: doc.data().yearGraduated || 'N/A',
          gradeLevel: doc.data().gradeLevel || 'N/A',
          status: doc.data().status || 'pending',
          timestamp: doc.data().timestamp ? formatTimestamp(doc.data().timestamp) : 'N/A',
        }));
        setRequests(requestsData);
      });
    };

    fetchRequests();
  }, []);

  // Handle marking a request as done
  const markAsDone = async (id: string) => {
    try {
      const requestDoc = doc(db, 'form_requests', id);
      await updateDoc(requestDoc, {
        status: 'done',
      });
      console.log('Status updated to done');
    } catch (error) {
      console.error('Error updating status: ', error);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-4xl font-extrabold mb-6 text-gray-900 text-center">
          Certificate Request List
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left px-6 py-3 text-gray-700 font-bold">Full Name</th>
                <th className="text-left px-6 py-3 text-gray-700 font-bold">Form/Certificate</th>
                <th className="text-left px-6 py-3 text-gray-700 font-bold">LRN</th>
                <th className="text-left px-6 py-3 text-gray-700 font-bold">Contact</th>
                <th className="text-left px-6 py-3 text-gray-700 font-bold">Email</th>
                <th className="text-left px-6 py-3 text-gray-700 font-bold">Strand/Track</th>
                <th className="text-left px-6 py-3 text-gray-700 font-bold">Year Graduated</th>
                <th className="text-left px-6 py-3 text-gray-700 font-bold">Grade Level</th>
                <th className="text-left px-6 py-3 text-gray-700 font-bold">Status</th>
                <th className="text-left px-6 py-3 text-gray-700 font-bold">Timestamp</th>
                <th className="text-left px-6 py-3 text-gray-700 font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center px-6 py-4 text-gray-500">
                    No requests found.
                  </td>
                </tr>
              ) : (
                requests.map((request, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">{`${request.firstName} ${request.lastName}`}</td>
                    <td className="px-6 py-4">{request.depedForm}</td>
                    <td className="px-6 py-4">{request.lrn}</td>
                    <td className="px-6 py-4">{request.contactNumber}</td>
                    <td className="px-6 py-4">
                      <a href={`mailto:${request.email}`} className="text-blue-500 hover:underline">
                        {request.email}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      {request.strand}
                      {/* Conditionally render tvlSubOption if the strand is 'TVL' */}
                      {request.strand === 'TVL' && request.tvlSubOption ? (
                        <span className="block text-gray-500 text-sm">
                          ({request.tvlSubOption})
                        </span>
                      ) : null}
                    </td>
                    <td className="px-6 py-4">{request.yearGraduated}</td>
                    <td className="px-6 py-4">{request.gradeLevel}</td>
                    <td
                      className={`px-6 py-4 font-semibold text-center rounded-lg ${
                        request.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-600'
                          : request.status === 'accepted'
                          ? 'bg-green-100 text-green-600'
                          : request.status === 'done'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {request.status}
                    </td>
                    <td className="px-6 py-4">{request.timestamp}</td>
                    <td className="px-6 py-4">
                      {request.status === 'accepted' && (
                        <button
                          onClick={() => markAsDone(request.id)}
                          className="bg-blue-500 text-white px-3 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors"
                        >
                          Mark as Done
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
