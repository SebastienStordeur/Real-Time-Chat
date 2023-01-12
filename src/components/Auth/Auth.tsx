import React, { Dispatch, SetStateAction } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase.config";
import Cookies from "universal-cookie";
import Button from "../UI/Button";

interface IAuth {
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const Auth: React.FC<IAuth> = ({ setIsAuthenticated }) => {
  const cookies = new Cookies();

  const signInWithGoogle = () => {
    try {
      signInWithPopup(auth, provider).then((result) => {
        console.log(result);
        cookies.set("token", result.user.refreshToken);
        setIsAuthenticated(true);
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="auth">
      <h1>Sign In With Google To Start Chatting</h1>
      <Button onClick={signInWithGoogle}>Sign In With Google</Button>
    </div>
  );
};

export default Auth;
