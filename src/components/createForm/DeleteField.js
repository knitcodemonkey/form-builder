import React, { Component } from "react";
import PropTypes from "prop-types";

class DeleteField extends Component {
  constructor(props) {
    super(props);
    this.deleteField = this.deleteField.bind(this);
  }

  deleteField(e) {
    e.preventDefault();
    this.props.deleteField(this.props.id);
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
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default DeleteField;
