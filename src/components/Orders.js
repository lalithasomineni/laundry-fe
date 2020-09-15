import React, { Component } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
export default class PersonList extends React.Component {
  state = {
    orders: [],
    isShop: false,
    isUser: false,
  };

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      console.log(user);
      if (user.isShop) {
        axios
          .get(
            `https://laundrybackend.herokuapp.com/book?shopemail=${user.email}`
          )
          .then((res) => {
            const orders = res.data;
            this.setState({ orders, isShop: true });
          });
      } else if (user.isUser) {
        axios
          .get(
            `https://laundrybackend.herokuapp.com/book/user?useremail=${user.email}`
          )
          .then((res) => {
            const orders = res.data;
            console.log(res.data);
            this.setState({ orders, isUser: true });
          });
      }
    } catch (ex) {}
  }

  render() {
    return (
      <div className = "list">
      <ul className = "ulist">
        {this.state.orders.map((order) => (
          <li className = "elements">
            {this.state.isShop && <div className = "email">{order.useremail}</div>}
            <div className = "order">{order.quantity}</div>
            {this.state.isUser && <div className = "shopemail">{order.shopemail}</div>}
            <div className = "slot">{order.slot}</div>
          </li>
        ))}
      </ul>
      </div>
    );
  }
}
