import { FC, ReactNode } from "react";
import Modal from "../Modal";

type Props = {
  isOpenModal: boolean;
  handleClose: () => void;
  element: ReactNode;
  handleOnClick: () => void;
};

export const Dialog: FC<Props> = ({
  isOpenModal,
  handleClose,
  element,
  handleOnClick,
}) => {
  return (
    <Modal isOpen={isOpenModal} handleClose={handleClose}>
      <Modal.Title>Guess It!</Modal.Title>
      <Modal.Panel>
        <div className="modal__wrapper">{element}</div>
      </Modal.Panel>
      <Modal.Actions>
        <button onClick={handleOnClick}>Play</button>
      </Modal.Actions>
    </Modal>
  );
};
