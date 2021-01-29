import React from "react";
import LikeActions from "./LikeActions";
import { withAuth0 } from "@auth0/auth0-react";
import { getReactionsByPostId } from "../../apis/reaction/api";
import one from "../../assets/like-btns/1-like.png";
import two from "../../assets/like-btns/2-celebrate.png";
import three from "../../assets/like-btns/3-support.png";
import four from "../../assets/like-btns/4-love.png";
import five from "../../assets/like-btns/5-insightful.png";
import six from "../../assets/like-btns/6-logo.png";
import "./STYLE/ActionButtons.scss";
class ActionButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLike: false,
      userId: null,
      liked: false,
      reacts: [],
      userReaction: 0,
      newReacts: null,
      counter: 0,
    };
  }
  // 	state = {
  //     showLike: false,
  //     userId: null,
  //     liked: false,
  //     reacts: [],
  //     userReaction: 0,
  //   };
  style = {
    img: {
      width: "2rem",
      height: "2rem",
      marginLeft: "1rem",
    },
    container: {
      backgroundColor: "white",
      borderRadius: "4rem",
      paddingTop: "1rem",
      paddingLeft: "1rem",
      paddingRight: "1rem",
      paddingBottom: "1rem",
      borderBottomColor: "rgba(0, 0, 0, 0.9)",
      boxShadow: "2px 2px #888888",
      position: "absolute",
      bottom: "4rem",
    },
  };
  async componentDidMount() {
    if (this.props.auth0) {
      const { user } = this.props.auth0;
      let currentId = user.sub.slice(6);
      this.setState({ userId: currentId });
    }
    if (this.props.reacts !== null && this.props.reacts !== undefined) {
      this.setState({ reacts: this.props.reacts.reactions });
      this.isUserReact();
    }
    const reactions = await this.getReactions(this.props.postId);

    if (reactions) {
      this.setState({ newReacts: reactions });
      let counter = this.state.counter + 1;
      this.setState({ counter });
    }

    if (this.state.userReaction > 0) {
      this.setState({ liked: true });
    }
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if (this.state.reacts.length !== prevState.reacts.length) {
      if (this.props.reacts !== null && this.props.reacts !== undefined) {
        this.setState({ reacts: this.props.reacts.reactions });
        this.isUserReact();
      }
    }
    if (this.state.counter !== prevState.counter) {
      const reactions = await this.getReactions(this.props.postId);

      if (reactions) {
        this.setState({ newReacts: reactions });
      }
    }
    if (
      this.props.reacts !== prevProps.reacts &&
      this.props.reacts !== null &&
      this.props.reacts !== undefined
    ) {
      this.setState({ reacts: this.props.reacts.reactions });
      this.isUserReact();
    }
    if (this.state.userId !== prevState.userId) {
      const { user } = this.props.auth0;
      let currentId = user.sub.slice(6);
      this.setState({ userId: currentId });
    }
  };

  getReactions = async (postId) => {
    const result = await getReactionsByPostId(postId);
    return result;
  };

  isUserReact = () => {
    let reacts = this.state.reacts;

    if (reacts.length > 0) {
      reacts.forEach((react) => {
        if (react.user._id.localeCompare(this.state.userId) === 0) {
          this.setState({ userReaction: react.react });
        }
      });
    }
  };

  changeState = async (userReaction) => {
    this.setState({ userReaction });
    const reactions = await this.getReactions(this.props.postId);

    if (reactions) {
      this.setState({ reacts: reactions.reactions, newReacts: reactions });
      this.isUserReact();
      let counter = this.state.counter + 1;
      this.setState({ counter });
    } else {
      let counter = this.state.counter + 1;
      this.setState({ counter, newReacts: null });
    }
    this.setState({ showLike: !this.state.showLike });
  };

  render() {
    return (
      <>
        <div className="icon-container d-flex flex-row mb-2">
          <div
            className="action-icons mr-3 like-button"
            onClick={() => this.setState({ showLike: !this.state.showLike })}
          >
            <div
              className="reactions"
              style={
                this.state.newReacts
                  ? { backgroundColor: "#f3f2ef" }
                  : { backgroundColor: "transparent" }
              }
            >
              {this.state.newReacts ? (
                <div className="reaction-list">
                  {this.state.newReacts && (
                    <>
                      {this.state.newReacts.reactCounts.map((react) => (
                        <>
                          <div className="new-reactions">
                            {" "}
                            {react._id === 1 ? (
                              <img src={one} alt="" id="1" />
                            ) : react._id === 2 ? (
                              <img src={two} alt="" id="1" />
                            ) : react._id === 3 ? (
                              <img src={three} alt="" id="1" />
                            ) : react._id === 4 ? (
                              <img src={four} alt="" id="1" />
                            ) : react._id === 5 ? (
                              <img src={five} alt="" id="1" />
                            ) : react._id === 6 ? (
                              <img src={six} alt="" id="1" />
                            ) : (
                              <p></p>
                            )}
                            <div className="count">{react.count}</div>
                          </div>
                        </>
                      ))}
                    </>
                  )}
                </div>
              ) : (
                <p></p>
              )}
            </div>
            {this.state.userReaction === 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-supported-dps="24x24"
                fill={this.state.userReaction > 0 && "blue"}
                class="mercado-match"
                width="24"
                height="24"
                focusable="false"
              >
                <path d="M19.46 11l-3.91-3.91a7 7 0 01-1.69-2.74l-.49-1.47A2.76 2.76 0 0010.76 1 2.75 2.75 0 008 3.74v1.12a9.19 9.19 0 00.46 2.85L8.89 9H4.12A2.12 2.12 0 002 11.12a2.16 2.16 0 00.92 1.76A2.11 2.11 0 002 14.62a2.14 2.14 0 001.28 2 2 2 0 00-.28 1 2.12 2.12 0 002 2.12v.14A2.12 2.12 0 007.12 22h7.49a8.08 8.08 0 003.58-.84l.31-.16H21V11zM19 19h-1l-.73.37a6.14 6.14 0 01-2.69.63H7.72a1 1 0 01-1-.72l-.25-.87-.85-.41A1 1 0 015 17l.17-1-.76-.74A1 1 0 014.27 14l.66-1.09-.73-1.1a.49.49 0 01.08-.7.48.48 0 01.34-.11h7.05l-1.31-3.92A7 7 0 0110 4.86V3.75a.77.77 0 01.75-.75.75.75 0 01.71.51L12 5a9 9 0 002.13 3.5l4.5 4.5H19z"></path>
              </svg>
            ) : (
              <div className="my-react">
                {this.state.userReaction === 1 ? (
                  <img src={one} alt="" id="1" />
                ) : this.state.userReaction === 2 ? (
                  <img src={two} alt="" id="1" />
                ) : this.state.userReaction === 3 ? (
                  <img src={three} alt="" id="1" />
                ) : this.state.userReaction === 4 ? (
                  <img src={four} alt="" id="1" />
                ) : this.state.userReaction === 5 ? (
                  <img src={five} alt="" id="1" />
                ) : this.state.userReaction === 6 ? (
                  <img src={six} alt="" id="1" />
                ) : (
                  <p></p>
                )}
              </div>
            )}
            <span className=" ml-1">Like</span>
          </div>
          <LikeActions
            changeState={(react) => this.changeState(react)}
            show={this.state.showLike}
            userReaction={this.state.userReaction}
            userId={this.state.userId}
            postId={this.props.postId}
          />
          <div className="action-icons mr-3" onClick={this.props.onComment}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="currentColor"
              class="mercado-match"
              width="24"
              height="24"
              focusable="false"
            >
              <path d="M7 9h10v1H7zm0 4h7v-1H7zm16-2a6.78 6.78 0 01-2.84 5.61L12 22v-4H8A7 7 0 018 4h8a7 7 0 017 7zm-2 0a5 5 0 00-5-5H8a5 5 0 000 10h6v2.28L19 15a4.79 4.79 0 002-4z"></path>
            </svg>
            <span className=" ml-1">Comment</span>
          </div>
          <div className="action-icons mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="currentColor"
              class="mercado-match"
              width="24"
              height="24"
              focusable="false"
            >
              <path d="M23 12l-4.61 7H16l4-6H8a3.92 3.92 0 00-4 3.84V17a4 4 0 00.19 1.24L5.12 21H3l-.73-2.22A6.4 6.4 0 012 16.94 6 6 0 018 11h12l-4-6h2.39z"></path>
            </svg>
            <span className=" ml-1 mt-1">Share</span>
          </div>

          <div className="action-icons">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="currentColor"
              class="mercado-match"
              width="24"
              height="24"
              focusable="false"
            >
              <path d="M21 3L0 10l7.66 4.26L16 8l-6.26 8.34L14 24l7-21z"></path>
            </svg>
            <span className=" ml-1">Send</span>
          </div>
        </div>
      </>
    );
  }
}

export default withAuth0(ActionButtons);
