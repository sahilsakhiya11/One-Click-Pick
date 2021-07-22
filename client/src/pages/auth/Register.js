import React, { useState, useEffect } from "react";
import { auth } from "./../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validation
    if (!email) {
      toast.error("Bhai Email to nakho, kem aawu karo cho?");
    }
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration`
    );
    //save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    //clear state
    setEmail("");
  };

  const registerForm = () => (
    <form className="mt-4" onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter an Email"
        autoFocus
      />

      <Button
        onClick={handleSubmit}
        type="primary"
        className="btn btn-success mt-3"
        block
        shape="round"
        size="large"
        disabled={!email}
        icon={<MailOutlined />}
      >
        Register
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4 className="text-center">Register</h4>

          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
