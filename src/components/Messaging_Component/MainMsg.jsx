import React, { PureComponent } from "react";
import "./Messaging_Styles/MainMsg.scss";

export default class MainMsg extends PureComponent {
  render() {
    return (
      <div id="main-msg">
        <header>New Message</header>
        <input type="text" placeholder="Type a name or multiple names..." />
        <div className="msg-dialog">
          {this.props.chat.map((msg) => {
            return (
              <p>
                {msg.username} {msg.message}
              </p>
            );
          })}
        </div>
        <div className="msg-sender">
          <input
            type="text"
            placeholder="Write here your text..."
            onChange={this.props.typeFunc}
            onKeyDown={this.props.typeFunc}
          />
          <button>
            <i className="fas fa-chevron-up"></i>
          </button>
        </div>
        <div className="media-uploads">
          <div className="media-icons">
            <i className="fas fa-image"></i>
            <i className="fas fa-paperclip"></i>
            <span>GIF</span>
            <i className="far fa-smile"></i>
            <i className="fas fa-video"></i>
          </div>
          <div className="msg-options">
            <button>Send</button>
            <i className="fas fa-ellipsis-h"></i>
          </div>
        </div>
      </div>
    );
  }
}
