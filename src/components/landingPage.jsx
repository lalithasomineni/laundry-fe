import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";

export default function LandingPage() {
  return (
    <div className="buttonsok">
      <div className="containerok">
        <p
          style={{
            fontSize: "16px",
            fontStyle: "italic",
            fontWeight: "bold",
            color: "black",
            padding: "2em 0em",
          }}
        >
          Find laundries near you
        </p>

        <Link to="/nearby" className="btnok effect01ok">
          <span>Let's Go</span>
        </Link>
      </div>
    </div>
  );
}
