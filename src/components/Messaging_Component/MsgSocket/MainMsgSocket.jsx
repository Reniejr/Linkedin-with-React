import React from "react";

export default function MainMsgSocket({ listMsg }) {
  return (
    <div id="main-msg">
      <header>New Message</header>
      <div className="currentChat"></div>
      <div className="msg-dialog">
        {listMsg.map((msg) => {
          return (
            <p>
              {msg.user}
              {msg.message}
            </p>
          );
        })}
      </div>

      <div className="msg-sender">
        <input type="text" placeholder="Write here your text..." />
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
