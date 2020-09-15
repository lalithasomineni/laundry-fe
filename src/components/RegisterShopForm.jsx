import React, { Component } from "react";
import { geolocated } from "react-geolocated";

import axios from "axios";
import "../style.css";

class RegisterShopForm extends Component {
  state = {
    name: "",
    password: "",
    email: "",
    phoneNumber: null,
    OpeningTime: "",
    ClosingTime: "",
    lat: null,
    lng: null,
    price: null,
    address: "",
    selectedFile: null,
    isChecked: false,
  }; /* This is where the magic happens */

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };
  onClickHandler = () => {
    const data = new FormData();
    data.append("image", this.state.selectedFile);
    data.append("name", this.state.name);
    data.append("password", this.state.password);
    data.append("email", this.state.email);
    data.append("phoneNumber", this.state.phoneNumber);
    data.append("OpeningTime", this.state.OpeningTime);
    data.append("ClosingTime", this.state.ClosingTime);
    if (this.state.lat == null || this.state.lat === "") {
      data.append("lat", this.props.coords.latitude);
      data.append("lng", this.props.coords.longitude);
    } else {
      data.append("lat", this.state.lat);
      data.append("lng", this.state.lng);
    }
    data.append("price", this.state.price);
    data.append("address", this.state.address);

    axios
      .post("https://laundrybackend.herokuapp.com/shops/registershop", data)
      .then((res) => {
        // then print response status
        console.log(res);
        localStorage.setItem("token", res.data.token);
        window.location = "/profile";
      });
  };
  handleFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  render() {
    return (
      <div className="register">
        <h1 className="reghead">Own a laundry shop? Register here</h1>
        <form className="regform" onSubmit={this.handleSubmit}>
          <label className="wlabel">
            {" "}
            Your ShopName Here:
            <input
              type="text"
              name="name"
              placeholder="enter your shop name"
              className="rinput"
              onChange={this.handleChange}
            />
          </label>
          <label className="wlabel">
            {" "}
            Email:
            <input
              type="text"
              name="email"
              placeholder="enter your emailId"
              onChange={this.handleChange}
            />
          </label>
          <label className="wlabel">
            {" "}
            Phone Number:
            <input
              type="number"
              name="phoneNumber"
              placeholder="enter your mobile number"
              className="rinput"
              onChange={this.handleChange}
            />
          </label>

          <label className="wlabel">
            {" "}
            Password:
            <input
              type="password"
              name="password"
              placeholder="set a strong password"
              onChange={this.handleChange}
            />
          </label>
          <label className="wlabel">
            {" "}
            OpeningTime:
            <input
              type="text"
              name="OpeningTime"
              placeholder="enter shop opening time"
              className="rinput"
              onChange={this.handleChange}
            />
          </label>
          <label className="wlabel">
            {" "}
            ClosingTime:
            <input
              type="text"
              name="ClosingTime"
              placeholder="enter shop closing time"
              onChange={this.handleChange}
            />
          </label>
          <label className="wlabel">
            {" "}
            address:
            <input
              type="text"
              name="address"
              placeholder="enter shop address"
              className="rinput"
              onChange={this.handleChange}
            />
          </label>
          {this.props.isGeolocationAvailable &&
            this.props.isGeolocationEnabled && (
              <label>
                <input
                  type="checkbox"
                  checked={this.state.isChecked}
                  onChange={this.toggleChange}
                />
                Send your current location as your laundry's location
              </label>
            )}
          {!this.state.isChecked && (
            <div>
              <label className = "wlabel">
                {" "}
                Latitude:
                <input
                  type="number"
                  name="lat"
                  className="rinput"
                  placeholder="enter the correct point"
                  onChange={this.handleChange}
                />
              </label>
              <label className="wlabel">
                {" "}
                Longitude:
                <input
                  type="number"
                  name="lng"
                  placeholder="enter the correct point"
                  onChange={this.handleChange}
                />
              </label>
            </div>
          )}
          <label className="wlabel">
            {" "}
            price:
            <input
              type="number"
              name="price"
              placeholder="enter your price per cloth"
              onChange={this.handleChange}
            />
          </label>
          <div>
            <input
              type="file"
              name="image"
              className="rimage"
              onChange={this.handleFileChange}
            />
          </div>
          <button
            type="button"
            class="btn btn-success btn-block rbutton"
            onClick={this.onClickHandler}
          >
            Upload and Submit
          </button>
        </form>
        {!this.props.isGeolocationAvailable ? (
          <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
          <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (
          <div>
            {this.props.coords.latitude} {this.props.coords.longitude}
          </div>
        ) : (
          <div>Getting the location data&hellip; </div>
        )}
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(RegisterShopForm);
