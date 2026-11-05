
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useAssignments } from "../context/AssignmentContext";
import { users } from "../data/users";
import {
  LogOut,
  Plus,
  BookOpen,
  CalendarDays,
  Pencil,
  Trash2,
  X,
  Users,
} from "lucide-react";

function AdminDashboard() {
  const { currentUser, logout } = useAuth();

  const {
    assignments,
    addAssignment,
    updateAssignment,
    deleteAssignment,
  } = useAssignments();

  const students = users.filter((user) => user.role === "student");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignmentMode, setAssignmentMode] = useState("all");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Only show assignments created by the logged-in admin
  const myAssignments = assignments.filter(
    (assignment) => assignment.createdBy === currentUser.id
  );

  const handleStudentSelection = (studentId) => {
    setSelectedStudents((previous) =>
      previous.includes(studentId)
        ? previous.filter((id) => id !== studentId)
        : [...previous, studentId]
    );
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setAssignmentMode("all");
    setSelectedStudents([]);
    setEditingId(null);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      assignmentMode === "selected" &&
      selectedStudents.length === 0
    ) {
      setError("Please select at least one student.");
      return;
    }

    if (!editingId && !crypto.randomUUID) {
      setError("Your browser does not support assignment ID generation.");
      return;
    }

    const assignmentData = {
      id: editingId || crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      dueDate,
      createdBy: currentUser.id,
      assignedTo:
        assignmentMode === "all" ? ["all"] : selectedStudents,
    };

    if (editingId) {
      updateAssignment(assignmentData);
      setSuccess("Assignment updated successfully!");
    } else {
      addAssignment(assignmentData);
      setSuccess("Assignment created successfully!");
    }

    resetForm();
  };

  const handleEdit = (assignment) => {
    setEditingId(assignment.id);
    setTitle(assignment.title);
    setDescription(assignment.description);
    setDueDate(assignment.dueDate);

    if (assignment.assignedTo.includes("all")) {
      setAssignmentMode("all");
      setSelectedStudents([]);
    } else {
      setAssignmentMode("selected");
      setSelectedStudents(assignment.assignedTo);
    }

    setError("");
    setSuccess("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (assignmentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this assignment?"
    );

    if (!confirmed) return;

    deleteAssignment(assignmentId);

    if (editingId === assignmentId) {
      resetForm();
    }

    setSuccess("Assignment deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 md:px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Joineazy
          </h1>
          <p className="text-sm text-slate-500">
            Admin Portal
          </p>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700"
        >
          <LogOut size={18} />
          Logout
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-5 md:px-6 py-10">

        {/* Welcome */}
        <div className="mb-8">
          <p className="text-slate-500 text-sm">
            Welcome back,
          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-1">
            {currentUser.name} 👋
          </h2>

          <p className="text-slate-500 mt-2">
            Manage assignments and track student progress.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          <div className="bg-indigo-600 rounded-2xl p-6 text-white">
            <BookOpen size={26} />

            <p className="text-indigo-100 text-sm mt-3">
              My Assignments
            </p>

            <h3 className="text-3xl font-bold">
              {myAssignments.length}
            </h3>
          </div>

          <div className="bg-emerald-600 rounded-2xl p-6 text-white">
            <Users size={26} />

            <p className="text-emerald-100 text-sm mt-3">
              Total Students
            </p>

            <h3 className="text-3xl font-bold">
              {students.length}
            </h3>
          </div>
        </div>

        {/* Create / Edit Form */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-10">

          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl">
              {editingId ? <Pencil size={22} /> : <Plus size={22} />}
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-800">
                {editingId ? "Edit Assignment" : "Create Assignment"}
              </h3>

              <p className="text-sm text-slate-500">
                Add and manage student assignments.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Assignment Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter assignment title"
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter assignment instructions"
                required
                rows={4}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Due Date
              </label>

              <input
                type="date"
                value={dueDate}
                min={new Date().toLocaleDateString("en-CA")}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Assignment Target */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Assign To
              </label>

              <div className="flex flex-wrap gap-5">

                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="radio"
                    checked={assignmentMode === "all"}
                    onChange={() => {
                      setAssignmentMode("all");
                      setSelectedStudents([]);
                    }}
                  />
                  All Students
                </label>

                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="radio"
                    checked={assignmentMode === "selected"}
                    onChange={() => setAssignmentMode("selected")}
                  />
                  Selected Students
                </label>

              </div>

              {assignmentMode === "selected" && (
                <div className="mt-4 border border-slate-200 rounded-xl p-4 space-y-3">

                  {students.map((student) => (
                    <label
                      key={student.id}
                      className="flex items-center gap-3 text-sm text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() =>
                          handleStudentSelection(student.id)
                        }
                      />

                      {student.name} ({student.email})
                    </label>
                  ))}

                </div>
              )}
            </div>

            {/* Messages */}
            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            {success && (
              <p role="status" className="text-sm text-emerald-600">
                {success}
              </p>
            )}

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                {editingId ? "Update Assignment" : "Create Assignment"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="border border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50"
                >
                  Cancel Edit
                </button>
              )}

            </div>
          </form>
        </section>

        {/* Assignment List */}
        <section>

          <h3 className="text-xl font-bold text-slate-800 mb-5">
            My Assignments ({myAssignments.length})
          </h3>

          {myAssignments.length === 0 ? (

            <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
              <BookOpen size={35} className="mx-auto text-slate-300 mb-3" />

              <p className="text-slate-500">
                You haven't created any assignments yet.
              </p>
            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {myAssignments.map((assignment) => (

                <div
                  key={assignment.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >

                  <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl w-fit mb-4">
                    <BookOpen size={22} />
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

                  <p className="text-xs text-indigo-600 mt-3 font-medium">
                    {assignment.assignedTo.includes("all")
                      ? "Assigned to all students"
                      : `Assigned to ${assignment.assignedTo.length} student(s)`}
                  </p>

                  {/* Edit / Delete */}
                  <div className="flex gap-3 mt-5">

                    <button
                      onClick={() => handleEdit(assignment)}
                      className="flex-1 flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 py-2.5 rounded-lg hover:bg-indigo-100 font-medium text-sm"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(assignment.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2.5 rounded-lg hover:bg-red-100 font-medium text-sm"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>
          )}

        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
