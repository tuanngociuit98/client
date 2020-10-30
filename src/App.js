import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./component/layout/Landing";
import Navbar from "./component/layout/Navbar";
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import "./App.css";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthtoken";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./component/layout/Alert";
import Dashboard from "./component/dashboard/Dashboard";
import CreateProfile from "./component/profileForms/CreateProfile";
import Profiles from "./component/profiles/Profiles";
import Profile from "./component/profile/Profile";
import Post from "./component/posts/Posts";

import AddEducation from "./component/profileForms/AddEducation";
import AddExperience from "./component/profileForms/AddExperience";
import PrivateRoute from "./component/routing/PrivateRoute";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/profiles" component={Profiles}></Route>
              <Route exact path="/profile/:id" component={Profile}></Route>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={CreateProfile}
              />
               <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
               <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/posts"
                component={Post}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
