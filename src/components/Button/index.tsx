import { FC } from "react";

type Props = {
  handleClick: () => void;
  label: string;
};

export const Button: FC<Props> = ({ handleClick, label }) => {
  return <button onClick={handleClick}>{label}</button>;
};
