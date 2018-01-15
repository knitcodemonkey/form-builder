import React, { Component } from "react";
import PropTypes from "prop-types";

class AddField extends Component {
  constructor(props) {
    super(props);
    this.addField = this.addField.bind(this);
  }

  /**
   * Adds a new field to the stack
   *
   * when hoisting to addField, the `addField` parameter may change.
   * If it goes to the CreateForm component:
   * an id will be created, and it will be added as a main-level field.
   *
   * If it goes to the FormField component: "addField" will be disgarded.
   * This allows FormField to specify that it is updating the parent field
   * with a new subField instead of adding a new main-level field.
   *
   * @param {event} e
   */
  addField(e) {
    e.preventDefault();
    this.props.addField(this.props.parentId || false, "addField");
  }

  /**
   * Render button
   */
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
