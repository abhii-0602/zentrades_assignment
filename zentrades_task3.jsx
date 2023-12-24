import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
function Login() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const expectedPassword = "SmartServTest@123";
  const navigate = useNavigate();
  const errors = {
    uname: "Invalid email format",
    pass: "Invalid password format",
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { uname, pass } = event.target.elements;

    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(uname.value);
    const isPasswordValid = pass.value === expectedPassword;

    if (!isEmailValid) {
      setErrorMessages({ name: "uname", message: errors.uname });
    } else if (!isPasswordValid) {
      setErrorMessages({ name: "pass", message: errors.pass });
    } else {
      setIsSubmitted(true);
      navigate('/zentradetask4'); 
    }
  };

  const handleForgotPassword = () => {
    window.location.href = "mailto:support@smartserv.io?subject=Password Reset Request";
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && <div className="error">{errorMessages.message}</div>;

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          
          <input
          placeholder="Username"
            type="text"
            name="uname"
            required
            onBlur={(e) => {
              const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value);
              setErrorMessages({ name: "uname", message: isEmailValid ? "" : errors.uname });
            }}
          />
          {renderErrorMessage("uname")}
        
        
          
          <input
          placeholder="Password"
            type="password"
            name="pass"
            required
            pattern="^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@]+$"
            
            onBlur={(e) => {
              const isPasswordValid = e.target.value === expectedPassword;
              setErrorMessages({ name: "pass", message: isPasswordValid ? "" : errors.pass });
            }}
          />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" value="login" />
        </div>
      </form>
      <div className="forgot-password" onClick={handleForgotPassword}>
        <a href="#">Forgot your password?</a>
      </div>
    </div>
  );

  return (
    <div className="app">
      
      <div className="login-form">{isSubmitted ? <div><navigate to="/zentradetask4" /></div> : renderForm}</div>
    </div>
  );
}

export default Login;
