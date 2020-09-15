import React, { Component } from "react";
import axios from "axios";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
  }; /* This is where the magic happens */
  handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post("https://laundrybackend.herokuapp.com/login", user)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        if (this.props.location.redirected)
          window.location = `/book?${this.props.location.price}`;
        else window.location = "/nearby"; //This line of code will redirect you once the submission is succeed
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
     <div className = "login">
     <h1 className = "reghead">login</h1>
      <form className = "logform" onSubmit={this.handleSubmit}>
        <label className = "rllabel">
          {" "}
          Email:
          <input type="email" name="username" placeholder = "enter your registered email"onChange={this.handleChange} />
        </label>
        <label className = "rglabel">
          {" "}
          Password:
          <input type="password" name="password" placeholder = "enter your password" onChange={this.handleChange} />
        </label>
        <button className = "btn btn-success btn-block rgbutton" type="submit"> Add </button>
      </form></div>
    );
  }
}
export default LoginForm;
