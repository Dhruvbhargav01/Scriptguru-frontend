import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ boards = [], onRefresh = () => {} }) {
  return (
    <aside className="sidebar">
      <div className="brand">Team Collaboration</div>

      <div className="sidebar-actions">
        <button onClick={onRefresh}>Refresh</button>
        <Link to="/">All Boards</Link>
      </div>

      <div className="board-list">
        <h4>Your boards</h4>
        {boards.length === 0 && <div className="muted">No boards</div>}
        {boards.map((b) => (
          <Link key={b._id} to={`/boards/${b._id}`} className="board-link">
            {b.name}
          </Link>
        ))}
      </div>
    </aside>
  );
}
