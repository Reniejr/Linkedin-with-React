import React from "react";
import { ListGroup, Badge, Button, Row, Col, Dropdown } from "react-bootstrap";
import { Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import CommentDropDown from "./CommentDropDown";

const { REACT_APP_BASE_URL } = process.env;

class CommentList extends React.Component {
  state = {
    comments: [],

    //*:::::::::::::::
    ourComments: [],
    dropdown: false,
    isLoading: true,

    deletedSize: 0,
    errorMessage: false,
  };

  showDropdown = idComment => {
    if (idComment === this.state.ourComments[0]) {
      //this set the dropdown truw or false
      this.setState({ dropdown: !this.state.dropdown });
    } else {
      this.setState({ dropdown: this.state.dropdown });
    }
  };

  //!BAD API THIS IS EVIL!!!!!!!!!!::::::::::::::::::::::::::::::::::::::::::::::::::::
  //   getComments = async () => {
  //     try {
  //       let response = await fetch(
  //         "https://striveschool-api.herokuapp.com/api/comments/" +
  //           this.props.postId,
  //         {
  //           headers: new Headers({
  //             Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
  //           }),
  //         }
  //       );

  //       if (response.ok) {
  //         let comments = await response.json();

  //         this.setState({ comments, isLoading: false });
  //       } else {
  //         this.setState({ isLoading: false, errorMessage: true });
  //       }
  //     } catch (e) {
  //       this.setState({ isLoading: false, errorMessage: true });
  //     }
  //   };

  //!::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  //*GOOD API, GOOD BOY :)::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //*GET
  getCommentsFromOurApi = async () => {
    try {
      let response = await fetch(
        ` ${REACT_APP_BASE_URL}/comments/` + this.props.postId
      );

      if (response.ok) {
        let comments = await response.json();
        // console.log(comments);
        this.setState({ ourComments: comments, isLoading: false });
      } else {
        this.setState({ isLoading: false, errorMessage: true });
      }
    } catch (e) {
      this.setState({ isLoading: false, errorMessage: true });
    }
  };

  //*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //*DELETE
  commentDelete = async e => {
    let id = e.currentTarget.id;
    try {
      let response = await fetch(`${REACT_APP_BASE_URL}/${id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-type": "application/json",
        }),
      });

      if (response.ok) {
        let filteredComments = this.state.ourComments.filter(
          comment => comment._id !== id
        );
        this.setState({
          ourComments: filteredComments,
          isloading: false,
          deletedSize: this.state.deletedSize + 1,
        });
        alert("The comment has been succesfully deleted!");
      } else {
        alert("something went wrong, the comment has not be canceled 😢");
      }
    } catch (err) {
      console.log(err);
      this.setState({ isLoading: false, errorMessage: true });
    }
  };
  //*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  componentWillUnmount() {
    this.getCommentsFromOurApi();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.submittedSize !== this.props.submittedSize) {
      this.getCommentsFromOurApi();
      // this.setState({ update: !this.state.update });
    }
    if (prevProps.fetchComment !== this.props.fetchComment) {
      this.getCommentsFromOurApi();
    }
  }

  render() {
    // console.log(this.props.postId);
    let body;
    let { user } = this.state;
    if (!this.state.isLoading && this.state.ourComments.length !== 0) {
      body = (
        <div className="mb-5">
          {this.state.ourComments.map((comment, index) => {
            const idComment = comment._id;

            return (
              <div className="d-flex flex-row">
                {/* <Link to={`/profile/${this.props.userId}`}> */}
                <img
                  className="comment-user-avatar mt-1 user-comment-icon text-left"
                  src={comment.user.image}
                  alt="comment-user-avatar"
                />
                {/* </Link> */}
                <ListGroup
                  key={index}
                  className="comment-item d-flex justify-content-between mb-3"
                >
                  <ListGroup.Item className="text-dark border-0 d-flex flex-column text-left">
                    <Row className="d-flex d-flex-between">
                      <Col xs={10}>
                        <Link
                          className="d-inline-block"
                          to={`/profile/${this.props.postId}`}
                        >
                          <h8 className="comment-user-name font-weight-bold">
                            {comment.user.name}
                          </h8>
                        </Link>
                      </Col>

                      <Col className={this}>
                        <div onClick={() => this.showDropdown(idComment)}>
                          <HiOutlineDotsHorizontal
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </Col>
                    </Row>

                    <p
                      style={{ textAlign: "left" }}
                      className="float-left font-weight-light"
                    >
                      {comment.text}
                    </p>
                  </ListGroup.Item>
                  {
                    <CommentDropDown
                      style={{
                        width: "100px",
                      }}
                      className=" drop-comment-container d-flex align-items-end p-0  rounded-lg "
                      show={e => this.showDropdown(e)} //mettere anche index
                      drop={this.state.dropdown}
                      thisComment={comment._id}
                      deletehandler={this.props.deletehandler}
                    />
                  }
                </ListGroup>
              </div>
            );
          })}
        </div>
      );
    } else if (
      this.state.ourComments.length === 0 &&
      !this.state.isLoading &&
      !this.state.errorMessage
    ) {
      body = (
        <div className="d-flex justify-content-center align-items-center mt-3"></div>
      );
    } else if (this.state.errorMessage) {
      body = (
        <div className="d-flex justify-content-center align-items-center mt-3">
          <Alert variant="danger">&#9762; Something went wrong!</Alert>
        </div>
      );
    } else {
      body = (
        <Spinner
          className="comment-spinner"
          animation="grow"
          variant="primary"
        />
      );
    }
    return body;
  }
}

export default CommentList;
