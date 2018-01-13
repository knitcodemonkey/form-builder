import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../css/formFields.css'

class ConditionField extends Component {

  updateData(e) {
    console.log(e);
    this.props.updateData();
  }

  render() {
    const conditionOptions = [
      {
        value: "equals",
        label: "Equals"
      },
      {
        value: "notequals",
        label: "Not Equals"
      },
    ];
    if (this.props.parentFieldType !== "bool") {
      conditionOptions.push({
        value: "gt",
        label: "Greater Than"
      })
      conditionOptions.push({
        value: "lt",
        label: "Less Than"
      })
    }

    return (
      <div className="conditional">
        <label htmlFor={"conditional_" + this.props.fieldKey}>Condition</label>
        <select 
          className="condition" 
          id={"conditional_" + this.props.fieldKey} 
          value={this.props.condition} 
          onChange={this.updateData(this)}>
        {
          conditionOptions.map((option) => {
            return <option value={option.value} key={"conditional_" + this.props.fieldKey + option.value}>{option.label}</option>
          })
        }
        </select>
        {
          this.props.parentFieldType === "bool" ? (
            <select className="conditionValue" defaultValue={this.props.conditionValue}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          ) : (
            <input className="conditionValue" type="text" defaultValue={this.props.conditionValue} />
          )          
        }
      </div>
    );
  }
}

ConditionField.propTypes = {
  fieldKey: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
  conditionValue: PropTypes.string.isRequired,
  parentFieldType: PropTypes.string,
  updateData: PropTypes.func.isRequired
};

export default ConditionField;