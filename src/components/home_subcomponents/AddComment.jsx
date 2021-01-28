import React from "react";
import { Form, Row, Button } from "react-bootstrap";
const AddComment = props => {
  return (
    <Form className="add-comment-form  mb-3">
      <Form.Group>
        <Form.Control
          className="commentArea"
          type="text"
          name="text"
          //id='comment'
          rows={1}
          cols={50}
          placeholder="Add a comment..."
          value={props.addComment.text}
          onChange={props.onChangeElement}
          onKeyDown={props.onChangeElement}
        />
      </Form.Group>

      <Row className="flex justify-content-center mr-2">
        {/* <Button variant='secondary' type='submit'>
					Send
				</Button> */}
      </Row>
    </Form>
  );
};

export default AddComment;
