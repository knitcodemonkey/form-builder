import React, { Component } from "react";
import PropTypes from "prop-types";

class BoolField extends Component {
  constructor(props) {
    super(props);
    this.updateFormField = this.updateFormField.bind(this);
    this.state = {
      answer: ""
    };
  }

  updateFormField(e, answer) {
    this.setState({ answer });
    this.props.updateFormField(e, answer);
  }

  createBool() {
    const field = this.props.field;
    return (
      <select
        className="conditionValue"
        id={"conditionValue_" + field.key}
        value={field.conditionValue}
        onChange={this.updateFormField}
      >
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    );
  }

  displayBool() {
    const field = this.props.field;
    return (
      <div className="radioFields">
        <div className="radio">
          <input
            type="radio"
            id={field.key + "_Yes"}
            name={field.key + "_question"}
            value="Yes"
            onChange={e => this.updateFormField(e, e.target.value)}
          />
          <label htmlFor={field.key + "_Yes"}>Yes</label>
        </div>
        <div className="radio">
          <input
            type="radio"
            id={field.key + "_No"}
            name={field.key + "_question"}
            value="No"
            onChange={e => this.updateFormField(e, e.target.value)}
          />
          <label htmlFor={field.key + "_No"}>No</label>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.mode === "edit") {
      return this.createBool();
    } else {
      return this.displayBool();
    }
  }
}

BoolField.propTypes = {
  field: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  updateFormField: PropTypes.func
};

export default BoolField;
