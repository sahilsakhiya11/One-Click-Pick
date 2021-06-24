import React, { useState, useEffect } from "react";
import { auth } from "./../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button } from "antd";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success(`Email sent to  ${email} to reset the Password`);
      })
      .catch((error) => {
        setLoading(false);
        toast.error("ERROR MESSAGE: " ,error.message);
      });
  };

  return (
    <>
      <div className="container col-md-6 offset-md-3 p-5">
        {loading ? (
          <h4 className="text-danger">loading...</h4>
        ) : (
          <h4>Forgot Password</h4>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="mt-2 form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Type your email"
            autofocus
          />
          <button
            className="btn btn-success mt-3"
            disabled={!email}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
export default ForgotPassword;
