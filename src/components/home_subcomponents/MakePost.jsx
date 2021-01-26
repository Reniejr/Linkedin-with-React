import React, { PureComponent } from "react";
import "../css/MakePost.scss";
import ModalPost from "./ModalPost";

export default class MakePost extends PureComponent {
  render() {
    return (
      <div id="create-post">
        <ModalPost
          addImageModalShow={this.props.addImageModalShow}
          onHide={this.props.onHide}
          showImageModal={this.props.showImageModal}
          isImageLoading={this.props.isImageLoading}
          saveImage={this.props.saveImage}
          show={this.props.show}
          showFunction={this.props.showFunction}
          fillFunction={this.props.fillFunction}
          postFunction={this.props.postFunction}
          showPost={this.props.showPost}
          clickable={this.props.clickable}
        ></ModalPost>
        <div className="start-post">
          <button onClick={this.props.onClick}>
            <ion-icon name="create-outline"></ion-icon>
            <p>Start a Post</p>
          </button>
        </div>
        <div className="upload-media">
          <button>
            <i className="fas fa-image"></i>
            <p>Photo</p>
          </button>
          <button>
            <i className="fab fa-youtube"></i>
            <p>Video</p>
          </button>
          <button>
            <i className="far fa-calendar-alt"></i>
            <p>Events</p>
          </button>
          <button>
            <i className="far fa-newspaper"></i>
            <p>Write Article</p>
          </button>
        </div>
      </div>
    );
  }
}
