//mapbox://styles/adhish1/ckf2qj9w743ic19s9d0onpl29
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/landingPage";
import NavBar from "./components/NavBar";
import jwtDecode from "jwt-decode";
import NearByShops from "./components/mapNearbyStores";
import Pickup from "./components/Pickup";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Payment from "./components/Payment";
import Order from "./components/Orders";
import LoginForm from "./components/loginForm";
import RegisterUserForm from "./components/RegisterUserForm";
import RegisterShopForm from "./components/RegisterShopForm";
import Profile from "./components/profile";
import { geolocated } from "react-geolocated";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      // console.log(user);
      this.setState({ user });
    } catch (ex) {}
  }
  render() {
    const user = this.state.user;
    return (
      <div>
        <NavBar user={user} />
        <div className="content">
          <Switch>
            <Route exact path="/order" component={Order} />
            <Route path="/" exact component={LandingPage} />
            {!this.props.isGeolocationAvailable ? (
              <div>Your browser does not support Geolocation</div>
            ) : !this.props.isGeolocationEnabled ? (
              <div>Geolocation is not enabled</div>
            ) : this.props.coords ? (
              <Route
                path="/nearby"
                component={() => (
                  <NearByShops
                    user={user}
                    lat={this.props.coords.latitude}
                    lng={this.props.coords.longitude}
                  />
                )}
              />
            ) : (
              <div>Getting the location data&hellip; </div>
            )}

            <Route path="/profile" component={Profile} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/registershop" component={RegisterShopForm} />
            <Route
              exact
              path="/registercustomer"
              component={RegisterUserForm}
            />
            <Route
              exact
              path="/pickups"
              component={() => <h1>In Development</h1>}
            />
            <Route exact path="/book" component={Pickup} />
            <Route exact path="/payment" component={Payment} />
          </Switch>
        </div>
        {/* {!this.props.isGeolocationAvailable ? (
          <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
          <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (
          <div>
            {this.props.coords.latitude} {this.props.coords.longitude}
          </div>
        ) : (
          <div>Getting the location data&hellip; </div>
        )} */}
      </div>
    );
  }
}
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);
