import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormField from './createForm/FormField.js'

class CreateForm extends Component {
  render() {
    return (
      <div className="createForm">
        {
          this.props.formFields.map((field, index) => {
            field.key = field.type + index
            return <FormField field={field} key={field.key} updateData={this.props.updateData} />;
          })
        }
        <button value="addField">Add Input</button>
      </div>
    )
  }
}

CreateForm.propTypes = {
  formFields: PropTypes.array.isRequired,
  updateData: PropTypes.func.isRequired
};

export default CreateForm;