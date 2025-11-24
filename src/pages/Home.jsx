import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBoards, createBoard } from "../api/api";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const [boards, setBoards] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const loadBoards = async () => {
    try {
      const res = await getBoards();
      // Ensure boards is always an array
      setBoards(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load boards:", err);
      setBoards([]);
    }
  };

  useEffect(() => {
    loadBoards();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    try {
      const res = await createBoard({ name: trimmed });
      setName("");
      // Add to list
      setBoards((s) => [res.data, ...s]);
      // Navigate into created board immediately
      navigate(`/boards/${res.data._id}`);
    } catch (err) {
      console.error("Create board failed:", err);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar boards={boards} onRefresh={loadBoards} />
      <main className="page">
        <div className="home-header">
          <h1>All Boards</h1>
        </div>

        <form onSubmit={handleCreate} className="create-board-form">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New board name (e.g. Frontend Tasks)"
            required
          />
          <button>Create Board</button>
        </form>

        <div className="boards-grid">
          {(!boards || boards.length === 0) && (
            <div className="muted">No boards yet — create one.</div>
          )}

          {Array.isArray(boards) &&
            boards.map((b) => (
              <div
                key={b._id}
                className="board-card"
                onClick={() => navigate(`/boards/${b._id}`)}
              >
                <h3>{b.name}</h3>
                <small className="muted">{new Date(b.createdAt).toLocaleString()}</small>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
