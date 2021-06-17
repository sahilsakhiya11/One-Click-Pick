import React, { useState } from "react";
import { auth } from "./../../firebase";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validation
    if (!email || !password) {
      toast.error("Bhai Email ke password bhuli gaya cho, kem aawu karo cho?");
    }
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.signInWithEmailAndPassword(email, password);
    toast.success(
      `Login for ${email} thai rahya cho, santi bhai no pakdo`
    );
    //save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    //clear state
    setEmail("");
    setPassword("");
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter an Email"
        autoFocus
      />
      <input
        type="password"
        className="form-control mt-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter a Password"
        autoFocus
      />
      <button type="submit" className="btn btn-success mt-3">
        Login
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Login</h4>

          {loginForm()}
        </div>
      </div>
    </div>
  );
};

export default Login;
