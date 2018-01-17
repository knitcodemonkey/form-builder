import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../css/formFields.css";
import "../../css/previewFields.css";

class FormField extends Component {
  constructor(props) {
    super(props);
    this.updateFormField = this.updateFormField.bind(this);
    this.state = {
      answer: ""
    };
  }

  updateFormField(e) {
    // get the current state of the field
    const formField = Object.assign({}, this.state.formField);

    // find out which input is changing in the field
    const inputName = e.target.id.split("_")[0];

    // Update the input in our state clone
    formField[inputName] = e.target.value;

    // update component state so the field functions as expected
    this.setState({ formField });
    this.forceUpdate();
  }

  /**
   * Render the subfields recursively
   */
  renderSubFields() {
    const field = this.props.field;

    // only render if we have subfields;
    if (!field.subFields) {
      return;
    }

    // Only render the subFields we want, based on condition matching
    let subFields = [];
    subFields = field.subFields.map((currSubField, index) => {
      currSubField.key = field.key + "_subField" + index;
      /**
       * Apply show/hide styles based on answer
       */
      let showField = false;

      if (
        this.state.answer.trim() === "" &&
        currSubField.conditionValue.trim() === ""
      ) {
        return false;
      }

      // Check to see if the answer qualifies for this subField
      switch (currSubField.condition) {
        case "Equals":
          if (this.state.answer === currSubField.conditionValue) {
            showField = true;
          }
          break;
        case "Greater Than":
          if (this.state.answer > currSubField.conditionValue) {
            showField = true;
          }
          break;
        case "Less Than":
          if (this.state.answer < currSubField.conditionValue) {
            showField = true;
          }
          break;
        default:
          showField = false;
      }

      if (showField === true) {
        return <FormField field={currSubField} key={currSubField.key} />;
      } else {
        return false;
      }
    });
    return subFields;
  }

  render() {
    let field = this.props.field;
    return (
      <div className="formSection">
        <div className="formField">
          <div className="question">
            <label htmlFor={field.key + "_input"}>{field.question}</label>
            {// if bool, load radios. if not, load input
            field.type === "bool" ? (
              <div className="radioFields">
                <div className="radio">
                  <input
                    type="radio"
                    id={field.key + "_Yes"}
                    name={field.key + "_question"}
                    value="Yes"
                    onChange={e => this.setState({ answer: e.target.value })}
                  />
                  <label htmlFor={field.key + "_Yes"}>Yes</label>
                </div>
                <div className="radio">
                  <input
                    type="radio"
                    id={field.key + "_No"}
                    name={field.key + "_question"}
                    value="No"
                    onChange={e => this.setState({ answer: e.target.value })}
                  />
                  <label htmlFor={field.key + "_No"}>No</label>
                </div>
              </div>
            ) : (
              <input
                id={field.key + "_input"}
                type="text"
                onChange={e => this.setState({ answer: e.target.value })}
              />
            )}
          </div>
        </div>
        {this.renderSubFields()}
      </div>
    );
  }
}

FormField.propTypes = {
  field: PropTypes.object.isRequired,
  styles: PropTypes.object
};

export default FormField;
