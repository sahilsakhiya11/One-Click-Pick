import React from "react";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import { Switch, BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from "./component/nav/Header";
import "antd/dist/antd.css"
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
};

export default App;
