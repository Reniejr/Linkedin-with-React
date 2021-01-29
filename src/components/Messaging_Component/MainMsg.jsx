import React, { PureComponent } from "react";
import "./Messaging_Styles/MainMsg.scss";

export default class MainMsg extends PureComponent {
  state = {
    chat: {
      chat: [],
      chatId: null,
      user: null,
    },
  };

  componentDidMount() {
    let chat = this.props.chat;
    this.setState({ chat: chat });
    chat.lenght > 0 ? console.log(chat.chat[0].username) : console.log("empty");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.chat.chat !== this.props.chat.chat) {
      console.log("update");
    }
    if (prevState.chat.chat !== this.state.chat.chat) {
      console.log("update");
    }
  }

  render() {
    const { chat, selectedUser, image, currentChat } = this.props;
    // console.log(this.props.chat.chat);
    return selectedUser === null ? (
      <div
        className="msg-dialog"
        style={{
          display: currentChat !== chat.user ? "none" : "block",
        }}
      ></div>
    ) : (
      <div
        className="msg-dialog"
        style={{
          display: currentChat !== chat.user ? "none" : "block",
        }}
      >
        {this.state.chat.chat.lenght > 0 ? (
          this.state.chat.chat.map((msg) => {
            console.log(msg);
            return (
              <div
                className="text"
                style={{
                  alignItems:
                    selectedUser.username === msg.username
                      ? "flex-end"
                      : "flex-start",
                }}
              >
                <p
                  style={{
                    color:
                      selectedUser.username === msg.username ? "blue" : "green",
                  }}
                >
                  {selectedUser.username !== msg.username ? (
                    <img src={image} alt="" />
                  ) : (
                    <></>
                  )}
                  {msg.username}
                </p>
                <span
                  style={{
                    backgroundColor:
                      selectedUser.username === msg.username ? "blue" : "lime",
                  }}
                >
                  {msg.message}
                </span>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    );
  }
}
