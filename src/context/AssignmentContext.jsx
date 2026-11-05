import { createContext, useContext, useState } from "react";
import { initialAssignments } from "../data/assignments";
import { getStorageData, setStorageData } from "../utils/storage";

const AssignmentContext = createContext();

export const AssignmentProvider = ({ children }) => {
  const [assignments, setAssignments] = useState(() =>
    getStorageData("assignments", initialAssignments)
  );

  const addAssignment = (assignment) => {
    const updatedAssignments = [...assignments, assignment];

    setAssignments(updatedAssignments);
    setStorageData("assignments", updatedAssignments);
  };

  const updateAssignment = (updatedAssignment) => {
    const updatedAssignments = assignments.map((assignment) =>
      assignment.id === updatedAssignment.id
        ? updatedAssignment
        : assignment
    );

    setAssignments(updatedAssignments);
    setStorageData("assignments", updatedAssignments);
  };

  const deleteAssignment = (assignmentId) => {
    const updatedAssignments = assignments.filter(
      (assignment) => assignment.id !== assignmentId
    );

    setAssignments(updatedAssignments);
    setStorageData("assignments", updatedAssignments);
  };

  return (
    <AssignmentContext.Provider
      value={{
        assignments,
        addAssignment,
        updateAssignment,
        deleteAssignment,
      }}
    >
      {children}
    </AssignmentContext.Provider>
  );
};

export const useAssignments = () => useContext(AssignmentContext);