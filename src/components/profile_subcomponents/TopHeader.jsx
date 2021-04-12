import React from "react";
import { Col, Container, Row, Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/TopHeader.css";
import striveLogo from "../images/strive-logo.jpeg";
import EditProfileModal from "./EditProfileModal";
import CreateIcon from "@material-ui/icons/Create";
import ProfileImage from "./ProfileImage";

import ImagePreviewModal from "../main_components/ImagePreviewModal";
class TopHeader extends React.Component {
  state = { showModal: false, modalShow: false, imgPreviewModal: false };

  downloadExp = () => {
    window.location.assign(
      `${process.env.REACT_APP_BASE_URL}/experiences/${this.props.currentId}/experiences/csv`
    );
  };

  render() {
    const { user } = this.props;
    return (
      <>
        <ImagePreviewModal
          image={user.image}
          show={this.state.imgPreviewModal}
          onHide={() => {
            this.setState({
              imgPreviewModal: false,
            });
          }}
        />
        <EditProfileModal
          message={this.props.message}
          isLoading={this.props.isLoading}
          uploadImage={this.props.uploadImage}
          user={user}
          onHide={() => {
            this.setState({
              showModal: false,
            });

            this.props.showChanges(this.state.showModal);
          }}
          show={this.state.showModal}
        />

        <ProfileImage
          message={this.props.message}
          isLoading={this.props.isLoading}
          uploadImage={this.props.uploadImage}
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
        />

        <div className="top-header-card">
          <Row>
            <Col md={12} className="images-container">
              <img
                className="header-img"
                src="https://res.cloudinary.com/waliwalo/image/upload/v1618221792/1612205960672_slpvxa.jpg"
                alt="top-image"
              />
              <img
                onClick={() => this.setState({ imgPreviewModal: true })}
                className="profile-img"
                src={this.props.user.image}
                alt="profile-pic"
              />
              <div
                style={{
                  visibility: this.props.isShowEditBtn ? "visible" : "hidden",
                }}
                className="profile-img-edit"
                onClick={() => this.setState({ modalShow: true })}
              >
                <CreateIcon />
              </div>

              <div
                style={{
                  visibility: this.props.isShowEditBtn ? "visible" : "hidden",
                }}
                onClick={() =>
                  this.setState({
                    showModal: true,
                  })
                }
                className="edit-profile-icon float-right mr-4 mt-4"
              >
                <i className=" fas fa-pencil-alt fa-lg "></i>
              </div>
            </Col>

            {/* <Col md={12}></Col> */}
          </Row>

          <Row className="header-text justify-content-between ml-0 text-left ">
            <Col md={6} className="">
              <h3>
                {user.name} {user.surname}
              </h3>
            </Col>

            <Col md={6} className="d-flex flex-row ">
              <img
                className="ml-5"
                style={{ width: "23px", height: "23px" }}
                src={striveLogo}
                alt="strive"
              />
              <p style={{ fontWeight: "600" }} className="ml-1">
                Strive School
              </p>
            </Col>
            <Col md={6}>
              <p>{user.title}</p>
            </Col>
          </Row>

          <div className="text-left d-flex flex-row">
            <p className="ml-3 mr-3">{user.area}</p>

            <p className=" mr-3 connections">500+ Connections</p>

            <p className="contact">Contact Info</p>
          </div>

          <div className="d-flex flex-row mb-4">
            <DropdownButton className="ml-3 mr-3 blue" title="Open To">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>

            <DropdownButton
              className="mr-3"
              variant="secondary"
              id="dropdown-basic-button"
              title="Add profile section"
            >
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>

            <DropdownButton
              id="dropdown-basic-button"
              variant="success"
              title="More"
            >
              <Dropdown.Item onClick={() => this.downloadExp()}>
                Get Your Experiences
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </>
    );
  }
}

export default TopHeader;
