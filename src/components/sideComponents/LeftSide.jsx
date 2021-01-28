import React, { Component } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import "../../App.css";

class LeftSide extends React.Component {
  state = {
    user: null,
  };

  fetchUser = async () => {
    try {
      if (typeof this.props.userId === "string") {
        const response = await fetch(
          process.env.REACT_APP_BASE_URL + `/profiles/${this.props.userId}`
        );
        const user = await response.json();
        this.setState({ user });
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    return (
      <>
        <Card style={{ borderRadius: "10px" }}>
          <Card.Header className="card-header">
            {this.state.user ? (
              <Card.Img
                style={{
                  height: "70px",
                  width: "70px",
                  borderRadius: "50%",
                  alignSelf: "center",
                }}
                variant="top"
                src={this.state.user.image}
              />
            ) : (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            )}
          </Card.Header>

          <Card.Body>
            {this.state.user ? (
              <Card.Title>
                Welcome,{this.state.user.name}! <br />
                <a style={{ fontSize: "12px" }} href="/">
                  Add a Photo
                </a>
              </Card.Title>
            ) : (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            )}

            <hr />
            <Card.Text>
              <Row>
                <Col style={{ textAlign: "left" }}>
                  <div>
                    <div
                      style={{
                        color: "gray",
                        fontSize: "13px",
                      }}
                    >
                      <span>Connections</span>
                    </div>
                    <div>
                      <span style={{ fontSize: "13px" }}>
                        Grow your network
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div>
                      <a
                        style={{
                          color: "gray",
                          fontSize: "13px",
                        }}
                      >
                        Access exclusive tools insights
                      </a>
                    </div>
                    <div>
                      <a style={{ fontSize: "13px" }}>
                        <i
                          class="fas fa-square"
                          style={{ color: "rgb(186, 189, 11)" }}
                        ></i>
                        Reactivate Premium
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p style={{ fontSize: "13px" }}>
                      <i class="fas fa-bookmark"></i>My items
                    </p>
                  </div>
                </Col>
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card
          style={{
            borderRadius: "10px",
            marginTop: "8px",
            position: "sticky",
            top: "60px",
          }}
        >
          <Card.Body>
            <Card.Text>
              <Row>
                <Col style={{ textAlign: "left" }}>
                  <div>
                    <a href="/" style={{ fontSize: "13px" }}>
                      Groups
                    </a>
                  </div>
                  <div>
                    <a href="/" style={{ fontSize: "13px" }}>
                      Events
                    </a>
                  </div>
                  <div>
                    <a href="/" style={{ fontSize: "13px" }}>
                      Followed Hashtags
                    </a>
                  </div>
                </Col>
              </Row>
            </Card.Text>
          </Card.Body>

          <Card.Body className="discover">
            <div>
              <h6 style={{ textAlign: "center" }}>Discover more</h6>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }
}
export default LeftSide;
