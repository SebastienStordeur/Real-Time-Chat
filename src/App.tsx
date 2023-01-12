import React, { useState } from "react";
import Cookies from "universal-cookie";
import Auth from "./components/Auth/Auth";
import "./styles/style.css";

function App() {
  const cookies = new Cookies();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(cookies.get("token"));
  return (
    <main id="main">
      {!isAuthenticated && <Auth setIsAuthenticated={setIsAuthenticated} />}
      {isAuthenticated && <h1>Join a room</h1>}
    </main>
  );
}

export default App;
