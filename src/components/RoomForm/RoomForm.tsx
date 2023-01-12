import React, { Dispatch, SetStateAction, useRef } from "react";
import Button from "../UI/Button";

interface IRoomForm {
  setRoom: Dispatch<SetStateAction<string | null | undefined>>;
}

const RoomForm: React.FC<IRoomForm> = ({ setRoom }) => {
  const roomInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (roomInputRef.current?.value.trim() === "") return;

    setRoom(roomInputRef.current?.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Join a room</h1>
      <input ref={roomInputRef} />
      <Button type="submit">Join</Button>
    </form>
  );
};

export default RoomForm;
