import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class NavBar extends Component {
  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location = "/";
  }

  render() {
    const loginRegLink = (
      <ul className="navbar-nav">
        {!this.props.user && (
          <React.Fragment>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/registercustomer" className="nav-link">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/registershop" className="nav-link">
                Own a laundry?
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/registershop" className="nav-link">
                {this.props.user}
              </Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    );

    const userLink = (
      <ul className="navbar-nav">
        {this.props.user && this.props.user.isShop && (
          <React.Fragment>
            <li className="nav-item">
              <Link to="/order" className="nav-link">
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                {this.props.user.name}
              </Link>
            </li>
          </React.Fragment>
        )}
        {this.props.user && this.props.user.isUser && (
          <React.Fragment>
            <li className="nav-item">
              <Link to="/order" className="nav-link">
                PickUps
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                {this.props.user.name}
              </Link>
            </li>
          </React.Fragment>
        )}
        <li className="nav-item">
          <a href="#3" onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          {this.props.user && (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/nearby" className="nav-link">
                  Home
                </Link>
              </li>
            </ul>
          )}
          {!this.props.user && (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
            </ul>
          )}
          {localStorage.token ? userLink : loginRegLink}
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);
