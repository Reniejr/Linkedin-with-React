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
    return channels;
  };

  setUser = async () => {
    const { user } = this.props.auth0;
    let currentId = user.sub.slice(6);
    const getUserInfo = await getUser(`${currentId}`);
    this.setState({ username: getUserInfo.username });
    // console.log(getUserInfo.username);
  };

  setAllUsers = async () => {
    const allUsers = await getAllProfiles(this.state.username);
    this.setState({ allUsers });
    let allChats = [];
    let currentIndex = allUsers.findIndex(
      (user) => user.username === this.state.username
    );
    let listUsers = allUsers.filter(
      (user) => user.username !== this.state.username
    );
    console.log(listUsers);
    this.setState({ listUsers: listUsers });
    allUsers.map((user, index) => {
      let chatBox = {
        chatId: index + currentIndex,
        user: user.username,
        chat: [],
      };
      allChats.push(chatBox);
    });
    this.setState({ chats: allChats });
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
  };

  componentDidMount = async () => {
    await this.setUser();
    await this.setAllUsers();
    const pusher = await this.pusherSetup(this.state.allUsers);
    this.setState({ pusherConfig: pusher });
  };

  typeText = (e) => {
    if (e.keyCode === 13) {
      const channel = this.state.pusherConfig.filter(
        (channel) => channel.name === this.state.index.toString()
      )[0];
      channel.bind("message", (data) => {
        this.setState({
          currentChat: {
            ...this.state.currentChat,
            chat: [...this.state.currentChat.chat, ...data],
          },
        });
      });
      this.typeText = this.typeText.bind(this);
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
      axios.post(`${process.env.REACT_APP_BASE_URL}/chat`, array);
      e.currentTarget.value = " ";
      let temp = this.state.modify + 1;
      this.setState({
        modify: temp,
      });
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
          <MsgSide allUsers={this.state.listUsers} setChat={this.setChat} />
          <div id="main-msg">
            <header>New Message</header>
            <input
              type="text"
              placeholder="Type a name or multiple names..."
              value={
                this.state.currentChat
                  ? this.state.currentChat.user
                  : "Type a name or multiple names..."
              }
            />
            <div className="msg-dialog">
              {this.state.currentChat && this.state.currentChat.chat ? (
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
