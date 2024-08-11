import React, { MouseEventHandler } from "react";

export type ListViewIconProps = {
  color?: string;
  onClickHandler?: MouseEventHandler<SVGSVGElement>;
};

export const ListViewIcon: React.FC<ListViewIconProps> = ({
  color,
  onClickHandler,
}) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClickHandler}
      style={{ cursor: onClickHandler ? "pointer" : "default" }}
    >
      <rect x="0.5" y="0.5" width="15" height="3" stroke={color} />
      <rect x="0.5" y="6.5" width="15" height="3" stroke={color} />
      <rect x="0.5" y="12.5" width="15" height="3" stroke={color} />
    </svg>
  );
};
