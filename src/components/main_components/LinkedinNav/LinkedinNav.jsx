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
    collapseMenu: false,
  };

  showDropdown = () => {
    this.setState({ dropdown: !this.state.dropdown });
  };

  collapseMenu = () => {
    this.setState({ collapseMenu: !this.state.collapseMenu });
  };

  render() {
    return (
      <nav nav id="linkedin-nav">
        <Container>
          <img src={logo} alt="" />
          <div className="toggle-nav" onClick={() => this.collapseMenu()}>
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
          <ul
            className="menu"
            // style={
            //   this.state.collapseMenu
            //     ? { display: "block" }
            //     : { display: "none" }
            // }
          >
            <li>
              <Link to="/">
                <div
                  className="link-content"
                  style={
                    this.state.collapseMenu
                      ? {
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }
                      : {
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }
                  }
                >
                  <i className="fas nav-icons fa-home "></i>
                  <span>Home</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/mynetwork">
                <div
                  className="link-content"
                  style={
                    this.state.collapseMenu
                      ? {
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }
                      : {
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }
                  }
                >
                  <i className="fas nav-icons fa-network-wired "></i>
                  <span>My Network</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/jobs">
                <div
                  className="link-content"
                  style={
                    this.state.collapseMenu
                      ? {
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }
                      : {
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }
                  }
                >
                  <i className="fas nav-icons fa-briefcase "></i>
                  <span>Jobs</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to={`/message/me`}>
                <div
                  className="link-content"
                  style={
                    this.state.collapseMenu
                      ? {
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }
                      : {
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }
                  }
                >
                  <i className="nav-icons far fa-comment-dots"></i>
                  <span>Messaging</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/">
                <div
                  className="link-content"
                  style={
                    this.state.collapseMenu
                      ? {
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }
                      : {
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }
                  }
                >
                  <i className="fas nav-icons fa-bell"></i>
                  {this.props.notifications === 0 ? (
                    ""
                  ) : (
                    <div
                      id="total-not"
                      style={{
                        position: "absolute",
                        borderRadius: "50%",
                        top: "-5px",
                        right: "1.50rem",
                        width: "20px",
                        height: "20px",
                        backgroundColor: "red",
                      }}
                    >
                      <p
                        style={{
                          margin: "0",
                          marginTop: "-2px",
                          fontWeight: "800",
                          color: "white",
                        }}
                      >
                        {this.props.notifications}
                      </p>
                    </div>
                  )}
                  <span style={{ position: "relative" }}>Notifications </span>
                </div>
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
