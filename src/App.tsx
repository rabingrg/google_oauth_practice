import {
  GoogleCredentialResponse,
  useGoogleLogin,
  googleLogout,
} from "@react-oauth/google";
import viteLogo from "/vite.svg";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState<GoogleCredentialResponse | null>();
  const [profile, setProfile] = useState<any>();

  const handleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) =>
      setUser(credentialResponse as GoogleCredentialResponse),
  });

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    setProfile(null);
  };

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user?.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((response) => setProfile(response?.data))
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {profile ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>
            Signed in with:{" "}
            <span style={{ color: "blue", fontStyle: "italic" }}>
              {profile?.name}
            </span>
          </p>
          <button style={{ width: "70px" }} onClick={() => handleLogout()}>
            Log out
          </button>
        </div>
      ) : (
        <button onClick={() => handleLogin()}>Sign in with Google</button>
      )}
    </>
  );
}

export default App;
