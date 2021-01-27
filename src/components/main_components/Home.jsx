import React from "react";
import "../../App.css";

import { Container, Row, Col } from "react-bootstrap";

import Posts from "../home_subcomponents/Posts";
import MakePost from "../home_subcomponents/MakePost";
import LeftSide from "../sideComponents/LeftSide";
import RightSide from "../sideComponents/RightSide";
import { withAuth0 } from "@auth0/auth0-react";

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

    postList: [],
    isLoading: true,
  };

  getPosts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts`);

      if (response.ok) {
        const posts = await response.json();
        console.log("posts", posts);
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
    const { user } = this.props.auth0;
    let currentId = user.sub.slice(6);
    let newPost = { ...this.state.post, user: currentId };
    let response = await fetch(
      process.env.REACT_APP_BASE_URL + `/posts/${currentId}`,
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
            <Col xs={3}>
              <LeftSide />
            </Col>
            <Col xs={6}>
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
              />
            </Col>
            <Col xs={3}>
              <RightSide />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withAuth0(Home);
