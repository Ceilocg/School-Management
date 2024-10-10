import React from 'react';

const Transferee: React.FC = () => {
    // Sample data for transferees (you can replace this with real data)
    const transfereeData = [
        { studentName: 'Emily White', transferDate: '2024-07-10', previousSchool: 'West High School' },
        { studentName: 'James Blue', transferDate: '2024-08-01', previousSchool: 'East Valley School' },
        { studentName: 'Olivia Green', transferDate: '2024-09-12', previousSchool: 'Central Academy' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold text-center mb-8">Transferees</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                    <thead>
                        <tr>
                            <th className="py-3 px-4 bg-gray-200 font-semibold text-gray-800 text-left">Student Name</th>
                            <th className="py-3 px-4 bg-gray-200 font-semibold text-gray-800 text-left">Transfer Date</th>
                            <th className="py-3 px-4 bg-gray-200 font-semibold text-gray-800 text-left">Previous School</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transfereeData.map((transferee, index) => (
                            <tr key={index} className="border-t">
                                <td className="py-3 px-4">{transferee.studentName}</td>
                                <td className="py-3 px-4">{transferee.transferDate}</td>
                                <td className="py-3 px-4">{transferee.previousSchool}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transferee;
