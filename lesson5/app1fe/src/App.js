import React from "react";
import "./App.scss";
import { Route, withRouter, Switch } from "react-router-dom";

import { getCurrentUser, logout } from "./util/APIUtils";

import SideNav from "./sidenav/SideNav";
import TopNav from "./topnav/TopNav";
import Login from "./user/login/Login";
import PrivateRoute from "./PrivateRoute";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  loadCurrentUser() {
    getCurrentUser()
      .then(response => {
        console.log("logged in user -" + JSON.stringify(response));
        this.setState({
          isAuthenticated: true,
        });
      })
      .catch(error => {
        console.log("Error getting current user");
      });
  }

  componentDidMount() {
    console.log("app.js componentDidMount state="+JSON.stringify(this.state));
    if(this.props.location.pathname === "/login") {
      logout();
    } else {
      this.loadCurrentUser();
    }
    console.log("componentDidMount** is user logged in = "+ this.state.isAuthenticated);
  }

  handleLogout(
    redirectTo = "/login",
    notificationType = "success",
    description = "You're successfully logged out."
  ) {
    logout();
    this.setState({
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);

    //TODO Show a notification/toast
  }

  handleLogin() {
    this.setState({
      isAuthenticated: true,
    })
    this.props.history.push("/");
  }

  render() {
    console.log("app.js render state="+JSON.stringify(this.state));
    console.log("rendering for path "+ this.props.location.pathname);
    return (
      <div className="container">
        you are at {this.props.location.pathname} you are {this.state.isAuthenticated? "authenticated":"not authenticated"}
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
