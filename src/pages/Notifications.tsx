import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import Firebase config

interface Request {
  firstName: string;
  lastName: string;
  depedForm: string;
  status: string;
  timestamp: any;
}

const Notifications: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    // Fetch all requests from 'form_requests' collection
    const fetchRequests = async () => {
      const requestQuery = query(collection(db, 'form_requests'));

      onSnapshot(requestQuery, (querySnapshot) => {
        const requestsData = querySnapshot.docs.map((doc) => ({
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          depedForm: doc.data().depedForm,
          status: doc.data().status,
          timestamp: doc.data().timestamp.toDate().toLocaleString(), // Convert Firestore timestamp to readable date
        }));
        setRequests(requestsData);
      });
    };

    fetchRequests();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="text-left px-6 py-3 text-gray-600 font-semibold">Name</th>
              <th className="text-left px-6 py-3 text-gray-600 font-semibold">Form</th>
              <th className="text-left px-6 py-3 text-gray-600 font-semibold">Status</th>
              <th className="text-left px-6 py-3 text-gray-600 font-semibold">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center px-6 py-4 text-gray-500">
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
                  <td
                    className={`px-6 py-4 font-semibold ${
                      request.status === 'pending'
                        ? 'text-yellow-600'
                        : request.status === 'accepted'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {request.status}
                  </td>
                  <td className="px-6 py-4">{request.timestamp}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notifications;
