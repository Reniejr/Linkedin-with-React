import React, { PureComponent } from "react";
import MainMsg from "./MainMsg";
import "./Messaging_Styles/MsgPage.scss";
import "../css/RightSide.scss";
import MsgSide from "./MsgSide";
import footericon from "../images/footericon.png";
import Pusher from "pusher-js";
import { getUser } from "./Utils/index";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";

class MsgPage extends PureComponent {
  state = {
    text: "",
    username: "",
    chats: [],
  };

  setUser = async () => {
    let id;
    this.props.match.params.id === "me"
      ? (id = process.env.REACT_APP_ID)
      : (id = process.env.REACT_APP_ID);
    const user = await getUser(`${id}`);
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
          <MainMsg
            typeFunc={this.typeText}
            chat={this.state.chats}
            currentUser={this.state.username}
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
