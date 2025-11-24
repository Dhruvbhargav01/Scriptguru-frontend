import React from "react";

export default function ConfirmModal({ text = "Are you sure?", onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop">
      <div className="modal small">
        <p>{text}</p>
        <div className="modal-actions">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
}
