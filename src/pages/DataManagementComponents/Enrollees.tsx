import React from 'react';

const Enrollees: React.FC = () => {
    // Sample data for enrollees (you can replace this with real data)
    const enrolleesData = [
        { studentName: 'John Doe', enrollmentDate: '2024-08-12', status: 'Active' },
        { studentName: 'Jane Smith', enrollmentDate: '2024-08-15', status: 'Active' },
        { studentName: 'Sam Green', enrollmentDate: '2024-09-01', status: 'Pending' },
        { studentName: 'Alice Blue', enrollmentDate: '2024-09-05', status: 'Active' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold text-center mb-8">Enrollees</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                    <thead>
                        <tr>
                            <th className="py-3 px-4 bg-gray-200 font-semibold text-gray-800 text-left">Student Name</th>
                            <th className="py-3 px-4 bg-gray-200 font-semibold text-gray-800 text-left">Enrollment Date</th>
                            <th className="py-3 px-4 bg-gray-200 font-semibold text-gray-800 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrolleesData.map((enrollee, index) => (
                            <tr key={index} className="border-t">
                                <td className="py-3 px-4">{enrollee.studentName}</td>
                                <td className="py-3 px-4">{enrollee.enrollmentDate}</td>
                                <td className="py-3 px-4">{enrollee.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Enrollees;
