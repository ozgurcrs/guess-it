import { FC, useContext, useEffect, useRef, useState } from "react";
import "./game-board.scss";
import { SocketContext } from "../../context";
import { useLocation, useNavigate } from "react-router-dom";

export const GameBoard: FC = () => {
  const [myBrainNumber, setMyBrainNumber] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
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
    socket.on("gameStatus", (data: any) => {
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
    setUserNumber((number) => {
      const newValue = number + value;

      const isFullInput = newValue.split("").slice(-3);

      if (isFullInput.length % 3 === 0 && (index + 1) % 3 === 0) {
        const getRow = newValue.split("").length % 3;

        checkedGame(newValue, isFullInput, getRow);
      }

      return newValue;
    });

    inputRefs.current[index + 1]?.focus();
  };

  const checkedGame = (allNumbers: any, value: any, row: any) => {
    const brainNumber = myBrainNumber.split("");

    const isCompleted = value.every(
      (num: any, index: number) => brainNumber[index] === num
    );

    if (isCompleted) {
      socket.emit("user-transfer", {
        status: true,
        room: roomCode,
        userId: userId,
        number: userNumber,
        isActiveUser: isActiveUser === "created" ? "invited" : "created",
      });

      setGame({
        isCompleted: true,
        message: "Kazandın",
      });

      allNumbers.split("").forEach((_: any, index: number) => {
        if (Math.floor(index / 3) + 1 === row) {
          inputRefs.current[index]?.classList.add("correct");
        }
      });
    } else {
      allNumbers.split("").forEach((num: any, index: any) => {
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
          <h2>
            {game.message} your number is {myBrainNumber}
          </h2>
          <button onClick={repeatGame}>Tekrar Başla</button>
        </div>
      )}
      <p>{userId}</p>
      <div className="game-board__wrapper">
        {Array.from({ length: 15 }).map((_, index: number) => {
          return (
            <div key={index}>
              <input
                onChange={(e) => handleChange(e.target.value, index)}
                type="number"
                ref={(ref) => (inputRefs.current[index] = ref)}
                maxLength={1}
                disabled={isActiveUser !== status}
              />
            </div>
          );
        })}
      </div>
      {isActiveUser !== status && <h3>Rakip Bekleniyor...</h3>}
    </div>
  );
};
