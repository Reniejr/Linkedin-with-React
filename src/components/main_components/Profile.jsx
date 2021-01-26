/*Whole profile page details will be here*/
import React from "react";
import "../../css/Profile.css";
import TopHeader from "../profile_subcomponents/TopHeader";
import AboutBlock from "../profile_subcomponents/AboutBlock";
import Dashboard from "../profile_subcomponents/Dashboard";
import Footer from "../Footer";

import Interests from "../profile_subcomponents/Interests";
import Skills from "../profile_subcomponents/Skills";

import Activity from "../profile_subcomponents/Activity";
import EducationBlock from "../profile_subcomponents/EducationBlock";

import SeeJobs from "../sideComponents/SeeJobs";
import EditAdd from "../sideComponents/EditAdd";
import PeopleAlsoViewed from "../sideComponents/PeopleAlsoViewed";
import PeopleYouMayKnow from "../sideComponents/PeopleYouMayKnow";
import InLearning from "../sideComponents/InLearning";

class Profile extends React.Component {
  state = {
    user: {},
    users: [],
    isShowEditButton: true,
    showChanges: false,
    isImgUploaded: false,
    message: "",
    isLoading: "",
  };

  uploadImage = async (e) => {
    e.preventDefault();

    this.setState({ isLoading: true });
    let userId = JSON.parse(window.localStorage.getItem("userId"));

    const inputFile = document.querySelector("#profile-image-upload-file");

    let formData = new FormData();
    formData.append("profile", inputFile.files[0]);

    try {
      let response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${userId}/picture`,
        {
          method: "POST",
          body: formData,
          headers: new Headers({
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        this.setState({
          message: "Successfully Uploaded",
          isLoading: false,
          isImgUploaded: !this.state.isImgUploaded,
        });
      } else {
        this.setState({
          message: "Something went wrong",
          isLoading: false,
        });
      }
    } catch (e) {
      this.setState({
        message: "Something went wrong",
        isLoading: false,
      });
    }
  };
  getProfileInfo = async () => {
    let id = this.props.match.params.id;
    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_URL + `profile/${id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
          },
        }
      );

      const user = await response.json();
      console.log(user);
      this.setState({ user }, () => {
        if (this.props.match.params.id.localeCompare("me") === -1) {
          this.setState({ isShowEditButton: false });
        } else {
          this.setState({ isShowEditButton: true });

          let id = this.state.user._id;
          window.localStorage.setItem("userId", JSON.stringify(id));
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  getProfile = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_URL + "profile/",
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
          },
        }
      );

      const users = await response.json();
      console.log(users);
      this.setState({ users });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.getProfileInfo();
    this.getProfile();
  }

  componentDidUpdate(prevProp, prevState) {
    if (
      prevProp.match.params.id !== this.props.match.params.id ||
      prevState.showChanges !== this.state.showChanges ||
      prevState.isImgUploaded !== this.state.isImgUploaded
    ) {
      this.getProfileInfo();
    }
  }

  handleShowChanges = (showModal) => {
    if (showModal) {
      this.setState({ showChanges: !this.state.showChanges });
    }
  };

  render() {
    let id = this.props.match.params.id;
    let userInfo;
    if (id === "me") {
      userInfo = JSON.parse(window.localStorage.getItem("userId"));
    } else {
      userInfo = id;
    }
    return (
      <>
        <div className="container d-flex flex-row" id="profile-page">
          <div>
            <TopHeader
              message={this.state.message}
              isLoading={this.state.isLoading}
              uploadImage={this.uploadImage}
              showChanges={this.handleShowChanges}
              isShowEditBtn={this.state.isShowEditButton}
              user={this.state.user}
            />
            <AboutBlock isShowEditBtn={this.state.isShowEditButton} />
            <Dashboard />
            <Activity />
            <EducationBlock
              isShowEditBtn={this.state.isShowEditButton}
              user={userInfo}
            />
            <Skills isShowEditBtn={this.state.isShowEditButton} />
            <Interests />
          </div>
          <div className="side-components mt-3">
            <EditAdd />
            <SeeJobs />
            <PeopleAlsoViewed deta={this.state.users} />
            <PeopleYouMayKnow deta={this.state.users} />
            <InLearning />
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Profile;
