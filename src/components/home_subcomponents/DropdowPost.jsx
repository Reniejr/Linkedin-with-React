import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import LinkIcon from "@material-ui/icons/Link";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import FlagIcon from "@material-ui/icons/Flag";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ImageIcon from "@material-ui/icons/Image";
import DeleteIcon from "@material-ui/icons/Delete";
import "../css/DropdownPost.css";
import EditPost from "./EditPost";

import DeletePostModal from "./DeletePostModal";
import PostImage from "./PostImage";
class DropdownPost extends Component {
  state = { modalShow: false, deleteModalShow: false, showEdit: false };

  showEditModal = () => {
    this.setState({ showEdit: !this.state.showEdit });
  };

  render() {
    const { toggleModal, post, userId, editButton, getPosts } = this.props;
    const currentUserId = JSON.parse(window.localStorage.getItem("userId"));
    return (
      <div>
        <EditPost
          show={this.state.showEdit}
          toggle={() => this.showEditModal()}
          postId={this.props.post._id}
          getPosts={getPosts}
          increasePostSize={this.props.increasePostSize}
        />
        <PostImage
          post={this.props.post}
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
        />
        <DeletePostModal
          post={this.props.post}
          show={this.state.deleteModalShow}
          onHide={() => this.setState({ deleteModalShow: false })}
        />
        <Dropdown className="dropdown-btn">
          <Dropdown.Toggle variant={"trasparent-grey-post"}>
            <MoreHorizIcon
              style={{ marginLeft: "-50%", marginBottom: "10%" }}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-post">
            {userId === post.user._id && (
              <Dropdown.Item onClick={() => this.showEditModal()}>
                <TurnedInNotIcon /> <strong>Edit</strong>
                <p className="text-muted">Save for later</p>
              </Dropdown.Item>
            )}

            <Dropdown.Item>
              <LinkIcon /> <strong>Copy link to post</strong>{" "}
            </Dropdown.Item>
            <Dropdown.Item>
              <HighlightOffIcon /> <strong>Unfollow Person Name</strong>
              <p className="text-muted">
                Stay connected but stop seing posts from Name Person in feed
              </p>
            </Dropdown.Item>
            <Dropdown.Item>
              <VisibilityOffIcon /> <strong>Hide this post</strong>
              <p className="text-muted">
                I don't want to see this post in my feed
              </p>{" "}
            </Dropdown.Item>
            <Dropdown.Item>
              <FlagIcon /> <strong>Report this post</strong>{" "}
              <p className="text-muted">
                This post is offensive or the account is hacked
              </p>
            </Dropdown.Item>
            <Dropdown.Item>
              <VisibilityIcon /> <strong>Who can see this post?</strong>
              <p className="text-muted">
                Visible to anyone on or off Linkedln
              </p>{" "}
            </Dropdown.Item>

            <Dropdown.Item
              className={currentUserId === post.user._id ? "d-block" : "d-none"}
              onClick={() => {
                this.setState({ deleteModalShow: true });
              }}
            >
              <DeleteIcon /> <strong>Delete this post</strong>
              <p className="text-muted">
                You can't go back.Be sure to delete
              </p>{" "}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}
export default DropdownPost;
