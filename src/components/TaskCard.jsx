import React from "react";

const PRIORITY_CLASS = {
  Low: "p-low",
  Medium: "p-medium",
  High: "p-high",
  low: "p-low",
  medium: "p-medium",
  high: "p-high",
};

export default function TaskCard({ task, onEdit, onDelete, onChangeStatus }) {
  const priority = task.priority || "Low";
  return (
    <div className="task-card">
      <div className="task-top">
        <strong>{task.title}</strong>
        <div className="task-actions">
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>

      <div className="task-meta">
        <div className={`badge ${PRIORITY_CLASS[priority] || "p-low"}`}>{priority}</div>
        <div className="assigned">{task.assignedTo || "Unassigned"}</div>
        <div className="due">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ""}</div>
      </div>

      {task.description && <p className="desc">{task.description}</p>}

      <div className="status-control">
        <select value={task.status || "To Do"} onChange={(e) => onChangeStatus(e.target.value)}>
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>
    </div>
  );
}
