import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Locations from "./components/Locations";
import ClimbersList from "./components/ClimbersList";
import CurrentUser from "./components/CurrentUser";
import SplashPage from "./components/SplashPage";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="app">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            {user ? <Redirect to="/home" /> : <SplashPage />}
          </Route>
          <Route exact path="/home">
            {user ? <Locations /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/locations/:locationId">
            <ClimbersList />
          </Route>
          <Route path="/current/blacklist">
            <div />
          </Route>
          <Route path="/current">
            <CurrentUser />
          </Route>
          <Route path="/users/:userId">
            <div />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
