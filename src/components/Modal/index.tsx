import { FC, ReactNode, createContext, createElement, Children } from "react";
import "./modal.scss";
import { IoMdClose } from "react-icons/io";

type ModalContextType = {
  isOpen: boolean;
  handleClose: () => void;
};

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  handleClose: () => {},
});

type Props = {
  isOpen: boolean;
  children?: ReactNode[] | ReactNode;
  handleClose: () => void;
};

const Modal: FC<Props> & {
  Title: FC<TitleProps>;
  Panel: FC<PanelProps>;
  Actions: FC<ActionsProps>;
} = ({ children, isOpen, handleClose }) => {
  const initialState = {
    isOpen: isOpen,
    handleClose: handleClose,
  };

  return isOpen ? (
    <ModalContext.Provider value={initialState}>
      <div className="modal">
        <div className="modal__container">
          <div className="modal__header">
            {Children.map(children, (child, index) =>
              index === 0 ? child : null
            )}
            <IoMdClose onClick={handleClose} />
          </div>
          <div className="modal__overview">
            {Children.map(children, (child, index) =>
              index === 1 ? child : null
            )}
          </div>
          <div className="modal__action">
            {Children.map(children, (child, index) =>
              index === 2 ? child : null
            )}
          </div>
        </div>
      </div>
    </ModalContext.Provider>
  ) : null;
};

type TitleProps = {
  children: ReactNode;
};

const RenderModalTitle: FC<TitleProps> = ({ children, ...props }) => {
  return createElement("h4", props, children);
};

type PanelProps = {
  children: ReactNode;
};

const RenderModalPanel: FC<PanelProps> = ({ children, ...props }) => {
  return createElement("div", props, children);
};

type ActionsProps = {
  children: ReactNode;
};

const RenderModalActions: FC<ActionsProps> = ({ children, ...props }) => {
  return createElement("div", props, children);
};

Modal.Title = RenderModalTitle;
Modal.Panel = RenderModalPanel;
Modal.Actions = RenderModalActions;

export default Modal;
