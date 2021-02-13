import React, { useState, useEffect } from "react";
import "../Messaging_Styles/MsgPage.scss";
import "../Messaging_Styles/MainMsg.scss";
import "../../css/RightSide.scss";
import footericon from "../../images/footericon.png";
import { withAuth0 } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";
import MsgSideSocket from "./MsgSideSocket";
import MainMsgSocket from "./MainMsgSocket";

//SOCKET IMPORT
import io from "socket.io-client";

const connOpt = {
  transports: ["websocket"],
};

let socket = io("https://striveschool-api.herokuapp.com", connOpt);

function MsgPageSocket(props) {
  const [username, setUsername] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [message, setMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    let { user } = props.auth0;
    let currentId = user.sub.slice(6);
    let nickname = user.nickname;
    console.log(nickname);
    setUsername(nickname);
    socket.on("bmsg", (msg) => setMessages((messages) => messages.concat(msg)));
    socket.emit("setUsername", { username: nickname });
    socket.on("list", (user) =>
      setUserList((userList) => userList.concat(user))
    );
    socket.on("connect", () => console.log("Connect"));
    console.log(socket);
    return () => {
      if (socket) {
        socket.removeAllListeners();
      }
    };
  }, []);

  const sendMessage = (e) => {
    if (e.keyCode === 13 || e.key === "Enter") {
    } else {
    }
  };

  return (
    <div id="msg-page">
      <div className="main-body">
        <MsgSideSocket />
        <MainMsgSocket listMsg={messages} />
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
export default withAuth0(MsgPageSocket);
