import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import { Switch, BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from "./component/nav/Header";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        //getting a user Token
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
      }
    });

    //clean up and sipatch to redux
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header />

      <ToastContainer />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/register/complete" exact component={RegisterComplete} />
        <Route path="/forgot/password" exact component={ForgotPassword} />
      </Switch>
    </>
  );
};

export default App;
