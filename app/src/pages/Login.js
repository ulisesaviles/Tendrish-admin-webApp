// Imports from React
import { useState, useEffect } from "react";

// Local imports
import lightLogo from "../assets/logos/light.jpg";
import darkLogo from "../assets/logos/dark.jpg";
// import { getTheme } from "../config/theme";

// Animations
import { JackInTheBox } from "react-awesome-reveal";

// Styles
import "../App.css";

// Http requests
import axios from "axios";

// Navigation
import { useHistory } from "react-router-dom";

// Icons
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

const Login = () => {
  // Conatants
  const [logo, setLogo] = useState(lightLogo);
  const [submited, setSubmited] = useState(false);
  // const [theme, setTheme] = useState(getTheme());
  const [theme, setTheme] = useState({
    lang: "es",
    colorScheme: "light",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const history = useHistory();
  const [error, setError] = useState(null);

  // Functions
  const handleSignIn = async () => {
    try {
      let response = await axios({
        method: "post",
        url: "https://us-central1-tendrishh.cloudfunctions.net/server",
        data: {
          method: "admin-signIn",
          email,
          password,
        },
      });

      if (response.status === 200) {
        let storedUser = {
          id: response.data.id,
          personalInfo: response.data.personalInfo,
        };
        localStorage.setItem("user", JSON.stringify(storedUser));
        history.push("?tab=Stats");
      } else {
        setSubmited(false);
        console.log(`${response.status}: ${response.data.error}`);
        setError("Error al iniciar sesión, comprueba tu correo y contraseña");
      }
    } catch (error) {
      setError("Error al iniciar sesión, comprueba tu correo y contraseña");
      setSubmited(false);
      console.log(`Error: ${error}`);
    }
  };

  //Logic
  useEffect(() => {
    if (theme.colorScheme === "dark") {
      setLogo(darkLogo);
    }
  }, [theme]);

  // Render
  return (
    <div className="login-container">
      <JackInTheBox duration={800}>
        <img alt="Logo" src={logo} className="login-logo" />
      </JackInTheBox>
      <div className="login-form-container">
        <h1 className="sign-in">Iniciar sesión</h1>
        <div className="login-input-container">
          <p className="login-input-name">Correo</p>
          <input
            className="login-input"
            placeholder="alguien@example.com"
            onChange={(text) => setEmail(text.target.value)}
          />
        </div>
        <div className="login-input-container">
          <p className="login-input-name">Contraseña</p>
          <input
            className="login-input"
            placeholder="Contraseña"
            type="password"
            onChange={(text) => setPassword(text.target.value)}
            id="password-input"
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                setSubmited(true);
                handleSignIn();
              }
            }}
          />
        </div>
        {error !== null ? <p className="sign-in-error">{error}</p> : null}
        <div
          onClick={() => {
            setKeepSignedIn(!keepSignedIn);
          }}
          className="keep-signed-in-container"
        >
          {keepSignedIn ? (
            <MdCheckBox className="keep-siged-in-icon" />
          ) : (
            <MdCheckBoxOutlineBlank className="keep-siged-in-icon" />
          )}
          <p className="keep-signed-in">Mantener sesión iniciada</p>
        </div>
        <div
          className={submited ? "sign-in-btn btn submited" : "sign-in-btn btn"}
          onClick={() => {
            setSubmited(true);
            handleSignIn();
          }}
        >
          Iniciar sesión
        </div>
        <p
          className={
            submited
              ? "submited login-forgot-password"
              : "login-forgot-password"
          }
        >
          Olvidé mi contraseña
        </p>
      </div>
    </div>
  );
};

export default Login;
