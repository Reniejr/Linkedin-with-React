import React from "react";
import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";

class EditProfileForm extends React.Component {
  state = {
    user: {},
    ok: false,
  };

  componentDidMount() {
    let { user } = { ...this.props };
    // for (let value in user) {
    // 	user[value] = value;
    // }
    this.setState({ user });
  }
  fillForm = (e) => {
    let currentValue = e.currentTarget.id;

    let user = { ...this.state.user };

    user[currentValue] = e.currentTarget.value;

    this.setState({ user });
  };

  postUserChanges = async () => {
    let id = this.props.user._id;
    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_URL + `/profiles/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(this.state.user),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        alert("something went wrong");
      } else {
        this.setState({ ok: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.postUserChanges();
  };
  render() {
    const { user } = this.props;
    return (
      <Container>
        <Form onSubmit={this.handleFormSubmit}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label htmlFor="name">First Name</Form.Label>
                <Form.Control
                  id="name"
                  name="name"
                  placeholder="First name"
                  value={this.state.user.name}
                  onChange={this.fillForm}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label htmlFor="surname">Last Name</Form.Label>
                <Form.Control
                  id="surname"
                  name="surname"
                  placeholder="Last name"
                  value={this.state.user.surname}
                  onChange={this.fillForm}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="form-disabled-info mt-5">
            <h4>+ Record name pronunciation</h4>
            <p>Name pronunciation can only be added using our mobile app.</p>
          </div>

          <Form.Group>
            <Form.Label>Headline</Form.Label>
            <Form.Control
              id="title"
              as="textarea"
              value={this.state.user.title}
              rows={2}
              onChange={this.fillForm}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Country/Region</Form.Label>
            <Form.Control
              id="area"
              placeholder="Last name"
              value={this.state.user.area}
              onChange={this.fillForm}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Contact Info</Form.Label>
            <Form.Control
              id="email"
              placeholder="Contact Info"
              value={this.state.user.email}
              onChange={this.fillForm}
            />
          </Form.Group>
          <div className="submit-button float-right mr-3 ">
            <Button type="submit">Save </Button>
          </div>
        </Form>
      </Container>
    );
  }
}

export default EditProfileForm;
