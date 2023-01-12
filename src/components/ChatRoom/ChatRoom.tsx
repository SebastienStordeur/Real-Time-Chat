import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase.config";
import Button from "../UI/Button";
import Message from "./Message";

interface IChatRoom {
  room: string;
}

const ChatRoom: React.FC<IChatRoom> = ({ room }) => {
  const [message, setMessage] = useState<string>("");
  const messagesCollectionRef = collection(db, "messages");
  const [messages, setMessages] = useState<any>([]);
  const userId = auth.currentUser!.uid;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (message.trim() === "") return;

    await addDoc(messagesCollectionRef, {
      message,
      user: auth.currentUser!.displayName,
      userId,
      room,
      createdAt: serverTimestamp(),
    });
    setMessage("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    const messageQuery = query(messagesCollectionRef, where("room", "==", room), orderBy("createdAt"));
    const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
      let messages: any[] = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="chatroom">
      <div className="display-messages">
        <div>
          <h1>Room: {room}</h1>
        </div>
        {messages.map((message: any) => {
          return (
            <Message
              key={message.id}
              className={userId === message.userId ? "own" : "else"}
              message={message.message}
            />
          );
        })}
      </div>
      <form className="message-form" onSubmit={handleSubmit}>
        <input placeholder="Type your message" onChange={handleChange} />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
};

export default ChatRoom;
