import React from "react";

interface IMessage {
  className: string;
  message: string;
}

const Message: React.FC<IMessage> = ({ className, message }) => {
  return <span className={`${className} message`}>{message}</span>;
};

export default Message;
