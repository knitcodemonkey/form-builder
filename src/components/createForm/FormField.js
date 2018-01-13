import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ConditionField from './ConditionField';
import '../../css/formFields.css'

class FormField extends Component {
  renderSubFields() {
    if (this.props.field.subField) {
      console.log(this.props.field.subField.length);
      return this.props.field.subField.map((currSubField, index) => {
        currSubField.key = this.props.field.key + "_subField" + index;
        return <FormField 
                field={currSubField} 
                key={currSubField.key} 
                isSubField={true} 
                parentFieldType={this.props.field.type}
                updateData={this.updateData()} />
      })
    }
  }

  updateData() {
    this.props.updateData();
  }

  render() {
    return (
      <div className="formSection">
        <div className="formField">
          {
            this.props.field.condition ? (
              <ConditionField 
                condition={this.props.field.condition}
                conditionValue={this.props.field.conditionValue} 
                parentFieldType={this.props.field.type} 
                fieldKey={this.props.field.key}
                updateData={this.updateData()} />
            ) : (
              ""
            )
          }

          <div className="question">
            <label htmlFor={"question_" + this.props.field.key}>Question</label>
            <input id={"question_" + this.props.field.key} type="text" defaultValue={this.props.field.question}/>
          </div>
          <div className="questionType">
            <label htmlFor={"questionType_" + this.props.field.key}>Type</label>
            <select id={"questionType_" + this.props.field.key} defaultValue={this.props.field.type}>
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
  field: PropTypes.object.isRequired,
  isSubField: PropTypes.bool,
  parentFieldType: PropTypes.string,
  updateData: PropTypes.func.isRequired
};

export default FormField;