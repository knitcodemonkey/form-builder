import React, { Component } from "react";
import PropTypes from "prop-types";
import AddField from "./AddField";
import DeleteField from "./DeleteField";
import ConditionInputs from "./ConditionInputs";
import "./formFields.css";

class FormField extends Component {
  constructor(props) {
    super(props);
    this.updateFormField = this.updateFormField.bind(this);
    this.addField = this.addField.bind(this);
    this.state = {
      formField: this.props.field
    };
  }

  addField() {
    // Create a copy of the old state so we can add the new subField to the new state
    const currField = Object.assign({}, this.state.formField);

    let lastId = -1;
    // if there is no subField, create it.
    if (typeof currField.subFields === "undefined") {
      currField["subFields"] = [];
    } else {
      lastId = currField.subFields[currField.subFields.length - 1].positionId;
      const lastIdArray = lastId.split("_");
      lastId = lastIdArray[lastIdArray.length - 1];
    }

    // Push a default subField to the end of the stack
    const newSubField = {
      positionId: currField.positionId + "_" + (parseInt(lastId, 10) + 1),
      parentId: currField.positionId,
      condition: "Equals",
      conditionValue: currField.type === "bool" ? "Yes" : "",
      question: "",
      type: "bool"
    };

    // Hoist the new state, recursively, to the CreateForm component to update it's place in the stack
    this.props.updateField(newSubField, "addField");
  }

  /**
   * updateFormField updates the form inputs within the form block
   * @param {*} e
   */
  updateFormField(e) {
    // get the current state of the field
    const formField = Object.assign({}, this.state.formField);

    // find out which input is changing in the field
    const inputName = e.target.id.split("_")[0];

    // Update the input in our state clone
    formField[inputName] = e.target.value;

    // hoist the state to the parent component
    this.props.updateField(formField, "editField");

    // update component state so the field functions as expected
    this.setState({ formField });
    this.forceUpdate();
  }

  /**
   * This allows for recursive rendering, adding, updating, and deleting of all the subFields
   */
  renderSubFields() {
    // if there are subFields,
    if (this.props.field.subFields) {
      // map through them
      return this.props.field.subFields.map((currSubField, index) => {
        // create a key for each one
        currSubField.key = this.props.field.key + "_subField" + index;

        // render them recursively
        return (
          <FormField
            field={currSubField}
            key={currSubField.key}
            parentFieldType={this.props.field.type}
            updateField={this.props.updateField}
          />
        );
      });
    }
  }

  render() {
    const field = this.state.formField;
    return (
      <div className="formSection">
        <div className="formField">
          {field.parentId || field.parentId === 0 ? (
            // if the parentId exists, then we'll need to render these.
            <ConditionInputs
              field={field}
              parentFieldType={this.props.parentFieldType}
              updateFormField={this.updateFormField}
            />
          ) : (
            ""
          )}
          <div className="question">
            <label htmlFor={"question_" + field.key}>Question</label>
            <input
              id={"question_" + field.key}
              type="text"
              value={field.question}
              onChange={this.updateFormField}
            />
          </div>
          <div className="questionType">
            <label htmlFor={"type_" + field.key}>Type</label>
            <select
              id={"type_" + field.key}
              value={field.type}
              onChange={this.updateFormField}
            >
              <option value="bool">Yes / No</option>
              <option value="text">Text</option>
              <option value="number">Number</option>
            </select>
          </div>
          <div className="actions">
            <AddField addField={this.addField} parentId={field.positionId} />
            <DeleteField
              deleteField={this.props.updateField}
              positionId={field.positionId}
            />
          </div>
        </div>
        {this.renderSubFields()}
      </div>
    );
  }
}

/**
 *
 */
FormField.propTypes = {
  field: PropTypes.object.isRequired,
  parentFieldType: PropTypes.string,
  updateField: PropTypes.func.isRequired
};

export default FormField;
