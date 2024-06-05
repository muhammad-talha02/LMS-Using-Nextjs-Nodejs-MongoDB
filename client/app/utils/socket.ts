import socketIO from "socket.io-client"


const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || ''
export const socketId = socketIO(ENDPOINT, { transports: ['websocket'] })