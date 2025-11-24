import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TaskColumn from "../components/TaskColumn";
import TaskModal from "../components/TaskModal";
import ConfirmModal from "../components/ConfirmModal";
import { getBoards, getBoardTasks, createTaskInBoard, updateTask, deleteTask } from "../api/api";

const STATUSES = ["To Do", "In Progress", "Done"];

export default function BoardPage() {
  const { boardId } = useParams();
  const [boards, setBoards] = useState([]);
  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, taskId: null });

  const loadBoards = async () => {
    try {
      const res = await getBoards();
      const data = Array.isArray(res.data) ? res.data : [];
      setBoards(data);
      const found = data.find((b) => b._id === boardId) || null;
      setBoard(found);
    } catch (err) {
      console.error("loadBoards:", err);
      setBoards([]);
      setBoard(null);
    }
  };

  const loadTasks = async () => {
    try {
      const res = await getBoardTasks(boardId);
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("loadTasks:", err);
      setTasks([]);
    }
  };

  useEffect(() => {
    loadBoards();
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId]);

  const handleCreateTask = async (payload) => {
    try {
      const res = await createTaskInBoard(boardId, payload);
      setTasks((t) => [res.data, ...t]);
      setShowModal(false);
    } catch (err) {
      console.error("create task error", err);
    }
  };

  const handleUpdateTask = async (taskId, payload) => {
    try {
      const res = await updateTask(taskId, payload);
      setTasks((t) =>
        Array.isArray(t) ? t.map((x) => (x._id === taskId ? res.data : x)) : []
      );
      setEditing(null);
      setShowModal(false);
    } catch (err) {
      console.error("update task error", err);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((t) =>
        Array.isArray(t) ? t.filter((x) => x._id !== taskId) : []
      );
      setConfirm({ open: false, taskId: null });
    } catch (err) {
      console.error("delete task error", err);
    }
  };

  const tasksByStatus = (status) =>
    Array.isArray(tasks) ? tasks.filter((t) => (t.status || "To Do") === status) : [];

  return (
    <div className="app-layout">
      <Sidebar boards={boards} onRefresh={loadBoards} />
      <main className="page board-page">
        <div className="board-header">
          <div>
            <h2>{board ? board.name : "Board"}</h2>
            <div className="muted">Board ID: {boardId}</div>
          </div>

          <div className="header-actions">
            <button onClick={() => { setEditing(null); setShowModal(true); }}>+ New Task</button>
            <Link to="/">Back to Boards</Link>
          </div>
        </div>

        <div className="columns">
          {STATUSES.map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasksByStatus(status)}
              onEdit={(task) => { setEditing(task); setShowModal(true); }}
              onDelete={(taskId) => setConfirm({ open: true, taskId })}
              onChangeStatus={async (taskId, newStatus) => {
                await handleUpdateTask(taskId, { status: newStatus });
              }}
            />
          ))}
        </div>

        {showModal && (
          <TaskModal
            initial={editing}
            boardId={boardId}
            onClose={() => { setShowModal(false); setEditing(null); }}
            onCreate={handleCreateTask}
            onUpdate={handleUpdateTask}
          />
        )}

        {confirm.open && (
          <ConfirmModal
            text="Delete this task?"
            onCancel={() => setConfirm({ open: false, taskId: null })}
            onConfirm={() => handleDelete(confirm.taskId)}
          />
        )}
      </main>
    </div>
  );
}
