import React from 'react';

const Dropouts: React.FC = () => {
    // Sample data for dropouts (you can replace this with real data)
    const dropoutsData = [
        { studentName: 'Michael Adams', dropoutDate: '2024-06-15', reason: 'Financial Issues' },
        { studentName: 'Sophia Brown', dropoutDate: '2024-07-22', reason: 'Personal Reasons' },
        { studentName: 'Chris Black', dropoutDate: '2024-05-12', reason: 'Health Problems' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold text-center mb-8">Dropouts</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                    <thead>
                        <tr>
                            <th className="py-3 px-4 bg-gray-200 font-semibold text-gray-800 text-left">Student Name</th>
                            <th className="py-3 px-4 bg-gray-200 font-semibold text-gray-800 text-left">Dropout Date</th>
                            <th className="py-3 px-4 bg-gray-200 font-semibold text-gray-800 text-left">Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dropoutsData.map((dropout, index) => (
                            <tr key={index} className="border-t">
                                <td className="py-3 px-4">{dropout.studentName}</td>
                                <td className="py-3 px-4">{dropout.dropoutDate}</td>
                                <td className="py-3 px-4">{dropout.reason}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dropouts;
