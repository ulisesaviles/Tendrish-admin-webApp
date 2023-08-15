// Imports from React
import { useState } from "react";

// Local imports
import lightLogo from "../assets/logos/light.jpg";
import darkLogo from "../assets/logos/dark.jpg";
import { getTheme } from "../config/theme";
import { defaultTab, login as strings } from "../config/text";

// Animations
import { JackInTheBox } from "react-awesome-reveal";

// Styles
import "../App.css";

// Http requests
import axios from "axios";

// Navigation
import { useHistory } from "react-router-dom";

// Icons
// import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

const Login = () => {
  // Constants
  const [logo, setLogo] = useState(lightLogo);
  const [submitted, setSubmitted] = useState(false);
  const theme = getTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [keepSignedIn, setKeepSignedIn] = useState(false);
  const history = useHistory();
  const [error, setError] = useState(null);

  // Functions
  const handleForgotPass = async () => {
    const email = prompt(strings.forgotPasswordInput[theme.lang]);
    try {
      await axios({
        method: "post",
        url: "https://us-central1-tendrishh.cloudfunctions.net/server",
        data: {
          method: "forgotPassword",
          email,
        },
      }).catch((e) => alert(strings.noSuchEmail[theme.lang]));
    } catch (e) {
      alert(strings.noSuchEmail[theme.lang]);
    }
    alert(strings.forgotPasswordAlert[theme.lang](email));
  };

  const handleSignIn = async () => {
    try {
      const response = await axios({
        method: "post",
        url: "https://us-central1-tendrishh.cloudfunctions.net/server",
        data: {
          method: "admin-signIn",
          email,
          password,
        },
      });

      if (response.status === 200) {
        const storedUser = {
          id: response.data.id,
          personalInfo: response.data.personalInfo,
        };
        localStorage.setItem("user", JSON.stringify(storedUser));
        navigateToDefaultTab(storedUser.personalInfo.rol);
        return;
      }

      setSubmitted(false);
      setError(strings.error[theme.lang]);
    } catch (error) {
      setError(strings.error[theme.lang]);
      setSubmitted(false);
    }
  };

  const navigateToDefaultTab = (rol) => {
    setTimeout(() => history.push(`?tab=${defaultTab[rol]}`), 1000);
  };

  //Logic
  if (theme.colorScheme === "dark" && logo !== darkLogo) {
    setLogo(darkLogo);
  }
  if (theme.colorScheme === "light" && logo !== lightLogo) {
    setLogo(lightLogo);
  }

  // Render
  return (
    <div className="login-container">
      <JackInTheBox duration={800}>
        <img alt="Logo" src={logo} className="login-logo" />
      </JackInTheBox>
      <div className="login-form-container">
        <h1 className="sign-in">{strings.title[theme.lang]}</h1>
        <div className="login-input-container">
          <p className="login-input-name">
            {strings.mailInput.name[theme.lang]}
          </p>
          <input
            className="input"
            placeholder={strings.mailInput.placeHolder[theme.lang]}
            onChange={(text) => setEmail(text.target.value)}
          />
        </div>
        <div className="login-input-container">
          <p className="login-input-name">
            {strings.passwordInput.name[theme.lang]}
          </p>
          <input
            className="input"
            placeholder={strings.passwordInput.placeHolder[theme.lang]}
            type="password"
            onChange={(text) => setPassword(text.target.value)}
            id="password-input"
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                setSubmitted(true);
                handleSignIn();
              }
            }}
          />
        </div>
        {error !== null ? <p className="sign-in-error">{error}</p> : null}

        {/* Keep me signed in */}
        {/* <div
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
          <p className="keep-signed-in">{strings.keepSignedIn[theme.lang]}</p>
        </div> */}

        {/* Login */}
        <div
          className={submitted ? "sign-in-btn btn submited" : "sign-in-btn btn"}
          onClick={() => {
            setSubmitted(true);
            handleSignIn();
          }}
        >
          {strings.btn[theme.lang]}
        </div>

        {/* Forgot pass */}
        <p
          className={
            submitted
              ? "submited login-forgot-password"
              : "login-forgot-password"
          }
          onClick={handleForgotPass}
        >
          {strings.forgotPassword[theme.lang]}
        </p>
      </div>
    </div>
  );
};

export default Login;
