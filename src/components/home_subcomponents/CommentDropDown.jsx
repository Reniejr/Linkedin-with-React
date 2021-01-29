import React, { PureComponent } from "react";
import { AiFillEdit } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
//STYLE
import "../css/comment-drop.css";
export default class DropDown extends PureComponent {
  render() {
    let { dropdownList, thisComment } = this.props;
    return (
      <div
        className="drop-comment-container"
        // style={{ display: this.props.show ? "block" : "none" }}
        style={{
          display: dropdownList.includes(thisComment) ? "block" : "none",
        }}
      >
        <div className="comment-button">
          <div>
            <AiFillEdit className="align-self-center" />
            <span className="pl-2 py-1 ">Edit</span>
          </div>
        </div>

        <div
          className="comment-button"
          onClick={
            (this.props.onChangeElement, console.log(this.props.thisComment))
          }
        >
          <div>
            <TiDelete className="align-self-center" />
            <span className="pl-1 bottom-1 ">Delete</span>
          </div>
        </div>
      </div>
    );
  }
}
