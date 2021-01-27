import React, { PureComponent } from "react";
import MainMsg from "./MainMsg";
import "./Messaging_Styles/MsgPage.scss";
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
    console.log(getUserInfo.username);
  };

  setAllUsers = async () => {
    const allUsers = await getAllProfiles(this.state.username);
    this.setState({ allUsers });
    let allChats = [];
    allUsers.map((user, index) => {
      let chatBox = {
        chatId: index,
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

    const pusher = this.pusherSetup(this.state.allUsers);
    const channel = pusher.filter(
      (channel) => channel.name === index.toString()
    )[0];
    channel.bind("message", (data) => {
      // Original
      this.setState({ chats: [...this.state.chats, data] });
    });
    this.typeText = this.typeText.bind(this);
    console.log(index);
  };

  componentDidMount = async () => {
    await this.setUser();
    await this.setAllUsers();
  };

  typeText = async (e) => {
    if (e.keyCode === 13) {
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
    } else {
      let text = e.currentTarget.value;
      this.setState({ text: text });
    }
  };

  render() {
    return (
      <div id="msg-page">
        <div className="main-body">
          <MsgSide allUsers={this.state.allUsers} setChat={this.setChat} />
          <MainMsg
            typeFunc={this.typeText}
            chat={this.state.chats}
            currentUser={this.state.username}
            currentChat={
              this.state.chats.filter(
                (chat) => chat.user === this.state.chatSelected
              )[0]
            }
          />
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
