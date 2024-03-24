import { createContext } from "react";
import { useSocket } from "../hooks/useSocket";

export const SocketContext = createContext({} as ReturnType<typeof useSocket>);
