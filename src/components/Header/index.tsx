import { FC, ReactNode } from "react";
import "./header.scss";
type Props = {
  label?: string;
  overview?: string;
  children?: ReactNode;
};

const RenderLabel = ({ label }: { label: string }) => {
  return label.length ? (
    <div className="header__label">
      <h1>{label}</h1>
    </div>
  ) : (
    ""
  );
};
const RenderOverview = ({ overview }: { overview: string }) => {
  return overview.length ? (
    <div className="header__overview">
      <p>{overview}</p>
    </div>
  ) : (
    ""
  );
};

export const Header: FC<Props> = ({ label = "", overview = "", children }) => {
  return (
    <div className="header">
      <RenderLabel label={label} />
      <RenderOverview overview={overview} />
      {children && children}
    </div>
  );
};
