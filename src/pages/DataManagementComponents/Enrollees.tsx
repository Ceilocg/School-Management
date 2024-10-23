import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from "../../firebaseConfig";

type EducationLevel = 'junior' | 'senior';
type Semester = '1st semester' | '2nd semester';

interface StudentData {
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: string;
  lrn: string; // Learner Reference Number
}

interface EnrollmentData extends StudentData {
  educationLevel: EducationLevel;
  grade?: string; // Grade is optional since it's hidden for senior high
  section: string;
  strand?: string; // Only for senior high
  semester?: Semester; // Only for senior high
}

export default function EnrollmentReportForm() {
  const [educationLevel, setEducationLevel] = useState<EducationLevel>('junior');
  const [grade, setGrade] = useState<string>(''); // Only used for junior high
  const [section, setSection] = useState<string>('');
  const [strand, setStrand] = useState<string>(''); // Only used for senior high
  const [semester, setSemester] = useState<Semester>('1st semester'); // Only for senior high
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [middleName, setMiddleName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [lrn, setLrn] = useState<string>('');
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentData[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false); // Control form visibility

  useEffect(() => {
    fetchEnrollmentData();
  }, []);

  const fetchEnrollmentData = async () => {
    const querySnapshot = await getDocs(collection(db, "enrollments"));
    const data: EnrollmentData[] = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data() as EnrollmentData);
    });
    setEnrollmentData(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEnrollment: EnrollmentData = {
      educationLevel,
      section,
      firstName,
      lastName,
      middleName,
      birthDate,
      lrn,
      ...(educationLevel === 'junior' && { grade }), // Include grade for junior high
      ...(educationLevel === 'senior' && { strand, semester }), // Include strand and semester for senior high
    };

    try {
      await addDoc(collection(db, "enrollments"), newEnrollment);
      alert("Student enrolled successfully!");
      fetchEnrollmentData(); // Refresh the data
      resetForm();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error enrolling student.");
    }
  };

  const resetForm = () => {
    setEducationLevel('junior');
    setGrade('');
    setSection('');
    setStrand('');
    setSemester('1st semester');
    setFirstName('');
    setLastName('');
    setMiddleName('');
    setBirthDate('');
    setLrn('');
    setShowForm(false); // Hide the form after submission
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">DepEd Student Enrollment</h1>
      
      {/* Button to show the form */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)} // Show form on click
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Enroll Student
        </button>
      )}

      {/* Conditional rendering of the form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block mb-2">First Name</label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter First Name"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block mb-2">Last Name</label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter Last Name"
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="middleName" className="block mb-2">Middle Name</label>
            <input
              id="middleName"
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              placeholder="Enter Middle Name"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="birthDate" className="block mb-2">Birth Date</label>
              <input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="lrn" className="block mb-2">LRN</label>
              <input
                id="lrn"
                type="text"
                value={lrn}
                onChange={(e) => setLrn(e.target.value)}
                placeholder="Enter LRN"
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="educationLevel" className="block mb-2">Education Level</label>
            <select
              id="educationLevel"
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value as EducationLevel)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="junior">Junior High School</option>
              <option value="senior">Senior High School</option>
            </select>
          </div>

          {educationLevel === 'junior' && (
            <div>
              <label htmlFor="juniorGrade" className="block mb-2">Grade</label>
              <select
                id="juniorGrade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Grade</option>
                {['7', '8', '9', '10'].map((g) => (
                  <option key={g} value={g}>Grade {g}</option>
                ))}
              </select>
            </div>
          )}

          {educationLevel === 'senior' && (
            <>
              <div>
                <label htmlFor="strand" className="block mb-2">Strand</label>
                <input
                  id="strand"
                  type="text"
                  value={strand}
                  onChange={(e) => setStrand(e.target.value)}
                  placeholder="Enter Strand"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="semester" className="block mb-2">Semester</label>
                <select
                  id="semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value as Semester)}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="1st semester">1st Semester</option>
                  <option value="2nd semester">2nd Semester</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label htmlFor="section" className="block mb-2">Section</label>
            <input
              id="section"
              type="text"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              placeholder="Enter Section"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Submit Enrollment
          </button>
        </form>
      )}
    </div>
  );
}
