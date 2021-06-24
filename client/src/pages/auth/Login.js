import React, { useState } from "react";
import { auth, googleAuthProvider } from "./../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {Link} from 'react-router-dom'


const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      //validation
      if (!email || !password) {
        toast.error(
          "Bhai Email ke password bhuli gaya cho, kem aawu karo cho?"
        );
      }

      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult()

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });

      toast.success(`Login for ${email} thai rahya cho, santi bhai no pakdo`);

      
      history.push("/");
    } catch (error) {
      console.log(error)
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });

        toast.success(`Login for ${user.email} thai rahya cho, santi bhai no pakdo`);

        //clear state
        setEmail("");
        setPassword("");
        history.push("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const loginForm = () => (
    <form className="mt-4" onSubmit={handleSubmit}>
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
      />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="btn btn-success mt-3"
        block
        shape="round"
        size="large"
        disabled={!email || password.length < 6}
        icon={<MailOutlined />}
      >
        Login
      </Button>

      <Button
        onClick={googleLogin}
        type="danger"
        className="mt-3"
        block
        shape="round"
        size="large"
        icon={<GoogleOutlined />}
      >
        Login with Google
      </Button>

      <Link to="/forgot/password" className="float-right mt-3 text-danger">
        Forgot Password
      </Link>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-center">Login</h4>
          )}
          {loginForm()}
        </div>
      </div>
    </div>
  );
};

export default Login;
