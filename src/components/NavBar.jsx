import React, { Component } from "react";
import "../App.css";
import { Link, withRouter } from "react-router-dom";
import bootstrap, {
  Container,
  Row,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Col,
  Image,
  InputGroup,
} from "react-bootstrap";
import logo from "./images/logo.png";
import AuthenticationButton from "./authComponents/AuthenticationButton";

class NavBar extends Component {
  render() {
    return (
      <Row className="linkedin-nav">
        <Container>
          <Navbar className="mb-4 navnavbar  " expand="lg">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <Row
              className="align-items-center justify-content-center mt-4 collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <Col md={1}>
                <Link to="/">
                  <Image src={logo} />
                </Link>
              </Col>
              <Col md={4}>
                {/* <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2 "
                  style={{
                    width: "390px",
                    height: "45px",
                    marginLeft: "-35px",
                  }}
                />  </Form>*/}

                <Form inline>
                  <InputGroup>
                    <FormControl
                      aria-label="search"
                      aria-describedby="basic-addon1"
                      placeholder="Search and press enter"
                      className="mr-sm-2 "
                      value={this.props.searchString}
                      onKeyDown={this.props.handleSearch}
                      onChange={this.props.handleSearch}
                    />
                  </InputGroup>
                </Form>
              </Col>
              <Col md={7}>
                <ul className="navul">
                  <Link to="/">
                    <li className="navli">
                      <i className="fas nav-icons fa-home ">
                        <br />
                        <span className="nav-icon-text">Home</span>
                      </i>
                    </li>
                  </Link>
                  <Link to="/mynetwork">
                    <li className="navli">
                      <i className="fas nav-icons fa-network-wired ">
                        <br />
                        <span className="nav-icon-text">MyNetwork</span>
                      </i>
                    </li>
                  </Link>
                  <Link to="/jobs">
                    <li className="navli">
                      <i className="fas nav-icons fa-briefcase ">
                        <br /> <span className="nav-icon-text">Jobs</span>
                      </i>
                    </li>
                  </Link>
                  <Link to="/message">
                    <li className="navli">
                      <i className=" nav-icons far fa-comment-dots ">
                        <br />
                        <span className="nav-icon-text">Messaging</span>
                      </i>
                    </li>
                  </Link>
                  <Link to="/">
                    <li className="navli">
                      <i className="fas nav-icons fa-bell ">
                        <br />
                        <span className="nav-icon-text">Notifications</span>
                      </i>
                    </li>
                  </Link>
                  <Link to="/profile/me">
                    <li className="navli">
                      <i className="fas nav-icons fa-user-circle ">
                        <br /> <span className="nav-icon-text">Me</span>
                      </i>
                    </li>
                  </Link>
                  <Link to="/">
                    <li className="navli">
                      <i className="fas nav-icons fa-bars ">
                        <br />
                        <span className="nav-icon-text">Works</span>
                      </i>
                    </li>
                  </Link>
                </ul>
              </Col>
            </Row>
          </Navbar>
          <AuthenticationButton />
        </Container>
      </Row>
    );
  }
}
export default withRouter(NavBar);
