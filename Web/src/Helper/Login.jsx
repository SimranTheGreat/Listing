import { GoogleLogin } from "@react-oauth/google";
import {useAuthStore}from "../Store";

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const handleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      });

      const data = await response.json();
      login(data.user);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Login Failed")}
    />
  );
}
