import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import "../css/RightSide.scss";
import footericon from "../images/footericon.png";
class RightSide extends Component {
  render() {
    return (
      <div>
        <div className="card" style={{ borderRadius: "10px" }}>
          <div className="card-body">
            <h5 className="card-title">Add to your feed</h5>
            <Row>
              <Col xs={2}>
                <img
                  alt=""
                  style={{ borderRadius: "50%" }}
                  src="https://via.placeholder.com/20C/O https://placeholder.com/"
                ></img>
              </Col>
              <Col xs={5}>
                <span style={{ fontSize: "14px" }}>#linkedin</span>
              </Col>
              <Col xs={5}>
                <button style={{ fontSize: "11px", border: "0" }}>
                  + Follow
                </button>
              </Col>
            </Row>
            <Row>
              <Col xs={2}>
                <img
                  alt=""
                  style={{ borderRadius: "50%" }}
                  src="https://via.placeholder.com/20C/O https://placeholder.com/"
                ></img>
              </Col>
              <Col xs={5}>
                <span style={{ fontSize: "14px" }}>#motivation</span>
              </Col>
              <Col xs={5}>
                <button style={{ fontSize: "11px", border: "0" }}>
                  + Follow
                </button>
              </Col>
            </Row>
            <Row>
              <Col xs={2}>
                <img
                  alt=""
                  style={{ borderRadius: "50%" }}
                  src="https://via.placeholder.com/20C/O https://placeholder.com/"
                ></img>
              </Col>
              <Col xs={5}>
                <span style={{ fontSize: "14px" }}>Bill Gates</span>
              </Col>
              <Col xs={5}>
                <button style={{ fontSize: "11px", border: "0" }}>
                  + Follow
                </button>
              </Col>
            </Row>
          </div>
        </div>

        <div id="ads-course">
          <header>
            <p>Today's most viewed courses</p>
            <i className="fas fa-info"></i>
          </header>
          <ul>
            <li>
              <p>The Six Morning Habits</p>
              <p>Pete Mockaitis | How to Be Awesome at Your Job</p>
            </li>
            <li>
              <p>Unconsious Bias</p>
              <p>Stacey Gordon</p>
            </li>
            <li>
              <p>Time Management for Busy People</p>
              <p>Madecraft and Samantha Bennett</p>
            </li>
          </ul>
          <p className="linkedin-learning">Show more on LinkedIn Learning</p>
        </div>

        <div id="footer-right" style={{ position: "sticky", top: "60px" }}>
          <div className="links-footer-right">
            <span>About</span>
            <span>Accessibility</span>
            <span>Help Center</span>
            <span>Privacy & Terms</span>
            <span>Ad Choices</span>
            <span>Advertising</span>
            <span>Business Services</span>
            <span>Get the LinkedIn app</span>
          </div>
          <p>More</p>
          <div className="linkedin-rights">
            <span>
              <img src={footericon} alt="" />
            </span>
            <span>Linkedin Corporation © 2020</span>
          </div>
        </div>
      </div>
    );
  }
}
export default RightSide;
