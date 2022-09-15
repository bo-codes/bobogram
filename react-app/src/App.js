import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/Global/Elements/Navbar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Posts from "./components/Pages/ExplorePage/ExplorePage";
import { authenticate } from "./store/session";
import Footer from "./components/Global/Elements/Footer/index";
import HomePage from "./components/Pages/HomePage/HomePage";
import SplashPage from "./components/Pages/SplashPage/SplashPage";
import ErrorPage from "./components/Pages/404/404";
import ProfilePage from "./components/Pages/ProfilePage/ProfilePage";
import UsersProfilePage from "./components/Pages/UsersProfilePage/UsersProfilePage";
import PostDetailPage from "./components/Pages/PostDetailPage/PostDetailPage";
import Signup from "./components/auth/Pages/SignupPage/Signup";
import ExplorePage from "./components/Pages/ExplorePage/ExplorePage";
import AccountEditPage from "./components/Pages/AccountEditPage/AccountEditPage";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const posts = Object.values(useSelector((state) => state.posts));

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <SplashPage />
        </Route>
        <Route path="/signup" exact={true}>
          <Signup />
        </Route>
        <ProtectedRoute path="/home" exact={true}>
          <NavBar />
          <HomePage />
        </ProtectedRoute>
        <ProtectedRoute path="/:username" exact={true}>
          <NavBar />
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/explore/posts" exact={true}>
          <NavBar />
          <ExplorePage />
        </ProtectedRoute>
        <ProtectedRoute path="/accounts/edit" exact={true}>
          <NavBar />
          <AccountEditPage />
        </ProtectedRoute>
        <ProtectedRoute path="/posts">
          <NavBar />
          <PostDetailPage />
        </ProtectedRoute>
        <Route path="">
          <NavBar />
          <ErrorPage />
        </Route>
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
