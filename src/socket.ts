import { io } from "socket.io-client";

// Backend server URL
const SERVER_URL = "http://localhost:3000";

// Initialize Socket.IO client
export const socket = io(SERVER_URL, { autoConnect: true });
