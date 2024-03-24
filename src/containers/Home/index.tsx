import { FC, useContext, useState } from "react";
import "./home.scss";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { getRandomCode } from "../../helper/getRandomCode";
import { Dialog } from "../../components/Dialog";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../context";

export const Home: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isCreateModal, setIsCreateModal] = useState<boolean>(false);
  const [joinCode, setJoinCode] = useState<string>("");
  const [guestRoom, setGuestRoom] = useState<string>("");
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    setIsOpenModal(true);
  };
  const createRoom = async () => {
    const roomId = getRandomCode();
    setJoinCode(roomId);

    await socket.emit("roomId", roomId);
    setIsCreateModal(true);
  };

  const handleClose = () => {
    setIsOpenModal(false);
    setIsCreateModal(false);
  };

  const handleOnClick = () => {
    if (guestRoom.length) {
      socket.emit("roomId", guestRoom);
      navigate("game-board", { state: { roomCode: guestRoom } });
    }
  };
  const handleCreatePlay = () => {
    navigate("game-board", { state: { roomCode: joinCode } });
  };

  return (
    <div className="home">
      <Header
        label="Welcome to Guess It!"
        overview="'Guess It', kelimeler yerine rastgele seçilmiş bir sayıyı tahmin etmeye çalıştığınız eğlenceli ve zihin açıcı bir oyundur. Oyun, hem yetişkinler hem de çocuklar için uygundur ve matematik becerilerini geliştirmenin harika bir yoludur."
      />
      <Dialog
        handleClose={handleClose}
        isOpenModal={isCreateModal}
        handleOnClick={handleCreatePlay}
        element={
          <>
            <p>Aşağıdaki kodu arkadaşınla paylaş ve oynamaya başlayın</p>
            <div className="modal__wrapper__overview__code">
              <span>{joinCode}</span>
            </div>
          </>
        }
      />
      <Dialog
        handleClose={handleClose}
        isOpenModal={isOpenModal}
        handleOnClick={handleOnClick}
        element={
          <>
            <p>Oda numaranızı girin</p>
            <div className="modal__wrapper__overview__code">
              <input
                onChange={(e) => setGuestRoom(e.target.value)}
                type="text"
                placeholder="Write Room Code"
              />
            </div>
          </>
        }
      />
      <div className="home__play-button">
        <Button handleClick={handleJoinRoom} label="Join Room" />
        <Button handleClick={createRoom} label="Create Room" />
      </div>
    </div>
  );
};
