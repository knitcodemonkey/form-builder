import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormField from './createForm/FormField.js'

class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.addField = this.addField.bind(this);
    this.state = this.props;
  }

  addField(e) {
    e.preventDefault();
    const formFields = this.props.formFields.slice(0);
    console.log("create form - add field", formFields);
    
    formFields.push({question: '', type: 'bool'});
    console.log("create form - add field", formFields);

    this.setState({...formFields});
  }

  componentWillUnmount() {
    console.log("componentWillUnmount", this.state);
    //this.props.updateData(this.state.formFields);
  }

  render() {
    return (
      <div className="createForm">
        {
          this.props.formFields.map((field, index) => {
            field.key = field.type + index
            return <FormField field={field} conditions={this.props.conditions} key={field.key} updateData={this.props.updateData} />;
          })
        }
        <button value="addField" onClick={this.addField}>Add Input</button>
      </div>
    )
  }
}

CreateForm.propTypes = {
  conditions: PropTypes.object.isRequired,
  formFields: PropTypes.array.isRequired,
  updateData: PropTypes.func.isRequired
};

export default CreateForm;