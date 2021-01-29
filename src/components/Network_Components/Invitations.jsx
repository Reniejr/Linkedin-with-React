import React, { PureComponent } from "react";
import "./Network_Style/Invitations.scss";

export default class Invitations extends PureComponent {
  state = {
    showInvitations: true,
    showCard: [],
  };

  showInv() {
    this.setState({ showInvitations: !this.state.showInvitations });
  }

  showCardFunc = (index) => {
    this.setState({ showCard: [...this.state.showCard, index] });
  };

  acceptInvitation(index) {
    this.props.counterFunction();
    this.setState({ showCard: [...this.state.showCard, index] });
  }

  render() {
    let overflow = this.state.showInvitations ? "hidden" : "auto";
    let height = this.state.showInvitations ? "50vh" : "70vh";
    let text = this.state.showInvitations ? "See More" : "See Less";
    return (
      <div
        id="invitations-container"
        style={{
          overflowY: `${overflow}`,
          height: `${height}`,
        }}
      >
        <p className="toggle-list" onClick={() => this.showInv()}>
          {" "}
          {text}
        </p>
        {this.props.userList.map((user, index) => {
          return (
            <div
              id="invitations"
              key={index}
              style={{
                display: this.state.showCard.includes(index) ? "none" : "block",
              }}
            >
              <header>
                <p>Invitations</p>
                <button>Manage</button>
              </header>
              <div className="invitation-card">
                <img src={user.image} alt="" />
                <div className="invitation-info">
                  <p>
                    {user.name} {user.surname}
                  </p>
                  <p>{user.bio}</p>
                  <p>{user.area}</p>
                </div>
                <div className="choose-invitation">
                  <button onClick={(e) => this.showCardFunc(index)}>
                    Ignore
                  </button>
                  <button onClick={() => this.acceptInvitation(index)}>
                    Accept
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
