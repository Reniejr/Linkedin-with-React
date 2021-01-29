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
import MainMsg from "./MainMsg";

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
    selectedUser: {},
    notifications: [],
    channel: null,
    allChannels: [],
  };

  pusherSetup = (chatId) => {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      encrypted: true,
    });
    // let channels = [];
    // let currentIndex = allUsers.findIndex(
    //   (user) => user.username === this.state.username
    // );
    // allUsers.map((user, index) => {
    //   const channel = pusher.subscribe(`${index + currentIndex}`);
    //   channels.push(channel);
    // });
    // // let channel = pusher.subscribe(`${chatId}`);
    // return channels;
    // // return channel;
    return pusher;
  };

  setUser = async () => {
    const { user } = this.props.auth0;
    let currentId = user.sub.slice(6);
    const getUserInfo = await getUser(`${currentId}`);
    this.setState({ username: getUserInfo.username });
    // console.log(getUserInfo.username);
  };

  setAllUsers = async () => {
    const allUsersList = await getAllProfiles(this.state.username);
    const allUsers = this.props.selectedUsers;
    this.setState({ allUsers });

    // console.log(allUsers);

    let allChats = [];
    let notifications = [];

    let currentIndex = allUsersList.findIndex(
      (user) => user.username === this.state.username
    );
    // console.log(currentIndex);
    //---------------------------------------------------------------
    //RANDOM COLORS
    let listUsers = allUsers.filter(
      (user) => user.username !== this.state.username
    );

    listUsers.forEach((user) => {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(
        16
      )}`;
      this.setState({ randomColor: [...this.state.randomColor, randomColor] });
    });
    //--------------------------------------------------------------
    // console.log(listUsers);

    this.setState({ listUsers: listUsers });

    allUsersList.map((user, index) => {
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
    // console.log(allChats);

    allChats.map((chatBox, index) => {
      const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
        cluster: process.env.REACT_APP_PUSHER_CLUSTER,
        encrypted: true,
      });
      let channel = pusher.subscribe(`${chatBox.chatId}`);
      let allChannels = [...this.state.allChannels, channel];
      // console.log(allChannels);
      this.setState({ allChannels: allChannels });
      channel.bind(`${chatBox.chatId}`, async (data) => {
        let array = await updateChannel(
          this.state.chats,
          this.state.currentChat.chatId,
          data
        );
        console.log(array);
        this.setState({ chats: array });
      });
    });

    this.setState({ chats: allChats, notifications: notifications });
  };

  setChat = (e) => {
    let chatSelected = e.currentTarget.value;
    this.setState({ chatSelected });

    // console.log(chatSelected);

    let currentChat = this.state.chats.filter(
      (chat) => chat.user === chatSelected
    )[0];
    let content = this.state.chats.filter(
      (chat) => chat.chatId === currentChat.chatId
    )[0].chat;
    console.log(content);
    this.setState({ currentChat: currentChat });
    console.log(currentChat);

    // // let channel = this.pusherSetup(currentChat.chatId);
    // let pusher = this.pusherSetup();
    // let channel = pusher.subscribe(`${currentChat.chatId}`);
    // // const allChannels = [...this.state.allChannels];
    // // channel = allChannels.filter(
    // //   (channel) => channel.name === currentChat.chatId.toString()
    // // )[0];
    // // console.log(allChannels, channel);
    // channel.bind(`${currentChat.chatId}`, async (data) => {
    //   let array = await updateChannel(
    //     this.state.chats,
    //     this.state.currentChat.chatId,
    //     data
    //   );
    //   console.log(array);
    //   this.setState({ chats: array });
    // });

    let selectedUser = this.state.allUsers.filter(
      (user) => user.username === chatSelected
    )[0];
    this.setState({ selectedUser: selectedUser });

    //NOTIFICATIONS--------------------------------
    let updateNot = [];
    this.state.notifications.map((chat, index) => {
      // console.log("id", chat.id, "txts", chat.txt);
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
    const allUsers = await this.setAllUsers();
  };

  typeText = (e) => {
    if (e.keyCode === 13) {
      const payload = {
        username: this.state.username,
        message: this.state.text,
      };
      const chat = `${this.state.currentChat.chatId}`;

      axios.post(`${process.env.REACT_APP_BASE_URL}/chat/${chat}`, payload);

      let temp = this.state.modify + 1;
      this.setState({
        modify: temp,
      });
      this.setState({ text: "" });

      //NOTIFICATIONS---------------------------------------
      let updateNot = [];

      this.state.notifications.map((chat, index) => {
        // console.log("id", chat.id, "txts", chat.txt);
        // console.log(this.state.currentChat);
        let updatedChat = { ...chat };
        if (chat.id === this.state.currentChat.chatId) {
          updatedChat.txt = updatedChat.txt + 1;
        }
        updateNot.push(updatedChat);
      });
      this.setState({ notifications: updateNot });
      // console.log(updateNot);
      //-----------------------------------------------------
    } else {
      let text = e.currentTarget.value;
      this.setState({ text: text });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.modify !== this.state.modify) {
      // console.log("sent");
    }
    if (prevState.currentChat !== this.state.currentChat) {
      let currentChat = this.state.currentChat;
      let prevChat = prevState.currentChat;
      let prevChannel = this.pusherSetup(prevChat.chatId);
      prevChannel.unbind();
      console.log("changed");
      // let pusher = this.pusherSetup();
      // let channel = pusher.unsubscribe(`${prevChat.chatId}`);
      // console.log("unsubscribe");
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
