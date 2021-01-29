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
import { withAuth0 } from "@auth0/auth0-react";
import { Spinner } from "react-bootstrap";
import Loading from "../authComponents/Loading";

class Profile extends React.Component {
  state = {
    user: {},
    users: [],
    isShowEditButton: true,
    showChanges: false,
    isImgUploaded: false,
    message: "",
    isLoading: "",
    currentId: "",
  };

  uploadImage = async (e) => {
    e.preventDefault();

    this.setState({ isLoading: true });
    let userId = this.state.user._id;

    const inputFile = document.querySelector("#profile-image-upload-file");

    let formData = new FormData();
    formData.append("image", inputFile.files[0]);

    try {
      let response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/profiles/${userId}/picture`,
        {
          method: "POST",
          body: formData,
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
    let url = "";
    if (this.props.match.params.id.localeCompare("me") === 0) {
      if (this.props.auth0.user) {
        const { user } = this.props.auth0;
        let currentId = user.sub.slice(6);
        url = process.env.REACT_APP_BASE_URL + `/profiles/${currentId}`;
      }
    } else {
      url = process.env.REACT_APP_BASE_URL + `/profiles/${id}`;
    }
    try {
      const response = await fetch(url);

      if (response.ok) {
        const user = await response.json();
        this.setState({ user }, () => {
          if (this.props.match.params.id.localeCompare("me") === -1) {
            this.setState({ isShowEditButton: false });
          } else {
            this.setState({ isShowEditButton: true });

            let id = this.state.user._id;
            window.localStorage.setItem("userId", JSON.stringify(id));
          }
        });
      } else {
        this.postBasicProfile();
      }
    } catch (err) {
      console.log(err);
    }
  };

  postBasicProfile = async () => {
    try {
      if (this.props.auth0.user) {
        const { user } = this.props.auth0;
        let profile = {
          _id: user.sub.slice(6),
          name: user.nickname,
          email: user.email,
          image: user.picture,
          bio: "bio here",
          area: "area here",
          username: user.name,
          surname: "surname here",
        };
        let response = fetch(`${process.env.REACT_APP_BASE_URL}/profiles`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profile),
        });
        if (response.ok) {
          alert("successfuly added");
          let result = await response.json();
          alert(result);
        } else {
          alert("Unable to post something went wrong");
          let error = await response.json();
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  getProfile = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_URL + "/profiles"
      );

      const users = await response.json();
      this.setState({ users });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    const { user } = this.props.auth0;
    let currentId = user.sub.slice(6);
    this.setState({ currentId: currentId });
    if (this.props.auth0.isLoading) {
      return <Loading />;
    } else {
      this.getProfileInfo();
      this.getProfile();
    }
  }

  componentDidUpdate(prevProp, prevState) {
    if (
      prevProp.match.params.id !== this.props.match.params.id ||
      prevState.showChanges !== this.state.showChanges ||
      prevState.isImgUploaded !== this.state.isImgUploaded
    ) {
      this.getProfileInfo();
    }
    if (prevProp.auth0.isLoading !== this.props.auth0.isLoading) {
      this.getProfileInfo();
      this.getProfile();
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
              currentId={this.state.currentId}
            />
            <AboutBlock isShowEditBtn={this.state.isShowEditButton} />
            <Dashboard />
            <Activity />
            {this.state.user._id ? (
              <EducationBlock
                isShowEditBtn={this.state.isShowEditButton}
                user={this.state.user._id}
              />
            ) : (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            )}

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

export default withAuth0(Profile);
