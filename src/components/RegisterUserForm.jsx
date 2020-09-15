import React, { Component } from "react";
import axios from "axios";

export default class RegisterUserForm extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    phoneNumber: null,
  }; /* This is where the magic happens */
  handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
    };
    axios
      .post("https://laundrybackend.herokuapp.com/user/registercustomer", user)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        window.location = "/profile";
        // window.location = "/retrieve"; //This line of code will redirect you once the submission is succeed
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
    <div className="register">
        <h1 className="reghead">
          Want to find laundry shops near you?Register here
        </h1>
      <form className = "regtform" onSubmit={this.handleSubmit}>
        <label className = "rlabel">
          {" "}
          Your Name Here:
          <input type="text" name="username" placeholder = "enter your name" 
           className="rinput"
          onChange={this.handleChange} />
        </label>
        <label className = "rlabel">
          {" "}
          Email:
          <input type="text" name="email" placeholder = "enter your emailId"onChange={this.handleChange} />
        </label>
        <label className = "rlabel">
          {" "}
          Phone Number:
          <input
            type="number"
            name="phoneNumber"
             className="rinput"
             placeholder ="enter your mobile number"
            onChange={this.handleChange}
          />
        </label>

        <label className = "rlabel">
          {" "}
          Password:
          <input type="password" name="password" 
          placeholder = "set a strong password"
           onChange={this.handleChange} />
        </label>
        <button className="btn btn-success btn-block rgbutton" type="submit"> Register </button>
      </form>
      </div>
    );
  }
}
