import React, { PureComponent } from "react";
import "../css/ModalPost.scss";
import { Modal, Button, Form } from "react-bootstrap";
import { getPost, editPost } from "./Utilities";
import "./STYLE/EditPost.scss";

export default class EditPost extends PureComponent {
  state = {
    user: {},
    post: null,
    formData: null,
  };

  setPost = async (id) => {
    let post = await getPost(id);
    this.setState({ post });
    // console.log(post);
  };

  postBody = (e) => {
    let body = {
      text: "",
      image: this.state.post.image,
    };
    body.text = e.currentTarget.value;
    this.setState({ post: body });
  };

  editConfirm = async () => {
    let id = this.props.postId;
    await editPost(id, this.state.post);
    // await this.props.getPosts();
    this.props.increasePostSize();
    this.props.toggle();
  };

  componentDidMount() {
    let id = this.props.postId;
    this.setPost(id);
  }

  render() {
    let { show, toggle, post } = this.props;
    return (
      <Modal.Dialog style={{ marginTop: show ? "" : "-200vh" }}>
        <Modal.Header>
          <Modal.Title>Edit Your Post</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <textarea
            name=""
            id=""
            cols="30"
            rows="5"
            value={this.state.post ? this.state.post.text : ""}
            onChange={this.postBody}
          ></textarea>
          <Form>
            <Form.Group>
              <Form.File
                id="picture"
                // id="edit-image"
                label={
                  <img
                    onClick={() => this.saveImage()}
                    src={this.state.post ? this.state.post.image : ""}
                    alt=""
                  />
                }
              ></Form.File>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={toggle}>
            Close
          </Button>
          <Button variant="primary" onClick={() => this.editConfirm()}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}
