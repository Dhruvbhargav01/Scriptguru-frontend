import React from 'react';
import { Link } from 'react-router-dom';

export default function BoardListItem({ board }){
  return (
    <Link to={`/boards/${board._id}`} className="board-link">
      <div>{board.name}</div>
    </Link>
  );
}
