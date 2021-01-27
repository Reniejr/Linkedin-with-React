import React, { PureComponent } from "react";
import "../css/EducationBlock.scss";
import ModalForEduBlock from "./ModalForEduBlock";
import { Row, Col, Form } from "react-bootstrap";
import ExperienceForm from "../dataExamples/ExperienceForm.json";
import SchoolForm from "../dataExamples/SchoolForm.json";
import {
  createExperience,
  deleteExperience,
  fetchSingleExperience,
  fetchUserExperiences,
  submitExperienceImage,
  updateSingleExperience,
} from "../../apis/experience/api";

export default class EducationBlock extends PureComponent {
  state = {
    experience: {
      role: "",
      employment: "",
      company: "",
      area: "",
      startDate: "",
      endDate: "",
      image: "",
    },
    education: {
      schoolName: "",
      degree: "",
      batchYr: "",
    },
    license: {
      name: "",
      organization: "",
      time: "",
    },
    showModal: true,
    form: [],
    titleModal: "",
    fillFunction: "",
    saveFunction: "",
    results: [],
    idToEdit: "",
    buttonModal: "Save",
    stateForValue: "",
    imageToUpload: "",
    experiences: [],
  };

  //FETCH FUNCTIONS

  //GET ALL EXPERIENCES OR ONLY ONE
  fetchGet = async (id, content, idContent, result) => {
    if (idContent === null) {
      let response = await fetch(
        `${process.env.REACT_APP_BASE_URL}${content}/${id}`
      );
      result = await response.json();
      this.setState({ results: [...this.state.results, ...result] });
    } else {
      //GET BY ID
      let response = await fetch(
        process.env.REACT_APP_BASE_URL +
          `/profiles/${id}` +
          content +
          idContent,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
          },
        }
      );
      result = await response.json();
      let exp = {
        role: result.role,
        employment: "",
        company: result.company,
        area: result.area,
        startDate: result.startDate,
        endDate: result.endDate,
        image: result.image,
      };
      this.setState({ experience: exp });
    }
    return result;
  };

  //FETCH POST
  fetchPost = async (id, content) => {
    let response = await fetch(
      process.env.REACT_APP_BASE_URL + `/${content}/${id}`,
      {
        method: "POST",
        body: JSON.stringify(this.state.experience),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        }),
      }
    );
    let result = await response.json();
    this.setState({ results: [...this.state.results, result] });
    return result;
  };

  //FETCH PUT
  fetchPut = async (id, content, contentId) => {
    let response = await fetch(
      process.env.REACT_APP_BASE_URL + `profiles/${id}/${content}/${contentId}`,
      {
        method: "PUT",
        body: JSON.stringify(this.state.experience),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        }),
      }
    );
    let result = await response.json();
    this.setState({ results: [...this.state.results, result] });
  };

  fetchDelete = async (id, content, contentId) => {
    let response = await fetch(
      process.env.REACT_APP_BASE_URL + `profiles/${id}/${content}/${contentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        },
      }
    );
    // let result = await response.json();
  };

  //SHOW MODAL FUNCTION
  showModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  //PASSING FORM DATA FOR INPUTS ON MODAL

  //FOR EXPERIENCE
  experienceForm() {
    this.setState({
      form: ExperienceForm,
      titleModal: "Add Experience",
      fillFunction: this.fillExp,
      saveFunction: this.saveExp,
      stateForValue: "experience",
    });
    this.showModal();
  }

  //FOR SCHOOL
  schoolForm() {
    this.setState({ form: SchoolForm, titleModal: "Add Education" });
    this.showModal();
  }

  //FILL FUNCTION
  fillExp = (e) => {
    let exp = { ...this.state.experience };
    let currentId = e.currentTarget.id;
    exp[currentId] = e.currentTarget.value;
    if (
      currentId === "checkEnd" &&
      exp[currentId] === e.currentTarget.checked
    ) {
      exp.endDate = "";
    }
    this.setState({ experience: exp });
  };

  fillExpImg = (e) => {
    let img = e.currentTarget.value;
    this.setState({ imageToUpload: img });
  };

  //EDIT FUNCTION
  editFillExp = async (id) => {
    let userId = this.props.user; /*._id */
    // this.fetchGet(userId, "/experiences/", id, result);
    let experience = await fetchSingleExperience(userId, id);
    // console.log(experience);
    // this.fillExp();
    // let exp = {
    //   role: result.role,
    //   employment: "",
    //   company: result.company,
    //   area: result.area,
    //   startDate: result.startDate,
    //   endDate: result.endDate,
    // };
    this.setState({
      form: ExperienceForm,
      titleModal: "Edit Experience",
      fillFunction: this.fillExp,
      saveFunction: this.editExp,
      idToEdit: id,
      buttonModal: "Edit",
      experience: experience[0],
    });
    this.showModal();
  };

  //POST EXPERIENCE
  saveExp = async () => {
    // let id = this.props.user; /*._id*/
    // let postResult = await this.fetchPost(id, "experiences");
    // this.postImgExp(postResult._id, postResult);
    this.createExp();
    this.showModal();
  };

  createExp = async () => {
    let id = this.props.user; /*._id*/
    let postResult = await createExperience(id, this.state.experience);
    let image = document.querySelector("#expFile");
    if (image.files[0]) {
      await this.createImg(postResult._id);
    }
    this.fetchUsers();
  };

  createImg = async (postId) => {
    let id = this.props.user; /*._id*/
    let image = document.querySelector("#expFile");
    let response = await submitExperienceImage(id, image, postId);
    alert(response);
  };

  //POST IMAGE EXPERIENCE
  postImgExp = async (expId, post) => {
    let userId = this.props.user;
    let image = document.querySelector("#expFile");
    let data = new FormData();
    data.append("image", image.files[0]);
    let response = await fetch(
      process.env.REACT_APP_BASE_URL +
        `/experiences/${userId}/${expId}/picture`,
      {
        method: "POST",
        body: data,
      }
    );
    let result = await response.json();
    this.fetchGet(userId, "/experiences", null, []);
    this.setState({ experience: { image: result.image } });
  };

  //LOAD ALL EXPERIENCES
  loadExp() {
    let id = this.props.user; /*._id*/
    let result = [];
    this.fetchGet(id, "/experiences", null, result);
  }

  //EDIT EXPERIENCE
  editExp = async () => {
    let id = this.props.user; /*._id*/
    // this.fetchPut(id, "experiences", this.state.idToEdit);
    await updateSingleExperience(
      id,
      this.state.idToEdit,
      this.state.experience
    );
    // console.log(res);
    let image = document.querySelector("#expFile");
    if (image.files[0]) {
      await this.createImg(this.state.idToEdit);
    }

    // this.postImgExp(this.state.idToEdit);
    // this.setState({ results: [] });
    // console.log(this.state.results);
    // this.loadExp();
    this.fetchUsers();
    this.showModal();
  };

  //DELETE EXPERIENCE
  deleteExp = async (id) => {
    let userId = this.props.user; /*._id*/
    // this.fetchDelete(userId, "experiences", id);
    let result = await deleteExperience(userId, id);
    alert(result);
    this.fetchUsers();
    // let result = [];
    // this.fetchGet(id, "/experiences", null, result);
  };

  componentDidMount() {
    this.loadExp();
    this.fetchUsers();
  }

  fetchUsers = async () => {
    let experiences = await fetchUserExperiences(this.props.user);
    this.setState({ experiences: experiences });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.results.length !== this.state.results.length) {
      // this.loadExp();
    }
  }

  render() {
    let show = this.state.showModal ? "-150vh" : "";
    let showBtn = this.props.isShowEditBtn ? "block" : "none";
    return (
      <div id="edu-section">
        <ModalForEduBlock
          style={show}
          showModal={this.showModal.bind(this)}
          typeForm={this.state.form}
          titleModal={this.state.titleModal}
          save={this.state.saveFunction}
          buttonModal={this.state.buttonModal}
        >
          <Form>
            {this.state.form
              .filter(
                (input) => input.as !== "select" || input.as === "textarea"
              )
              .map((input, index) => {
                return (
                  <Form.Group key={index}>
                    <Form.Label htmlFor={input.htmlFor}>
                      {input.title}
                    </Form.Label>
                    <Form.Control
                      required
                      type={input.type}
                      name={input.name}
                      id={input.id}
                      placeholder={input.placeholder}
                      as={input.as}
                      rows={input.rows}
                      onChange={this.state.fillFunction}
                      value={this.state.experience[input.id]}
                      label={input.label}
                    />
                  </Form.Group>
                );
              })}
            {this.state.form
              .filter((input) => input.as === "select")
              .map((input, index) => {
                return (
                  <Form.Group key={index}>
                    <Form.Label htmlFor={input.htmlFor}>
                      {input.title}
                    </Form.Label>
                    <Form.Control as="select" name={input.name} id={input.id}>
                      {input.options.map((title, index) => {
                        return <option key={index}>{title}</option>;
                      })}
                    </Form.Control>
                  </Form.Group>
                );
              })}
            <Form>
              <Form.Group>
                <Form.File
                  id="expFile"
                  label="Upload Image"
                  type="file"
                  onChange={this.fillExpImg}
                />
              </Form.Group>
            </Form>
          </Form>
        </ModalForEduBlock>

        {/* Experience */}

        <Row className="section experience">
          <header>
            <span>Experience</span>
            <i
              className="fas fa-plus"
              onClick={this.experienceForm.bind(this)}
              style={{ display: `${showBtn}` }}
            ></i>
          </header>
          {this.state.experiences.length > 0 &&
            this.state.experiences.map((result, index) => {
              return (
                <Row className="exp-details" key={index}>
                  <Col xs={2}>
                    <img src={result.image} alt="" />
                  </Col>
                  <Col xs={10}>
                    <p>{result.role}</p>
                    <p>{result.company}</p>
                    <p>{result.startDate.substring(0, 10)} </p>
                    <p>{result.area}</p>
                    <i
                      className="fas fa-pencil-alt"
                      onClick={this.editFillExp.bind(this, result._id)}
                      style={{ display: `${showBtn}` }}
                    ></i>
                    <i
                      className="fas fa-trash"
                      onClick={this.deleteExp.bind(this, result._id)}
                      style={{ display: `${showBtn}` }}
                    ></i>
                  </Col>
                </Row>
              );
            })}
        </Row>

        {/* Education */}

        <Row className="section education">
          <header>
            <span>Education</span>
            <i
              className="fas fa-plus"
              onClick={this.schoolForm.bind(this)}
              style={{ display: `${showBtn}` }}
            ></i>
          </header>
        </Row>

        {/* Licenses and certifications */}

        <Row className="section license">
          <header>
            <span>Licenses and Certifications</span>
            <i
              className="fas fa-plus"
              onClick={this.showModal.bind(this)}
              style={{ display: `${showBtn}` }}
            ></i>
          </header>
        </Row>
      </div>
    );
  }
}
