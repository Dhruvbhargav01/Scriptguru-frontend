import React from "react";
import TaskCard from "./TaskCard";

export default function TaskColumn({ status, tasks = [], onEdit, onDelete, onChangeStatus }) {
  return (
    <section className="column">
      <h3>{status} <span className="count">({tasks.length})</span></h3>
      <div>
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task._id)}
            onChangeStatus={(s) => onChangeStatus(task._id, s)}
          />
        ))}
      </div>
    </section>
  );
}
