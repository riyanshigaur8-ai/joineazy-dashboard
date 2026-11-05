import { useState } from "react";
import { useAssignments } from "../context/AssignmentContext";
import { useAuth } from "../context/AuthContext";
import { getStorageData, setStorageData } from "../utils/storage";
import {
  CalendarDays,
  BookOpen,
  LogOut,
  CheckCircle,
  X,
} from "lucide-react";

function StudentDashboard() {
  const { currentUser, logout } = useAuth();

  const { assignments } = useAssignments();

  const [submissions, setSubmissions] = useState(() =>
    getStorageData("submissions", [])
  );

  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const studentAssignments = assignments.filter(
    (assignment) =>
      assignment.assignedTo.includes("all") ||
      assignment.assignedTo.includes(currentUser.id)
  );

  const isSubmitted = (assignmentId) => {
    return submissions.some(
      (submission) =>
        submission.assignmentId === assignmentId &&
        submission.studentId === currentUser.id
    );
  };

  const handleConfirmSubmission = () => {
    if (!selectedAssignment) return;

    const newSubmission = {
      assignmentId: selectedAssignment.id,
      studentId: currentUser.id,
      submittedAt: new Date().toISOString(),
    };

    const updatedSubmissions = [...submissions, newSubmission];

    setSubmissions(updatedSubmissions);
    setStorageData("submissions", updatedSubmissions);
    setSelectedAssignment(null);
  };

  const submittedCount = studentAssignments.filter((assignment) =>
    isSubmitted(assignment.id)
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Joineazy
          </h1>
          <p className="text-sm text-slate-500">Student Portal</p>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700"
        >
          <LogOut size={18} />
          Logout
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-8">
          <p className="text-slate-500 text-sm">Welcome back,</p>
          <h2 className="text-3xl font-bold text-slate-800 mt-1">
            {currentUser.name} 👋
          </h2>
          <p className="text-slate-500 mt-2">
            Here are your assigned tasks.
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          <div className="bg-indigo-600 rounded-2xl p-6 text-white">
            <BookOpen size={26} />
            <p className="text-indigo-100 text-sm mt-3">
              Total Assignments
            </p>
            <h3 className="text-3xl font-bold">
              {studentAssignments.length}
            </h3>
          </div>

          <div className="bg-emerald-600 rounded-2xl p-6 text-white">
            <CheckCircle size={26} />
            <p className="text-emerald-100 text-sm mt-3">
              Submitted Assignments
            </p>
            <h3 className="text-3xl font-bold">
              {submittedCount}
            </h3>
          </div>
        </div>

        {/* Assignment List */}
        <h3 className="text-xl font-bold text-slate-800 mb-5">
          My Assignments
        </h3>

        {studentAssignments.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center border border-slate-200">
            <p className="text-slate-500">
              No assignments available right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studentAssignments.map((assignment) => {
              const submitted = isSubmitted(assignment.id);

              return (
                <div
                  key={assignment.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl">
                      <BookOpen size={22} />
                    </div>

                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        submitted
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {submitted ? "Submitted" : "Pending"}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-slate-800">
                    {assignment.title}
                  </h4>

                  <p className="text-sm text-slate-500 mt-2 leading-6">
                    {assignment.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-slate-500 mt-5 pt-4 border-t border-slate-100">
                    <CalendarDays size={17} />
                    Due: {assignment.dueDate}
                  </div>

                  <button
                    disabled={submitted}
                    onClick={() => setSelectedAssignment(assignment)}
                    className={`w-full mt-5 py-3 rounded-xl text-sm font-semibold transition ${
                      submitted
                        ? "bg-emerald-50 text-emerald-700 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    {submitted ? "Assignment Submitted" : "Submit Assignment"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Confirmation Dialog */}
      {selectedAssignment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirmation-title"
            className="bg-white rounded-2xl p-7 max-w-md w-full shadow-xl"
          >
            <div className="flex justify-between items-center mb-5">
              <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl">
                <CheckCircle size={24} />
              </div>

              <button
                onClick={() => setSelectedAssignment(null)}
                aria-label="Close confirmation dialog"
                className="text-slate-400 hover:text-slate-700"
              >
                <X size={21} />
              </button>
            </div>

            <h3
              id="confirmation-title"
              className="text-xl font-bold text-slate-800"
            >
              Confirm Submission
            </h3>

            <p className="text-slate-500 text-sm mt-3 leading-6">
              Are you sure you want to submit{" "}
              <strong>{selectedAssignment.title}</strong>?
              You won't be able to submit it again.
            </p>

            <div className="flex gap-3 mt-7">
              <button
                onClick={() => setSelectedAssignment(null)}
                className="flex-1 border border-slate-300 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmSubmission}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700"
              >
                Confirm Submission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;