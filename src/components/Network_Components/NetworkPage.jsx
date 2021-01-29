import React, { PureComponent } from "react";
import "./Network_Style/NetworkPage.scss";
import SideBarNetwork from "./SideBarNetwork";
import { Container, Row, Col } from "react-bootstrap";
import Invitations from "./Invitations";
import Events from "./Events";
import { getAllProfiles } from "./Utils";
import { withAuth0 } from "@auth0/auth0-react";

class NetworkPage extends PureComponent {
  state = {
    counter: 0,
    currentId: null,
    allUsers: [],
    selectedUsers: [],
  };

  setAllUsers = async () => {
    let allUsers = await getAllProfiles();
    allUsers = allUsers.filter((user) => user._id !== this.state.currentId);
    this.setState({ allUsers });
  };

  componentDidMount() {
    this.setAllUsers();
    const { user } = this.props.auth0;
    let currentId = user.sub.slice(6);
    this.props.setCurrentId(currentId);
    this.setState({ currentId });
  }

  counterFunction = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  render() {
    return (
      <Container id="network-page">
        <Row>
          <Col xs={4}>
            <SideBarNetwork counter={this.state.counter} />
          </Col>
          <Col xs={8}>
            <Invitations
              userList={this.state.allUsers}
              counterFunction={this.counterFunction}
              setUsers={this.props.setUsers}
            />
            <Events />
          </Col>
        </Row>
      </Container>
    );
  }
}
export default withAuth0(NetworkPage);
