import { io } from "socket.io-client";

// Fejlesztés alatt a lokális szerverhez kapcsolódunk
const socket = io("http://3.65.97.92:4000");

export default socket;
