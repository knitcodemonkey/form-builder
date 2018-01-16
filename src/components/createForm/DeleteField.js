import React, { Component } from "react";
import PropTypes from "prop-types";

class DeleteField extends Component {
  constructor(props) {
    super(props);
    this.deleteField = this.deleteField.bind(this);
  }

  deleteField(e) {
    e.preventDefault();
    this.props.deleteField(
      { positionId: this.props.positionId },
      "deleteField"
    );
  }

  render() {
    return (
      <button value="deleteField" onClick={this.deleteField}>
        Delete
      </button>
    );
  }
}

DeleteField.propTypes = {
  deleteField: PropTypes.func.isRequired,
  positionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default DeleteField;
