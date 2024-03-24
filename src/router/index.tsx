import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { GameBoard } from "../containers/GameBoard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/game-board",
    element: <GameBoard />,
  },
]);
