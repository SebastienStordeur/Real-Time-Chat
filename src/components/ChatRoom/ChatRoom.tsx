import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../../firebase/firebase.config";
import Button from "../UI/Button";

interface IChatRoom {
  room: string;
}

const ChatRoom: React.FC<IChatRoom> = ({ room }) => {
  const [message, setMessage] = useState<string>("");
  const messagesCollectionRef = collection(db, "messages");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (message.trim() === "") return;

    await addDoc(messagesCollectionRef, {
      message,
      user: auth.currentUser!.displayName,
      room,
      createdAt: serverTimestamp(),
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <div className="chatroom">
      <div className="display-messages">
        <div>
          <h1>Room: {room}</h1>
        </div>
      </div>
      <form className="message-form" onSubmit={handleSubmit}>
        <input placeholder="Type your message" onChange={handleChange} />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
};

export default ChatRoom;
