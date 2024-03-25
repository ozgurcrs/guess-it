import { FC, useContext, useEffect, useRef, useState } from "react";
import "./game-board.scss";
import { SocketContext } from "../../context";
import { useLocation, useNavigate } from "react-router-dom";

export const GameBoard: FC = () => {
  const [myBrainNumber, setMyBrainNumber] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [inputId, setInputId] = useState<number>(0);
  const { socket } = useContext(SocketContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { roomCode, status } = location.state;
  const [userId, setUserId] = useState<string>("");
  const [isActiveUser, setIsActiveUser] = useState<string>("created");
  const [game, setGame] = useState<any>({
    isCompleted: false,
    message: "",
  });

  useEffect(() => {
    if (!roomCode) {
      navigate("/");
    }
    const memorizedNumber: number = Math.floor(Math.random() * 899) + 100;
    setMyBrainNumber(memorizedNumber.toString());

    setUserId(Math.floor(Math.random() * 99).toString());
  }, []);

  useEffect(() => {
    setInputId((num) => num + 1);
    const isFullInput = (inputId - 1) % 3 === 0;

    if (isFullInput) {
      checkedGame();
    }
  }, [userNumber]);

  useEffect(() => {
    socket.on("gameStatus", (data: any) => {
      console.log(data);
      setIsActiveUser(data.isActiveUser);

      if (data.status) {
        setGame({
          isCompleted: true,
          message: "Kaybettin",
        });
      }
    });
  }, [socket]);

  const handleChange = (value: string, index: number) => {
    console.log(value, index);
    console.log(userNumber);

    setUserNumber((number) => number + value);
    inputRefs.current[index + 1]?.focus();
  };

  const checkedGame = () => {
    console.log("checked game e girdi");
    const userData = userNumber.split("").slice(-3);
    const brainNumber = myBrainNumber.split("");

    const isCompleted = userData.every(
      (num, index) => brainNumber[index] === num
    );

    if (isCompleted) {
      const findRow = Math.floor(inputId / 3);

      socket.emit("user-transfer", {
        status: true,
        room: roomCode,
        userId: userId,
        isActiveUser: isActiveUser === "created" ? "invited" : "created",
      });

      setGame({
        isCompleted: true,
        message: "Kazandın",
      });

      userNumber.split("").forEach((_, index: number) => {
        if (Math.floor(index / 3) + 1 === findRow) {
          inputRefs.current[index]?.classList.add("correct");
        }
      });
    } else {
      userNumber.split("").forEach((num, index) => {
        const hasNumber = myBrainNumber.includes(num);
        if (hasNumber) {
          if (num === myBrainNumber[index % 3]) {
            inputRefs.current[index]?.classList.add("correct");
            inputRefs.current[index]?.classList.remove("has-number");
          } else {
            inputRefs.current[index]?.classList.add("has-number");
            inputRefs.current[index]?.classList.remove("correct");
          }
        }
      });

      socket.emit("user-transfer", {
        status: false,
        room: roomCode,
        userId: userId,
        isActiveUser: isActiveUser === "created" ? "invited" : "created",
      });

      setIsActiveUser(isActiveUser === "created" ? "invited" : "created");
    }
  };

  const repeatGame = () => {
    navigate("/");
  };

  return (
    <div className="game-board">
      {game.isCompleted && (
        <div className="game-board__completed">
          <h2>{game.message}</h2>
          <button onClick={repeatGame}>Tekrar Başla</button>
        </div>
      )}
      {/* <h3>{myBrainNumber}</h3> */}
      <p>{userId}</p>
      <div className="game-board__wrapper">
        {Array.from({ length: 15 }).map((_, index: number) => {
          return (
            <div key={index}>
              <input
                onChange={(e) => handleChange(e.target.value, index)}
                type="text"
                ref={(ref) => (inputRefs.current[index] = ref)}
                maxLength={1}
                data-testid={`input-test-id-${inputId}`}
                disabled={index > inputId || isActiveUser !== status}
              />
            </div>
          );
        })}
      </div>
      {isActiveUser !== status && <h3>Rakip Bekleniyor...</h3>}
    </div>
  );
};
