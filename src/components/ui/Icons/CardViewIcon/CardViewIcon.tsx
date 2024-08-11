import React, { MouseEventHandler } from "react";

export type CardViewIconProps = {
  color?: string;
  onClickHandler?: MouseEventHandler<SVGSVGElement>;
};

export const CardViewIcon: React.FC<CardViewIconProps> = ({
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
      <rect x="0.5" y="0.5" width="6" height="6" stroke={color} />
      <rect x="0.5" y="9.5" width="6" height="6" stroke={color} />
      <rect x="9.5" y="0.5" width="6" height="6" stroke={color} />
      <rect x="9.5" y="9.5" width="6" height="6" stroke={color} />
    </svg>
  );
};
