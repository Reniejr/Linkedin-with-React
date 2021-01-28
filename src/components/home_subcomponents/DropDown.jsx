import React, { PureComponent } from "react";

export default class DropDown extends PureComponent {
  render() {
    return (
      <div
        className="dropdown"
        style={{ display: this.props.show ? "block" : "none" }}
      >
        <ul>{this.props.children}</ul>
      </div>
    );
  }
}
