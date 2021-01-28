import React, { PureComponent } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

//PERSONAL COMPONENTS
import DropDown from "./DropDown";
import AuthenticationButton from "../../authComponents/LogoutButton";
//ASSETS
import logo from "../../images/logo.png";
//STYLE
import "./LinkedinNav.scss";

export default class LinkedinNav extends PureComponent {
  state = {
    dropdown: false,
  };

  showDropdown = () => {
    this.setState({ dropdown: !this.state.dropdown });
  };

  render() {
    return (
      <nav nav id="linkedin-nav">
        <Container>
          <img src={logo} alt="" />
          <div className="toggle-nav">
            <i className="fas nav-icons fa-bars "></i>
          </div>
          <div className="searchBar">
            <input
              type="text"
              placeholder="Search for..."
              value={this.props.searchString}
              onKeyDown={this.props.handleSearch}
              onChange={this.props.handleSearch}
            />
          </div>
          <ul className="menu">
            <li>
              <Link to="/">
                <i className="fas nav-icons fa-home "></i>
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/mynetwork">
                <i className="fas nav-icons fa-network-wired "></i>
                <span>My Network</span>
              </Link>
            </li>
            <li>
              <Link to="/jobs">
                <i className="fas nav-icons fa-briefcase "></i>
                <span>Jobs</span>
              </Link>
            </li>
            <li>
              <Link to={`/message/me`}>
                <i className="nav-icons far fa-comment-dots"></i>
                <span>Messaging</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="fas nav-icons fa-bell"></i>
                <span>Notifications</span>
              </Link>
            </li>
            <li>
              <div className="menu-item" onClick={() => this.showDropdown()}>
                <i className="fas nav-icons fa-user-circle"></i>
                <span>Me</span>
                <DropDown show={this.state.dropdown}>
                  <li>
                    <Link to={`/profile/me`}>View Profile</Link>
                  </li>
                  <li>
                    <AuthenticationButton />
                  </li>
                </DropDown>
              </div>
            </li>
            <li>
              <div className="menu-item">
                <i className="fas nav-icons fa-bars"></i>
                <span>Works</span>
              </div>
            </li>
          </ul>
        </Container>
      </nav>
    );
  }
}
