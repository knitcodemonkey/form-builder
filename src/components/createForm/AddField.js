import React, { Component } from "react";
import PropTypes from "prop-types";

class AddField extends Component {
  constructor(props) {
    super(props);
    this.addField = this.addField.bind(this);
  }

  addField(e) {
    e.preventDefault();
    this.props.addField(this.props.parentId || false);
  }

  render() {
    return (
      <button value="addField" onClick={this.addField}>
        {this.props.parentId !== undefined ? "Add Sub-Input" : "Add Input"}
      </button>
    );
  }
}

AddField.propTypes = {
  addField: PropTypes.func.isRequired,
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default AddField;
