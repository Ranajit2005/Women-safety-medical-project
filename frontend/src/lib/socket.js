import { io } from "socket.io-client";




const operation = import.meta.env.VITE_OPERATION;
const url = operation === "dev" ? "http://localhost:5000" : import.meta.env.VITE_BACKEND_URL;
export const socket = io(url);
