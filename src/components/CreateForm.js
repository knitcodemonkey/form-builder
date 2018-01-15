import React, { Component } from "react";
import PropTypes from "prop-types";
import FormField from "./createForm/FormField.js";
import AddField from "./createForm/AddField";

class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.addField = this.addField.bind(this);
    this.deleteField = this.deleteField.bind(this);
    this.updateField = this.updateField.bind(this);
    this.state = {
      formFields: this.props.formFields
    };
  }

  addField() {
    const formFields = this.props.formFields.slice(0);
    formFields.push({ question: "", type: "bool", id: formFields.length });

    this.props.updateField(formFields);
    this.setState({ formFields });
  }

  deleteField(fieldId) {
    const fieldMap = fieldId.toString().split("_");
    let currField = this.state.formFields.slice();
    if (fieldMap.length > 1) {
      let old = currField[fieldMap[0]];
      fieldMap.map((val, idx) => {
        if (idx > 0 && idx + 1 !== fieldMap.length) {
          old = old.subFields[val];
        }
        if (idx + 1 === fieldMap.length) {
          old = old.subFields.splice(val, 1);
        }
        return true;
      });
    } else {
      currField.splice(fieldMap[0], 1);
    }
    this.props.updateData(currField);
    this.setState({ formFields: currField });
  }

  updateField(field) {
    console.log(this.state.formFields);
    const fieldMap = field.id.toString().split("_");
    let currField = this.state.formFields.slice();
    if (fieldMap.length === 1) {
      // initial methods need to be handled directly
      currField[fieldMap[0]] = field;
    } else {
      // these are all in subFields
      let old = currField[fieldMap[0]]; // updating one, updates both
      fieldMap.map((val, idx) => {
        if (idx > 0) {
          // map to deeper form field inside `subFields`
          old = old.subFields[val];
        }
        return true;
      });
      old = field;
    }
    this.props.updateData(currField);
    this.setState({ formFields: currField });
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
              deleteField={this.deleteField}
            />
          );
        })}
        <AddField addField={this.addField} />
      </div>
    );
  }
}

CreateForm.propTypes = {
  formFields: PropTypes.array.isRequired
};

export default CreateForm;
