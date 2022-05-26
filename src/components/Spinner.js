import React, { Component } from "react";

export class Spinner extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center align-items-center ">
        <div className="spinner-border my-3" role="status"></div>
      </div>
    );
  }
}

export default Spinner;
