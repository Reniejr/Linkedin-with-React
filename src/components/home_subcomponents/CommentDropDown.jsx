import { Button, Modal } from "react-bootstrap";
import React, { PureComponent } from "react";
import { AiFillEdit } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
//STYLE
import "../css/comment-drop.css";
export default class DropDown extends PureComponent {
  state = { show: false };

  handleShow = () => {
    this.setState({ show: true });
  };
  handleClose = () => {
    this.setState({ show: false });
  };

  deleteComment = (commentId) => {
    this.props.deletehandler(commentId);
  };

  render() {
    let { dropdownList, thisComment, deletehandler } = this.props;
    return (
      <>
        {/* <Modal
          style={{
            position: "absolute",
            transform: "translate(-30%,-30%)",
            width: "",
            height: "50%",
            overflow: "hidden",
          }}
          show={this.state.show}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal> */}

        <div
          className="drop-comment-container"
          // style={{ display: this.props.show ? "block" : "none" }}
          style={{
            display: dropdownList.includes(thisComment) ? "block" : "none",
          }}
        >
          <div
            id={this.props.thisComment}
            className="comment-button"
            onClick={this.handleShow}
          >
            <div>
              <AiFillEdit className="align-self-center" />
              <span className="pl-2 py-1 ">Edit</span>
            </div>
          </div>

          <div
            className="comment-button"
            onClick={
              (this.props.onChangeElement, console.log(this.props.thisComment))
            }
          >
            <div onClick={() => this.deleteComment(thisComment)}>
              <TiDelete className="align-self-center" />
              <span className="pl-1 bottom-1 ">Delete</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}
