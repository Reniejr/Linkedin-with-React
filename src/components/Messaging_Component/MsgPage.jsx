import React, { PureComponent } from "react";
import MainMsg from "./MainMsg";
import "./Messaging_Styles/MsgPage.scss";
import "../css/RightSide.scss";
import MsgSide from "./MsgSide";
import footericon from "../images/footericon.png";
import Pusher from "pusher-js";
import { getUser, postMessage } from "./Utils/index";
import axios from "axios";

export default class MsgPage extends PureComponent {
  state = {
    text: "",
    username: "",
    chats: [],
  };

  setUser = async () => {
    const user = await getUser("600eab3b9257344464c04d3d");
    this.setState({ username: user.username });
  };

  componentDidMount() {
    this.setUser();
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      encrypted: true,
    });
    const channel = pusher.subscribe("chat");
    channel.bind("message", (data) => {
      this.setState({ chats: [...this.state.chats, data], test: "" });
    });
    this.typeText = this.typeText.bind(this);
  }

  typeText = (e) => {
    if (e.keyCode === 13) {
      const payload = {
        username: this.state.username,
        message: this.state.text,
      };
      axios.post(`${process.env.REACT_APP_BASE_URL}/chat`, payload);
    } else {
      let text = e.currentTarget.value;
      this.setState({ text: text });
    }
  };

  render() {
    return (
      <div id="msg-page">
        <div className="main-body">
          <MsgSide />
          <MainMsg typeFunc={this.typeText} chat={this.state.chats} />
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
