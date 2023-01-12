import React from "react";

interface IButton {
  children: string;
  onClick?: () => void;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

const Button: React.FC<IButton> = (props) => {
  const { children, type, onClick } = props;
  return (
    <button className="button" type={type || "button"} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
