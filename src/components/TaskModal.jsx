import React, { useEffect, useState } from "react";

const EMPTY = {
  title: "",
  description: "",
  status: "To Do",
  priority: "Low",
  assignedTo: "",
  dueDate: "",
};

export default function TaskModal({ boardId, initial = null, onClose, onCreate, onUpdate }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || "",
        description: initial.description || "",
        status: initial.status || "To Do",
        priority: initial.priority || "Low",
        assignedTo: initial.assignedTo || "",
        dueDate: initial.dueDate ? new Date(initial.dueDate).toISOString().slice(0, 10) : "",
      });
    } else {
      setForm(EMPTY);
    }
  }, [initial]);

  const change = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      description: form.description,
      status: form.status,
      priority: form.priority,
      assignedTo: form.assignedTo,
      dueDate: form.dueDate || null,
    };

    if (initial && initial._id) {
      await onUpdate(initial._id, payload);
    } else {
      await onCreate(payload);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{initial ? "Edit Task" : "New Task"}</h3>
        <form onSubmit={submit} className="task-form">
          <label>Title *</label>
          <input required value={form.title} onChange={(e) => change("title", e.target.value)} />

          <label>Description</label>
          <textarea value={form.description} onChange={(e) => change("description", e.target.value)} />

          <label>Priority</label>
          <select value={form.priority} onChange={(e) => change("priority", e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <label>Assigned To</label>
          <input value={form.assignedTo} onChange={(e) => change("assignedTo", e.target.value)} />

          <label>Due Date</label>
          <input type="date" value={form.dueDate} onChange={(e) => change("dueDate", e.target.value)} />

          <label>Status</label>
          <select value={form.status} onChange={(e) => change("status", e.target.value)}>
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          <div className="modal-actions">
            <button type="submit">{initial ? "Save" : "Create"}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
