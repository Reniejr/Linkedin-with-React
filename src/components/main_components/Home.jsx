import React from "react";
import "../../App.css";
import "./STYLE/Home.scss";

import { Container, Row, Col, Spinner } from "react-bootstrap";

import Posts from "../home_subcomponents/Posts";
import MakePost from "../home_subcomponents/MakePost";
import LeftSide from "../sideComponents/LeftSide";
import RightSide from "../sideComponents/RightSide";
import { withAuth0 } from "@auth0/auth0-react";
import EditPost from "../home_subcomponents/EditPost";

class Home extends React.Component {
  // fetch posts here
  // pass fetch func to down make post
  state = {
    showModal: true,
    post: { text: "" },
    showPost: true,
    postSize: 0,

    formData: null,
    addImageModalShow: false,
    userId: null,
    postList: [],
    isLoading: true,
  };

  getPosts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts`);

      if (response.ok) {
        const posts = await response.json();
        // console.log("posts", posts);
        this.setState({
          postList: posts.reverse().slice(0, 50),
          isLoading: false,
        });
      }
    } catch (err) {
      this.setState({ isLoading: false });
      console.log(err);
    }
  };

  saveImage = () => {
    const inputFile = document.querySelector("#post-image-upload-file");

    let formData = new FormData();
    formData.append("post", inputFile.files[0]);

    this.setState({ formData }, () => {
      this.setState({ addImageModalShow: false });
    });
  };

  uploadImage = async (postId) => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/posts/${postId}/picture`,
        {
          method: "POST",
          body: this.state.formData,
          headers: new Headers({
            // "Content-Type": "multipart/form-data",
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
      }
    } catch (e) {
      console.log(e);
    }
  };

  fetchPost = async () => {
    // const { user } = this.props.auth0;
    // console.log(this.props.auth0);
    // let currentId = user.sub.slice(6);
    if (this.state.userId) {
      let newPost = { ...this.state.post, user: this.state.userId };
      let response = await fetch(
        process.env.REACT_APP_BASE_URL + `/posts/${this.state.userId}`,
        {
          method: "POST",
          body: JSON.stringify(newPost),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }
      );
      let result = await response.json();

      let imageUpload = await this.uploadImage(result._id);
    }
  };

  postConfirm = async () => {
    await this.fetchPost();

    setTimeout(() => {
      this.showModal();
      this.setState({ postSize: this.state.postSize + 1, isLoading: true });
    }, 100);
    setTimeout(async () => {
      await this.getPosts();
    }, 1000);
  };

  showModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  fillUp = (e) => {
    let text = "";
    text = e.currentTarget.value;
    if (text.length > 0) {
      this.setState({ showPost: false });
    } else {
      this.setState({ showPost: true });
    }
    this.setState({ post: { text: text } });
  };

  componentDidMount() {
    if (this.props.auth0) {
      const { user } = this.props.auth0;
      let currentId = user.sub.slice(6);
      this.setState({ userId: currentId });
    }

    this.getPosts();
  }

  render() {
    let showModal = this.state.showModal ? "-200vh" : "";
    let showPost = this.state.showPost ? "grey" : "#0078b9";
    let canClick = this.state.showPost ? "none" : "all";
    return (
      <div id="home-page">
        <Container>
          <Row>
            <div className="left-side">
              {this.state.userId ? (
                <LeftSide userId={this.state.userId} />
              ) : (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              )}
            </div>
            <div className="main-feed">
              <MakePost
                addImageModalShow={this.state.addImageModalShow}
                onHide={() => this.setState({ addImageModalShow: false })}
                showImageModal={() =>
                  this.setState({ addImageModalShow: true })
                }
                saveImage={this.saveImage}
                show={showModal}
                showFunction={this.showModal}
                fillFunction={this.fillUp}
                postFunction={this.postConfirm}
                showPost={showPost}
                clickable={canClick}
                onClick={this.showModal}
              />
              <Posts
                showDelete={this.state}
                postSize={this.state.postSize}
                posts={this.state.postList}
                isLoading={this.state.isLoading}
                getPosts={this.getPosts}
              />
              {/* <EditPost /> */}
            </div>
            <div className="right-side">
              <RightSide />
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withAuth0(Home);
