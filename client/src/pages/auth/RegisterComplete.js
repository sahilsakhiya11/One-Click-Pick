import React, { useState, useEffect } from "react";
import { auth } from "./../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {createOrUpdateUser} from "../../functions/auth";


const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();


  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    console.log(window.localStorage.getItem("emailForRegistration"));
    console.log(window.location.href);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //validation
      if (!password) {
        toast.error("Password taro baap nakhse");
      } else if (password.length < 6) {
        toast.error("Password must be more than 6 Characters");
      } else {
        const result = await auth.signInWithEmailLink(
          email,
          window.location.href
        );
        console.log("Result", result);
        toast.success(`Completing Registration for ${email}. `);
        if (result.user.emailVerified) {
          //remove email from the localstorage
          window.localStorage.removeItem("emailForRegistration");
          // get user id token
          let user = auth.currentUser;
          await user.updatePassword(password);
          const idToken = await user.getIdTokenResult();
          const idTokenResult = await user.getIdTokenResult();
 
          //redux store
          console.log(user, idToken);

          createOrUpdateUser(idTokenResult.token)
            .then((res) => {
              dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                  name: res.data.name,
                  role: res.data.role,
                  _id: res.data._id,
                  email: res.data.email,
                  token: idTokenResult.token,
                },
              });
            })
            .catch();
          //redirect
          history.push("/");
        }
      }
    } catch (error) {
      console.error();
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />
      <input
        type="password"
        className="form-control mt-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        placeholder="Enter a Password"
      />

      <button type="submit" className="btn btn-success mt-3">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
