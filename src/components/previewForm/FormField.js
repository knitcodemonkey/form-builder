import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../css/formFields.css'
import '../../css/previewFields.css'
import Field from './Field'

class FormField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question : ''
    }
  }

  renderSubFields() {
    let subFields = "";
    if (this.props.field.subField) {
      subFields = this.props.field.subField.map((currSubField, index) => {
        currSubField.key = this.props.field.key + "_subField" + index;

        console.log(
          "Condition Required: " + currSubField.condition, 
          "Answer on form: " + this.state.question, 
          "Answer this field requires: " + currSubField.conditionValue, 
          "Do they fulfill the condition? " + this.state.question === currSubField.conditionValue
        );
        let styles = {
          display: 'none'
        }
        switch (currSubField.condition) {
          case 'Equals':
            if (this.state.question === currSubField.conditionValue) {
              styles = {
                display: 'block'
              }
            }
            break;
          case 'Greater Than': 
            if (this.state.question > currSubField.conditionValue) {
              styles = {
                display: 'block'
              }
            }
            break;
          case 'Less Than': 
            if (this.state.question < currSubField.conditionValue) {
              styles = {
                display: 'block'
              }
            }
            break;
          default: styles = {
            display: 'none'
          }
        }

        console.log(styles);

        return <FormField 
          field={currSubField} 
          key={currSubField.key} 
          styles={styles}
          />
      })
      return subFields;
    }
  }

  render() {
    let field = this.props.field;
    console.log(field.key + " styles: " + this.props.styles);
    return (
      <div className="formSection" style={this.props.styles || {display: 'block'}}>
        <Field field={this.props.field} />
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