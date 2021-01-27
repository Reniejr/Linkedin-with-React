import React, { PureComponent } from "react";
import "./Messaging_Styles/MsgSide.scss";

export default class MsgSide extends PureComponent {
  render() {
    return (
      <div id="msg-side">
        <header>
          <p>Messaging</p>
          <div className="icons-msg">
            <ion-icon name="create-outline"></ion-icon>
            <ion-icon name="ellipsis-horizontal"></ion-icon>
          </div>
        </header>
        <div className="msg-side-body">
          <input type="text" placeholder="Search Messages" />
          <div className="msg-container">
            <p>No messages...yet!</p>
            <p>
              Reach out and start a conversation. <br /> Great things might
              happen
            </p>
          </div>
          <button>Start a new message</button>
        </div>
      </div>
    );
  }
}
