import React, { Component } from "react";
import "../css/Post.css";
import PostContent from "./PostContent";
import { Spinner } from "react-bootstrap";
class Posts extends Component {
  state = { posts: [], isLoading: true };

  getPosts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts`);

      if (response.ok) {
        const posts = await response.json();
        console.log("posts", posts.user);
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

  //   componentDidMount() {
  //     this.getPosts();
  //   }

  componentDidUpdate(prevProps) {
    prevProps.postSize !== this.props.postSize && this.getPosts();
  }

  // componentDidUpdate(prevProps, prevState){
  // 	if(prevState.posts !== this.state.posts){
  // 		this.getPosts()
  // 		console.log('update')
  // 	}
  // }

  render() {
    const { posts, isLoading } = this.props;
    return (
      <div>
        {isLoading && (
          <Spinner
            className="main-page-spinner"
            animation="border"
            variant="primary"
          />
        )}
        {posts.map((post) => {
          console.log(post);
          return <PostContent id={post._id} key={post._id} post={post} />;
        })}
      </div>
    );
  }
}

export default Posts;
