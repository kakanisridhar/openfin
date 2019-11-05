import React from "react";
import "./App.scss";
import { Route, withRouter, Switch } from "react-router-dom";

import { getCurrentUser, logout } from "./util/APIUtils";

import SideNav from "./sidenav/SideNav";
import TopNav from "./topnav/TopNav";
import Login from "./user/login/Login";
import LoadingIndicator from "./components/LoadingIndicator";
import PrivateRoute from "./PrivateRoute";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
      });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(
    redirectTo = "/login",
    notificationType = "success",
    description = "You're successfully logged out."
  ) {
    logout();
    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);

    //TODO Show a notification/toast
  }

  handleLogin() {
    this.setState({
      currentUser: null,
      isAuthenticated: true,
      isLoading: false
    })
    this.props.history.push("/");
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }
    return (
      <div className="container">
        <Switch>
          <Route
            path="/login"
            render={props => <Login onLogin={this.handleLogin} {...props} />}
          ></Route>
          <PrivateRoute
            authenticated={this.state.isAuthenticated}
            path="/"
            component={TopNav}
            handleLogout={this.handleLogout}
          ></PrivateRoute>
          <PrivateRoute
            authenticated={this.state.isAuthenticated}
            path="/sidenav"
            component={SideNav}
          ></PrivateRoute>
          <Route>
            <h2>404</h2>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
