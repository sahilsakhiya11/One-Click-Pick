import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./component/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import UserRoute from "./component/routes/UserRoute";
import AdminRoute from "./component/routes/AdminRoute";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import SubCreate from "./pages/admin/sub/SubCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";

const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        //getting a user Token
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);

        currentUser(idTokenResult.token)
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
          .catch((err) => console.log(err));
      }
    });

    //clean up and sipatch to redux
    return () => unsubscribe();
  }, [dispatch]);

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
        <UserRoute path="/user/password" exact component={Password} />
        <UserRoute path="/user/wishlist" exact component={Wishlist} />
        <UserRoute path="/user/History" exact component={History} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/category" exact component={CategoryCreate} />
        <AdminRoute
          path="/admin/category/:slug"
          exact
          component={CategoryUpdate}
        />
        <AdminRoute path="/admin/sub" exact component={SubCreate} />
        <AdminRoute path="/admin/sub/:slug" exact component={SubUpdate} />
        <AdminRoute path="/admin/product" exact component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub/:slug" component={SubHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
      </Switch>
    </>
  );
};

export default App;
