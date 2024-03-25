import { io } from "socket.io-client";

interface IuseSocket {
  socket: any;
}

export const useSocket = (): IuseSocket => {
  const socket = io("https://socket-io-test-840f33815de2.herokuapp.com/");

  return {
    socket,
  };
};
