import React, { useState } from "react";
import Cookies from "universal-cookie";
import Auth from "./components/Auth/Auth";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import RoomForm from "./components/RoomForm/RoomForm";
import "./styles/style.css";

function App() {
  const cookies = new Cookies();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(cookies.get("token"));
  const [room, setRoom] = useState<string | null | undefined>(null);

  return (
    <main id="main">
      {!isAuthenticated && <Auth setIsAuthenticated={setIsAuthenticated} />}
      {isAuthenticated && room === null && <RoomForm setRoom={setRoom} />}
      {isAuthenticated && room && <ChatRoom room={room} />}
    </main>
  );
}

export default App;
