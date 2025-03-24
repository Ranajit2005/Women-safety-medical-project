import axios from 'axios';

const operation = import.meta.env.VITE_OPERATION;
const url = operation === "dev" ? "http://localhost:5000/api" : import.meta.env.VITE_BACKEND_URL + "/api";

export const axiosInstance = axios.create({
    baseURL: url,
    withCredentials: true,
})