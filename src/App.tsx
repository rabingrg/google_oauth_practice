import { GoogleLogin } from "@react-oauth/google";
import viteLogo from "/vite.svg";

function App() {
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
      <GoogleLogin
        onSuccess={(credential) => console.log(credential)}
        onError={() => console.log("Sign in failed!")}
      />
    </>
  );
}

export default App;
