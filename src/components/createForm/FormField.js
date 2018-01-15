import React, { Component } from "react";
import PropTypes from "prop-types";
import AddField from "./AddField";
import DeleteField from "./DeleteField";
import "../../css/formFields.css";
import { conditions } from "../../library/conditions";

class FormField extends Component {
  constructor(props) {
    super(props);
    this.updateFormField = this.updateFormField.bind(this);
    this.addField = this.addField.bind(this);
    //this.updateSubField = this.updateSubField.bind(this);
    this.state = {
      formField: this.props.field
    };
  }

  addField() {
    const currField = Object.assign({}, this.state.formField);
    // console.log(typeof currField.subFields, currField.id);
    if (typeof currField.subFields === "undefined") {
      currField["subFields"] = [];
    }

    //
    currField.subFields.push({
      id: currField.id + "_" + currField.subFields.length,
      parentId: currField.id,
      condition: "",
      conditionType: "",
      question: "",
      type: "bool"
    });

    //set new state for current component
    this.setState({ currField });

    // Hoist the new state to the parent component
    this.props.updateField(currField);
  }

  // updateSubField(field) {
  //   const fieldMap = field.id.toString().split("_");
  //   console.log(fieldMap);

  //   let currField = Object.assign({}, this.state.formField);
  //   if (fieldMap.length === 1) {
  //     // hoist the whole state
  //     this.props.updateField(field);
  //   } else {
  //     // hoist to the parent to update it's state, recursively
  //     this.updateSubField(currField);
  //     this.setState({ currField });
  //   }
  // }

  updateFormField(e) {
    // get the current state of the field
    const formField = Object.assign({}, this.state.formField);

    // find out which input is changing in the field
    const inputName = e.target.id.split("_")[0];

    // Update the input in our state clone
    formField[inputName] = e.target.value;

    // hoist the state to the parent component
    this.props.updateField(formField);

    // update component state so the field functions as expected
    this.setState({ formField });
  }

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
            isSubField={true}
            parentFieldType={this.props.field.type}
            conditions={conditions}
            updateField={this.props.updateField}
            deleteField={this.props.deleteField}
          />
        );
      });
    }
  }

  render() {
    let field = this.state.formField;
    return (
      <div className="formSection">
        <div className="formField">
          {
            // {field.condition ? (
            //   <div className="conditional">
            //     <label htmlFor={"condition_" + field.fieldKey}>Condition</label>
            //     <select
            //       className="condition"
            //       id={"condition_" + field.fieldKey}
            //       value={field.condition}
            //       onChange={this.updateFormField}
            //     >
            //       {conditions[this.props.parentFieldType].map(
            //         option => {
            //           return (
            //             <option
            //               value={option}
            //               key={"condition_" + field.fieldKey + option}
            //               onChange={this.updateFormField}
            //             >
            //               {option}
            //             </option>
            //           );
            //         }
            //       )}
            //     </select>
            //     {field.type === "bool" ? (
            //       <select
            //         className="conditionValue"
            //         id={"conditionValue_" + field.fieldKey}
            //         value={field.conditionValue}
            //         onChange={this.updateFormField}
            //       >
            //         <option value="Yes">Yes</option>
            //         <option value="No">No</option>
            //       </select>
            //     ) : (
            //       <input
            //         className="conditionValue"
            //         id={"conditionValue_" + field.fieldKey}
            //         type="text"
            //         value={field.conditionValue}
            //         onChange={this.updateFormField}
            //       />
            //     )}
            //   </div>
            // ) : (
            //   ""
            // )}
          }
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
            <AddField addField={this.addField} parentId={field.id} />
            <DeleteField deleteField={this.props.deleteField} id={field.id} />
          </div>
        </div>
        {this.renderSubFields()}
      </div>
    );
  }
}

FormField.propTypes = {
  field: PropTypes.object.isRequired,
  isSubField: PropTypes.bool,
  parentFieldType: PropTypes.string,
  updateField: PropTypes.func.isRequired,
  deleteField: PropTypes.func.isRequired
};

export default FormField;
