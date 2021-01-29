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
import { getReactionsByPostId } from "../../apis/reaction/api";

class Home extends React.Component {
  // fetch posts here
  // pass fetch func to down make post
  state = {
    showModal: true,
    post: { text: "" },
    showPost: true,
    postSize: 0,
    postsWithReact: [],
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
        posts.forEach((post) => {
          this.getReactions(post._id);
        });
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

  increasePostSize = () => {
    const temp = this.state.postSize + 1;
    this.setState({ postSize: temp });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevState.postList.length > 0) {
      if (
        prevState.postList[0].hasOwnProperty("reactions") !==
        this.state.postList[0].hasOwnProperty("reactions")
      ) {
        console.log("test");
        this.setState({ postList: this.state.postList });
      }
    }
    if (prevState.postList.length !== this.state.postList.length) {
      await this.getPosts();
    }
    if (this.state.postSize !== prevState.postSize) {
      console.log("STATE CHANGED");
      await this.getPosts();
      this.setState({ postList: this.state.postList });
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
      if (response.ok) {
        let result = await response.json();

        let imageUpload = await this.uploadImage(result._id);
      }
    }
  };

  postConfirm = async () => {
    await this.fetchPost();

    setTimeout(() => {
      this.showModal();
      const temp = this.state.postSize + 1;
      this.setState({ postSize: temp, isLoading: true });
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
    if (this.state.postList.length > 0) {
      if (this.state.postList[0].hasOwnProperty("reactions")) {
        console.log(this.state.postList[0].hasOwnProperty("reactions"));
      }
    }
    this.getPosts();
  }

  getReactions = async (postId) => {
    let reactions = await getReactionsByPostId(postId);
    let post = this.state.postList.find((post) => post._id === postId);
    let postIndex = this.state.postList.findIndex(
      (post) => post._id === postId
    );

    let newPost = { ...post, reactions };
    this.state.postList[postIndex] = newPost;
    this.setState({ postWithReacts: this.state.postList });
  };

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
              {this.state.postList.length > 0 && (
                <Posts
                  increasePostSize={this.increasePostSize}
                  showDelete={this.state}
                  postSize={this.state.postSize}
                  posts={this.state.postList}
                  isLoading={this.state.isLoading}
                  getPosts={this.getPosts}
                />
              )}

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
