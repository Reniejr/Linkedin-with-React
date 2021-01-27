import React, { PureComponent } from "react";
import "./Messaging_Styles/MsgSide.scss";

export default class MsgSide extends PureComponent {
  setChat = (e) => {
    this.props.setChat(e);
  };

  render() {
    let { allUsers, setChat } = this.props;
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
            {allUsers.length === 0 ? (
              <div>
                <p>No messages...yet!</p>
                <p>
                  Reach out and start a conversation. <br /> Great things might
                  happen
                </p>
              </div>
            ) : (
              <ul className="listUsers">
                {allUsers.map((user) => {
                  const randomColor = Math.floor(
                    Math.random() * 16777215
                  ).toString(16);
                  return (
                    <li
                      key={user._id}
                      style={{
                        borderColor: `#${randomColor}`,
                        color: `#${randomColor}`,
                      }}
                    >
                      <input
                        type="button"
                        value={user.username}
                        onClick={(e) => this.setChat(e)}
                      />
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <button>Start a new message</button>
        </div>
      </div>
    );
  }
}
