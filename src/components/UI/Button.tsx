import React from "react";

interface IButton {
  children: string;
  onClick?: () => void;
}

const Button: React.FC<IButton> = (props) => {
  const { children, onClick } = props;
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
