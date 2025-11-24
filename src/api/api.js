import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
});

export const getBoards = () => API.get("/boards");
export const createBoard = (data) => API.post("/boards", data);
export const getBoardTasks = (boardId) => API.get(`/boards/${boardId}/tasks`);
export const createTaskInBoard = (boardId, data) => API.post(`/boards/${boardId}/tasks`, data);

export const updateTask = (taskId, data) => API.put(`/tasks/${taskId}`, data);
export const deleteTask = (taskId) => API.delete(`/tasks/${taskId}`);
