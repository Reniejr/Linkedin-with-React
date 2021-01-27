import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import WarningIcon from "@material-ui/icons/Warning";

class DeletePostModal extends React.Component {
  state = { isLoading: false, message: "" };
  deletePost = async () => {
    this.setState({ isLoading: true });
    let id = this.props.post._id;
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      if (res.ok) {
        this.setState({
          isLoading: false,
          message: "Successfuly deleted",
        });
        let deletedElement = document.getElementById(id);
        deletedElement.style.display = "none";
        return res;
      } else {
        this.setState({
          isLoading: false,
          message: "Something went wrong! Try again",
        });
        console.log("there is an error with delete");
      }
    } catch (err) {
      this.setState({
        isLoading: false,
        message: "Something went wrong! Try again",
      });
      console.log("there is an error", err);
    }
  };

  render() {
    return (
      <Modal
        {...this.props}
        className="edit-image-modal"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          {" "}
          <WarningIcon style={{ width: "2rem", marginLeft: "40%" }} />
          {!this.state.message && (
            <div>
              <h4 className="mt-3">
                Are you sure you want to delete this post?
              </h4>
              <p style={{ color: "gray" }}>
                This post will be deleted immediately. You can't undo this
                action
              </p>
            </div>
          )}
          {this.state.isLoading && (
            <Spinner
              style={{ marginLeft: "40%" }}
              animation="border"
              variant="primary"
            />
          )}
          {this.state.message && (
            <p
              className="text-center"
              style={{ color: "gray", fontWeight: "bold" }}
            >
              {this.state.message}
            </p>
          )}
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-center">
          <div
            onClick={this.props.onHide}
            className="delete-actions d-flex flex-row"
            style={{ textAlign: "left" }}
          >
            <p style={{ textAlign: "left" }}>Cancel</p>
          </div>
          <div
            className="delete-actions d-flex flex-row"
            onClick={this.deletePost}
          >
            {/* <DeleteIcon className='mb-2' style={{ width: "100px" }} /> */}
            <p style={{ textAlign: "left" }}>Delete</p>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DeletePostModal;
