import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../css/formFields.css'

class FormField extends Component {
  constructor(props) {
    super(props);
    this.updateFormField = this.updateFormField.bind(this);
    this.state = this.props;
  }

  updateFormField(e) {
    console.log(e);
    let newState = Object.assign({},this.state);
    const param = e.target.id.split("_");

    newState[param[0]] = e.target.value;
    this.setState(newState);
  }

  componentWillUnmount() {
    this.props.updateData(this.state);
  }

  renderSubFields() {
    if (this.props.field.subField) {
      return this.props.field.subField.map((currSubField, index) => {
        currSubField.key = this.props.field.key + "_subField" + index;
        return <FormField 
                field={currSubField} 
                key={currSubField.key} 
                isSubField={true} 
                parentFieldType={this.props.field.type}
                conditions={this.props.conditions}
                updateData={this.updateFormField}
                />
      })
    }
  }

  render() {
    let field = this.props.field;
    return (
      <div className="formSection">
        <div className="formField">
          {
            field.condition ? (
              <div className="conditional">
                <label htmlFor={"condition_" + field.fieldKey}>Condition</label>
                <select 
                  className="condition" 
                  id={"condition_" + field.fieldKey} 
                  value={field.condition} 
                  onChange={this.updateFormField}>
                {
                  this.props.conditions[this.props.parentFieldType].map((option) => {
                    return <option 
                      value={option} 
                      key={"condition_" + field.fieldKey + option}
                      onChange={this.updateFormField}
                      >{option}</option>
                  })
                }
                </select>
                {
                  field.type === "bool" ? (
                    <select className="conditionValue" id={"conditionValue_" + field.fieldKey}  value={field.conditionValue} onChange={this.updateFormField}>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  ) : (
                    <input className="conditionValue" id={"conditionValue_" + field.fieldKey} type="text" value={field.conditionValue} onChange={this.updateFormField} />
                  )          
                }
              </div>
            ) : (
              ""
            )
          }

          <div className="question">
            <label htmlFor={"question_" + field.key}>Question</label>
            <input id={"question_" + field.key} type="text" value={field.question} onChange={this.updateFormField} />
          </div>
          <div className="questionType">
            <label htmlFor={"type_" + field.key}>Type</label>
            <select id={"type_" + field.key} value={field.type} onChange={this.updateFormField}>
              <option value="bool">Yes / No</option>
              <option value="text">Text</option>
              <option value="number">Number</option>
            </select>
          </div>

          <div className="actions">
            <button value="sub-input">Sub-Input</button>
            <button value="delete">Delete</button>
          </div>
        </div>
        {this.renderSubFields()}
      </div>
    );
  }
}

FormField.propTypes = {
  conditions: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
  isSubField: PropTypes.bool,
  parentFieldType: PropTypes.string,
  updateData: PropTypes.func.isRequired
};

export default FormField;