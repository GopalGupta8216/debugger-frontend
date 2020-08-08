import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
class Nav extends Component {
  state = {};
  render() {
    return (
      <nav>
        {/* <div>{/* <img src=".../imagesUsed/logo.png" /> *</div> */}
        <Link to="/home">
          <button className="homeButton">Home</button>
        </Link>
        <Link to="/createProject">
          <button className="createButton">Create Project</button>
        </Link>

        <Link to="/login">
          <button className="logoutButton">Logout</button>
        </Link>
      </nav>
    );
  }
}

export default Nav;
