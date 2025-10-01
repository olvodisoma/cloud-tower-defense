import { io } from "socket.io-client";

// Fejlesztés alatt a lokális szerverhez kapcsolódunk
const socket = io("http://localhost:4000");

export default socket;
