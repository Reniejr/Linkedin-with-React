import React, { PureComponent } from "react";
import "./Messaging_Styles/MsgPage.scss";
import "./Messaging_Styles/MainMsg.scss";
import "../css/RightSide.scss";
import MsgSide from "./MsgSide";
import footericon from "../images/footericon.png";
import Pusher from "pusher-js";
import { getUser, getAllProfiles, updateChannel } from "./Utils/index";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";

class MsgPage extends PureComponent {
  state = {
    text: "",
    username: "",
    chats: [],
    allUsers: [],
    chatSelected: "",
    index: "",
    currentChat: {
      chatId: null,
      chat: [],
    },
    pusherConfig: [],
    modify: null,
    listUsers: [],
    randomColor: [],
    selectedUser: null,
    notifications: [],
  };

  pusherSetup = (allUsers) => {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      encrypted: true,
    });
    let channels = [];
    let currentIndex = allUsers.findIndex(
      (user) => user.username === this.state.username
    );
    allUsers.map((user, index) => {
      const channel = pusher.subscribe(`${index + currentIndex}`);
      channels.push(channel);
    });
    // let channel = pusher.subscribe("chat");
    return channels;
    // return channel;
  };

  setUser = async () => {
    const { user } = this.props.auth0;
    let currentId = user.sub.slice(6);
    const getUserInfo = await getUser(`${currentId}`);
    this.setState({ username: getUserInfo.username });
    // console.log(getUserInfo.username);
  };

  setAllUsers = async () => {
    // const allUsers = await getAllProfiles(this.state.username);
    //COMMENTO
    //COMMENTO
    const allUsers = this.props.selectedUsers;
    this.setState({ allUsers });

    let allChats = [];
    let notifications = [];

    let currentIndex = allUsers.findIndex(
      (user) => user.username === this.state.username
    );

    let listUsers = allUsers.filter(
      (user) => user.username !== this.state.username
    );

    listUsers.forEach((user) => {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(
        16
      )}`;
      this.setState({ randomColor: [...this.state.randomColor, randomColor] });
    });

    console.log(listUsers);

    this.setState({ listUsers: listUsers });

    allUsers.map((user, index) => {
      let chatBox = {
        chatId: index + currentIndex,
        user: user.username,
        chat: [],
      };
      let notification = {
        id: index + currentIndex,
        txt: 0,
      };
      notifications.push(notification);
      allChats.push(chatBox);
    });

    this.setState({ chats: allChats, notifications: notifications });
  };

  setChat = (e) => {
    let chatSelected = e.currentTarget.value;
    this.setState({ chatSelected });

    let currentIndex = this.state.allUsers.findIndex(
      (user) => user.username === this.state.username
    );

    let index = this.state.chats.findIndex(
      (user) => user.user === chatSelected
    );
    index = currentIndex + index;
    this.setState({ index: index });

    let currentChat = this.state.chats.filter(
      (chat) => chat.chatId === index
    )[0];
    console.log(currentChat);
    this.setState({ currentChat: currentChat });

    let selectedUser = this.state.allUsers.filter(
      (user) => user.username === chatSelected
    )[0];
    this.setState({ selectedUser: selectedUser });

    let updateNot = [];
    this.state.notifications.map((chat, index) => {
      console.log("id", chat.id, "txts", chat.txt);
      // console.log(this.state.currentChat);
      let updatedChat = { ...chat };
      if (chat.id === this.state.currentChat.chatId) {
        updatedChat.txt = 0;
      }
      updateNot.push(updatedChat);
    });
    this.setState({ notifications: updateNot });
  };

  componentDidMount = async () => {
    await this.setUser();
    await this.setAllUsers();
    const pusher = await this.pusherSetup(this.state.allUsers);
    this.setState({ pusherConfig: pusher });
    if (pusher.length > 0) {
      const channel = await pusher.filter(
        (channel) => channel.name === this.state.index.toString()
      )[0];
      console.log(pusher);
      if (channel !== undefined) {
        await channel.bind("message", (data) => {
          console.log(data);
          this.setState({
            currentChat: {
              ...this.state.currentChat,
              chat: [...this.state.currentChat.chat, data],
            },
          });
        });
        this.typeText = this.typeText.bind(this);
      } else {
      }
    } else {
      const channel = "0";
    }
  };

  typeText = (e) => {
    if (e.keyCode === 13) {
      // const channel = this.state.pusherConfig.filter(
      //   (channel) => channel.name === this.state.index.toString()
      // )[0];
      // // const channel = this.pusherSetup();
      // channel.bind("message", (data) => {
      //   console.log(data);
      //   this.setState({
      //     currentChat: {
      //       ...this.state.currentChat,
      //       chat: [...this.state.currentChat.chat, data],
      //     },
      //   });
      // });
      // this.typeText = this.typeText.bind(this);
      const payload = {
        message: {
          username: this.state.username,
          message: this.state.text,
        },
        chat: `${this.state.index}`,
      };
      let array = updateChannel(
        this.state.chats,
        this.state.index,
        payload.message
      );
      axios.post(`${process.env.REACT_APP_BASE_URL}/chat`, payload);
      let temp = this.state.modify + 1;
      this.setState({
        modify: temp,
      });
      let updateNot = [];
      this.state.notifications.map((chat, index) => {
        console.log("id", chat.id, "txts", chat.txt);
        // console.log(this.state.currentChat);
        let updatedChat = { ...chat };
        if (chat.id === this.state.currentChat.chatId) {
          updatedChat.txt = updatedChat.txt + 1;
        }
        updateNot.push(updatedChat);
      });
      this.setState({ notifications: updateNot });
      // console.log(updateNot);
    } else {
      let text = e.currentTarget.value;
      this.setState({ text: text });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.modify !== this.state.modify) {
      // console.log("sent");
    }
  }

  render() {
    return (
      <div id="msg-page">
        <div className="main-body">
          <MsgSide
            allUsers={this.state.listUsers}
            setChat={this.setChat}
            randomColor={this.state.randomColor}
            notifications={this.state.notifications}
            currentChat={this.state.currentChat}
            totalNot={this.props.totalNot}
          />
          <div id="main-msg">
            <header>New Message</header>
            <div className="currentChat">
              {this.state.selectedUser ? (
                <>
                  <img src={this.state.selectedUser.image} alt="" />
                  <p>{this.state.selectedUser.username}</p>
                </>
              ) : (
                "Type a name or multiple names..."
              )}
            </div>
            <div className="msg-dialog">
              {this.state.currentChat ? (
                this.state.currentChat.chat.map((msg) => {
                  return (
                    <div
                      className="text"
                      style={{
                        alignItems:
                          this.state.username === msg.username
                            ? "flex-end"
                            : "flex-start",
                      }}
                    >
                      <p
                        style={{
                          color:
                            this.state.username === msg.username
                              ? "blue"
                              : "green",
                        }}
                      >
                        {this.state.username !== msg.username ? (
                          <img src={this.state.selectedUser.image} alt="" />
                        ) : (
                          <></>
                        )}
                        {msg.username}
                      </p>
                      <span
                        style={{
                          backgroundColor:
                            this.state.username === msg.username
                              ? "blue"
                              : "lime",
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
            <div className="msg-sender">
              <input
                type="text"
                placeholder="Write here your text..."
                onChange={this.typeText}
                onKeyDown={this.typeText}
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
        </div>
        <div id="footer-right" style={{ position: "sticky", top: "60px" }}>
          <div className="links-footer-right">
            <span>About</span>
            <span>Accessibility</span>
            <span>Help Center</span>
            <span>Privacy & Terms</span>
            <span>Ad Choices</span>
            <span>Advertising</span>
            <span>Business Services</span>
            <span>Get the LinkedIn app</span>
          </div>
          <p>More</p>
          <div className="linkedin-rights">
            <span>
              <img src={footericon} alt="" />
            </span>
            <span>Linkedin Corporation © 2020</span>
          </div>
        </div>
      </div>
    );
  }
}
export default withAuth0(MsgPage);
