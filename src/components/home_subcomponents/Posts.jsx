import React, { Component } from "react";
import "../css/Post.css";
import PostContent from "./PostContent";
import { Spinner } from "react-bootstrap";
import { getReactionsByPostId } from "../../apis/reaction/api";
class Posts extends Component {
  state = { posts: [], isLoading: true, reacts: [], postWithReacts: [] };

  getPosts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts`);

      if (response.ok) {
        const posts = await response.json();
        console.log("posts", posts);
        posts.forEach((post) => {
          this.getReactions(post._id);
        });
        this.setState({
          posts: posts.reverse().slice(0, 50),
          isLoading: false,
        });
      }
    } catch (err) {
      this.setState({ isLoading: false });
      console.log(err);
    }
  };

  getReactions = async (postId) => {
    let reactions = await getReactionsByPostId(postId);
    let reacts = this.state.reacts;
    reacts.push(reactions);
    let post = this.state.posts.find((post) => post._id === postId);
    let postWithReacts = this.state.postWithReacts;
    let newPost = { ...post, reactions: reactions };
    postWithReacts.push(newPost);
    this.setState({ reacts });
  };

  componentDidMount() {
    if (this.props.posts.length > 0) {
      if (this.props.posts[0].hasOwnProperty("reactions")) {
        this.setState({ postWithReacts: this.props.posts });
        console.log("WORK PLEASE");
      }
    }
    this.setState({ postWithReacts: this.props.posts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.postSize !== this.props.postSize) {
      this.props.getPosts();
      console.log("State changed");
      this.setState({ postWithReacts: this.props.posts });
    }
    if (prevState.postWithReacts.length !== this.state.postWithReacts.length) {
      if (this.state.postWithReacts > 0) {
        if (
          this.state.postWithReacts[0].hasOwnProperty("reactions") !==
          prevState.postWithReacts[0].hasOwnProperty("reactions")
        ) {
          this.setState({ postWithReacts: this.props.posts });
        }
      }

      this.setState({ postWithReacts: this.props.posts });
    }
    if (
      this.props.posts.length !== prevProps.posts.length ||
      prevProps.postSize !== this.props.postSize
    ) {
      this.setState({ postWithReacts: this.props.posts }, () =>
        console.log(this.props.posts)
      );
    }
  }

  // componentDidUpdate(prevProps, prevState){
  // 	if(prevState.posts !== this.state.posts){
  // 		this.getPosts()
  // 		console.log('update')
  // 	}
  // }

  render() {
    const { posts, isLoading, getPosts } = this.props;
    return (
      <div>
        {isLoading && (
          <Spinner
            className="main-page-spinner"
            animation="border"
            variant="primary"
          />
        )}
        {this.state.postWithReacts.length > 0 && (
          <>
            {this.state.postWithReacts.map((post) => {
              return (
                <PostContent
                  increasePostSize={this.props.increasePostSize}
                  id={post._id}
                  key={post._id}
                  post={post}
                  getPosts={getPosts}
                />
              );
            })}
          </>
        )}
      </div>
    );
  }
}

export default Posts;
