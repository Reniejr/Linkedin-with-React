import React, { PureComponent } from "react";
import "./Messaging_Styles/MsgSide.scss";

export default class MsgSide extends PureComponent {
  state = {
    username: null,
    allUsers: [],
    notifications: [],
    curentChat: {},
    total: 0,
  };

  setChat = (e) => {
    this.props.setChat(e);
  };

  filterChats = (e) => {
    if (e.keyCode === 13 || e.keyCode === "Enter") {
      let allUsers = this.props.allUsers;
      allUsers = allUsers.filter((user) =>
        user.username.includes(this.state.username)
      );
      this.setState({ allUsers: allUsers });
    } else {
      let username = e.currentTarget.value;
      this.setState({ username: username });
      let allUsers = this.props.allUsers;
      if (username === "") {
        allUsers = this.props.allUsers;
      } else {
        allUsers = allUsers.filter((user) =>
          user.username.toLowerCase().includes(this.state.username)
        );
      }
      this.setState({ allUsers: allUsers });
    }
  };

  componentDidMount = () => {
    setTimeout(() => {
      let allUsers = this.props.allUsers,
        notifications = this.props.notifications,
        currentChat = this.props.currentChat;
      let total = notifications.reduce(
        (acc, notification) => acc + notification.txt,
        0
      );
      this.setState({
        allUsers: allUsers,
        notifications: notifications,
        currentChat: currentChat,
        total: total,
      });
      // console.log(total);
      this.props.totalNot(total);
    }, 200);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.notifications !== this.props.notifications) {
      let notifications = this.props.notifications;
      let total = notifications.reduce(
        (acc, notification) => acc + notification.txt,
        0
      );
      // console.log(total);
      this.setState({ notifications: notifications, total: total });
      this.props.totalNot(total);
    }
    if (prevProps.curentChat !== this.props.curentChat) {
      let currentChat = this.props.currentChat;
      this.setState({ currentChat: currentChat });
    }
  }

  render() {
    let { allUsers, setChat, randomColor, notifications } = this.props;
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
          <input
            type="text"
            placeholder="Search Messages"
            onChange={this.filterChats}
            onKeyDown={this.filterChats}
          />
          <div className="msg-container">
            {this.state.allUsers.length === 0 ? (
              <div>
                <p>No messages...yet!</p>
                <p>
                  Reach out and start a conversation. <br /> Great things might
                  happen
                </p>
              </div>
            ) : (
              <ul className="listUsers">
                {this.state.allUsers.map((user, index) => {
                  return (
                    <li
                      key={user._id}
                      style={{
                        borderColor: `${randomColor[index]}`,
                        // backgroundColor: `${randomColor[index]}`,
                      }}
                    >
                      <img src={user.image} alt="" />
                      <input
                        type="button"
                        // style={{
                        //   color: `${randomColor[index]}`,
                        // }}
                        value={user.username}
                        onClick={(e) => this.setChat(e)}
                      />
                      {this.state.notifications[index].txt === 0 ? (
                        <></>
                      ) : (
                        <div className="badge-not">
                          <p>{this.state.notifications[index].txt}</p>
                        </div>
                      )}
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
