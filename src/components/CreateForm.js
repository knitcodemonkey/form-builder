import React, { Component } from "react";
import PropTypes from "prop-types";
import FormField from "./createForm/FormField.js";
import AddField from "./createForm/AddField";

class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.updateField = this.updateField.bind(this);
  }

  /**
   *
   * @param {Object} field
   * @param {string} action
   */
  updateField(field, action) {
    // make a copy of the old state so we can create the new state
    let currField = this.props.formFields.slice();
    // If the id doesn't exist (only happens when adding a field to the main-level), create it for addField actions
    if (!field) {
      let lastId = -1;
      if (currField.length > 0) {
        lastId = currField[currField.length - 1].id;
      }
      field = {
        question: "",
        type: "bool",
        id: parseInt(lastId, 10) + 1
      };
    }
    // split the id to find out how deep this rabbit hole goes.
    const fieldMap = field.id.toString().split("_");

    // if the id is at the main level, deal with it
    if (fieldMap.length === 1) {
      // The main level handles adding fields directly.
      // Subfield additions are handled in the FormField component
      // and added as an edit to the parent element

      switch (action) {
        case "addField":
          currField.push(field);
          break;
        case "editField":
          currField[fieldMap[0]] = field;
          break;
        case "deleteField":
          currField.splice(fieldMap[0], 1);
          break;
        default:
          return;
      }
    } else {
      // if the action is deeper, these are all in subFields
      let old = currField[fieldMap[0]]; // updating one, updates both

      // Map through our id to add/update/delete it's location
      fieldMap.map((val, idx) => {
        if (idx > 0 && idx + 1 !== fieldMap.length) {
          // map to deeper form field inside `subFields`
          old = old.subFields[val];
        }

        if (idx + 1 === fieldMap.length) {
          switch (action) {
            case "deleteField":
              if (old.subFields.length === 1) {
                delete old.subFields;
              } else {
                old = old.subFields.splice(val, 1);
              }
              break;
            case "editField":
              old.subFields[val] = field;
              break;
            case "addField":
              // if subFields don't exist, we need to create it
              if (parseInt(val, 10) === 0) {
                old["subFields"] = [];
              }
              // add our field to the subFields array
              old.subFields.push(field);
              break;
            default:
              return true;
          }
        }
        return true;
      });
    }
    this.props.updateData(currField);
  }

  render() {
    return (
      <div className="createForm">
        {this.props.formFields.map((field, index) => {
          field.key = field.type + index;
          return (
            <FormField
              field={field}
              key={field.key}
              updateField={this.updateField}
            />
          );
        })}
        <AddField addField={this.updateField} />
      </div>
    );
  }
}

CreateForm.propTypes = {
  formFields: PropTypes.array.isRequired,
  updateData: PropTypes.func.isRequired
};

export default CreateForm;
