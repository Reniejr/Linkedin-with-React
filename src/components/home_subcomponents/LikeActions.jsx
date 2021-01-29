import { Height } from "@material-ui/icons";
import React from "react";
import { deleteReact, postReaction } from "../../apis/reaction/api";
import one from "../../assets/like-btns/1-like.png";
import two from "../../assets/like-btns/2-celebrate.png";
import three from "../../assets/like-btns/3-support.png";
import four from "../../assets/like-btns/4-love.png";
import five from "../../assets/like-btns/5-insightful.png";
import six from "../../assets/like-btns/6-logo.png";

class LikeActions extends React.Component {
  state = { show: false };

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

  likeOnClick = async (e) => {
    const newReact = {
      react: e.currentTarget.id,
    };
    const reaction = e.currentTarget.id;
    if (parseInt(e.currentTarget.id) === this.props.userReaction) {
      await deleteReact(this.props.userId, this.props.postId);
      await this.props.changeState(0);
    } else if (this.props.userReaction > 0) {
      //delete and then post
      await deleteReact(this.props.userId, this.props.postId);

      await postReaction(this.props.userId, this.props.postId, newReact);
      await this.props.changeState(reaction);
    } else {
      //post
      await postReaction(this.props.userId, this.props.postId, newReact);
      await this.props.changeState(reaction);
    }
  };

  render() {
    let { show } = this.props;
    return (
      <div
        style={this.style.container}
        className={show ? "like-actions-container d-flex flex-row" : "d-none"}
      >
        <div>
          <img
            style={this.style.img}
            src={one}
            alt=""
            id="1"
            onClick={(e) => this.likeOnClick(e)}
          />
        </div>

        <div>
          <img
            style={this.style.img}
            src={two}
            alt=""
            id="2"
            onClick={(e) => this.likeOnClick(e)}
          />
        </div>

        <div>
          <img
            style={this.style.img}
            src={three}
            alt=""
            id="3"
            onClick={(e) => this.likeOnClick(e)}
          />
        </div>

        <div>
          <img
            style={this.style.img}
            src={four}
            alt=""
            id="4"
            onClick={(e) => this.likeOnClick(e)}
          />
        </div>

        <div>
          <img
            style={this.style.img}
            src={five}
            alt=""
            id="5"
            onClick={(e) => this.likeOnClick(e)}
          />
        </div>

        <div>
          <img
            style={this.style.img}
            src={six}
            alt=""
            id="6"
            onClick={(e) => this.likeOnClick(e)}
          />
        </div>
      </div>
    );
  }
}

export default LikeActions;
