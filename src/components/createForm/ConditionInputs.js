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

  /**
   * When the component mounts, double check the parentFieldType.
   * If it changed, we need to update the conditionValues to no longer
   * keep values that are invalid for its type
   */
  componentWillMount() {
    this.updateConditionValue();
    this.updateCondition();
  }

  /**
   * double check the parentFieldType.
   * If it changed, we need to update the conditionValues to no longer
   * keep values that are invalid for its type
   */
  updateConditionValue() {
    // fake event object
    let e = {
      target: {
        id: "conditionValue_" + this.props.field.key,
        value: this.props.field.conditionValue
      }
    };

    // if conditionValue === Yes or No
    const isBool = ["Yes", "No"].indexOf(this.props.field.conditionValue);
    // for readability
    const parentFieldType = this.props.parentFieldType;
    // if conditionValue needs to update, do so. else, do nothing.
    if (parentFieldType === "bool" && isBool === -1) {
      e.target.value = "Yes";
    } else if (parentFieldType !== "bool" && isBool > -1) {
      e.target.value = "";
    } else {
      return;
    }

    this.updateFormField(e);
  }

  /**
   * double check the conditions allowed by parentFieldType.
   * If it changed, we need to update the condition to no longer
   * keep values that are invalid for its type
   */
  updateCondition() {
    // if condition === params allowed by conditions
    const isBool = conditions[this.props.parentFieldType].indexOf(
      this.props.field.condition
    );

    // if condition needs to update, do so. else, do nothing.
    if (isBool === -1) {
      // fake event object and update
      this.updateFormField({
        target: {
          id: "condition_" + this.props.field.key,
          value: "Equals"
        }
      });
    }
    return;
  }

  // hoist the form update event
  updateFormField(e) {
    this.props.updateFormField(e);
  }

  render() {
    const field = this.props.field;
    return (
      <div className="conditional">
        <label htmlFor={"condition_" + field.key}>Condition</label>
        <select
          className="condition"
          id={"condition_" + field.key}
          value={field.condition}
          onChange={this.updateFormField}
        >
          {conditions[this.props.parentFieldType].map(option => {
            return (
              <option value={option} key={"condition_" + field.key + option}>
                {option}
              </option>
            );
          })}
        </select>
        {//Update the conditionValues to change to match parentFieldType allowances
        this.props.parentFieldType === "bool" ? (
          <select
            className="conditionValue"
            id={"conditionValue_" + field.key}
            value={field.conditionValue}
            onChange={this.updateFormField}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        ) : (
          <input
            className="conditionValue"
            id={"conditionValue_" + field.key}
            type={this.props.parentFieldType}
            value={field.conditionValue}
            onChange={this.updateFormField}
          />
        )}
      </div>
    );
  }
}

ConditionInput.propTypes = {
  field: PropTypes.object.isRequired,
  parentFieldType: PropTypes.string,
  updateFormField: PropTypes.func.isRequired
};

export default ConditionInput;
