import React from 'react';

const Grades: React.FC = () => {
    // Sample data for grades (you can replace it with real data later)
    const gradesData = [
        { studentName: 'John Doe', subject: 'Math', grade: 'A' },
        { studentName: 'Jane Smith', subject: 'Science', grade: 'B+' },
        { studentName: 'Sam Green', subject: 'History', grade: 'A-' },
        { studentName: 'Alice Blue', subject: 'English', grade: 'B' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold text-center mb-8">Grades</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                    <thead>
                        <tr>
                            <th className="py-3 px-4 bg-gray-200 font-semibold text-gray-800 text-left">Student Name</th>
                            <th className="py-3 px-4 bg-gray-200 font-semibold text-gray-800 text-left">Subject</th>
                            <th className="py-3 px-4 bg-gray-200 font-semibold text-gray-800 text-left">Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gradesData.map((grade, index) => (
                            <tr key={index} className="border-t">
                                <td className="py-3 px-4">{grade.studentName}</td>
                                <td className="py-3 px-4">{grade.subject}</td>
                                <td className="py-3 px-4">{grade.grade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Grades;
