import React from "react";
import "./App.scss";
import { Route, withRouter, Switch } from "react-router-dom";

import { getCurrentUser, logout } from "./util/APIUtils";

import LoadingIndicator from "./components/LoadingIndicator";
import SideNav from "./sidenav/SideNav";
import TopNavContainer from "./topnav/TopNavContainer";
import Login from "./user/login/Login";
import PrivateRoute from "./PrivateRoute";
import SlaContainer from "./SLA/SlaContainer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: true
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  loadCurrentUser() {
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
    if(this.props.location.pathname === "/login") {
      logout();
      this.setState({
        isLoading: false
      });
    } else {
      this.loadCurrentUser();
    }
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
      isAuthenticated: true,
      isLoading: false
    })
    this.props.history.push("/app");
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
            path="/sidenav"
            component={SideNav}
          ></PrivateRoute>
          <PrivateRoute
            authenticated={this.state.isAuthenticated}
            path="/app"
            component={TopNavContainer}
            handleLogout={this.handleLogout}
          ></PrivateRoute>
          <PrivateRoute
            authenticated={this.state.isAuthenticated}
            path="/sla"
            component={SlaContainer}
          ></PrivateRoute>
          <PrivateRoute
            authenticated={this.state.isAuthenticated}
            path="/members"
            component={SlaContainer}
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
