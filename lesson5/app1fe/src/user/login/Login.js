import React, { Component } from "react";
import { login, logout } from "../../util/APIUtils";
import "./Login.css";
import { ACCESS_TOKEN } from "../../constants";
import { ErrorToast } from "../../components/ErrorToast";

import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup
} from "@blueprintjs/core";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const loginRequest = Object.assign({}, this.state);
    login(loginRequest)
      .then(response => {
        localStorage.setItem(ACCESS_TOKEN, response.token);
        this.props.onLogin();
      })
      .catch(error => {
        logout();
        if (error.status === 401) {
          ErrorToast.show({ message: "Your Username or Password is incorrect. Please try again!" });
        } else {
          ErrorToast.show({ message: "Sorry! Something went wrong. Please try again!" });              
        }
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Card interactive={true} elevation={Elevation.TWO}>
          <h1>Login</h1>
          <FormGroup
            label="User name"
            labelFor="username"
            labelInfo="(required)"
          >
            <InputGroup id="username" placeholder="username" onChange = {this.handleChange}/>
          </FormGroup>
          <FormGroup
            label="Password"
            labelFor="password"
            labelInfo="(required)"
          >
            <InputGroup id="password" placeholder="password" onChange = {this.handleChange} type="password"/>
          </FormGroup>
          <Button className="bp3-intent-primary" type="submit">
            Login
          </Button>
        </Card>
      </form>
    );
  }
}

export default Login;
