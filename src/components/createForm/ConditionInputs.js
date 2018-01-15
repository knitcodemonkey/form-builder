import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../css/formFields.css";

/**
 * Passes in the conditions from a separate js file.
 * These params are used in FormField and in PreviewForm,
 * but are not necessarily something we need to keep in state as they do not change.
 * These can be updated per project, if desired
 */
import conditions from "../../library/conditions";

class ConditionInput extends Component {
  constructor(props) {
    super(props);
    this.updateFormField = this.updateFormField.bind(this);
  }

  updateFormField(e) {
    this.props.updateFormField(e);
  }

  render() {
    const field = this.props.field;
    return (
      <div className="conditional">
        <label htmlFor={"condition_" + field.fieldKey}>Condition</label>
        <select
          className="condition"
          id={"condition_" + field.fieldKey}
          value={field.condition}
          onChange={this.updateFormField}
        >
          {conditions[this.props.parentFieldType].map(option => {
            return (
              <option
                value={option}
                key={"condition_" + field.fieldKey + option}
                onChange={this.updateFormField}
              >
                {option}
              </option>
            );
          })}
        </select>
        {this.props.parentFieldType === "bool" ? (
          <select
            className="conditionValue"
            id={"conditionValue_" + field.fieldKey}
            value={field.conditionValue}
            onChange={this.updateFormField}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        ) : (
          <input
            className="conditionValue"
            id={"conditionValue_" + field.fieldKey}
            type={this.props.parentFieldType}
            value={field.conditionValue}
            onChange={this.updateFormField}
          />
        )}
      </div>
    );
  }
}

/**
 *
 */
ConditionInput.propTypes = {
  field: PropTypes.object.isRequired,
  parentFieldType: PropTypes.string,
  updateFormField: PropTypes.func.isRequired
};

export default ConditionInput;
