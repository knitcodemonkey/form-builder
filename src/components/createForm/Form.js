import React, { Component } from "react";
import PropTypes from "prop-types";
import AddField from "./AddField.js";
import "../../css/formFields.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.updateFormField = this.updateFormField.bind(this);
    this.state = this.props;
  }

  // updateFormField(e) {
  //   console.log(e);
  //   let newState = Object.assign({},this.state);
  //   const param = e.target.id.split("_");

  //   newState[param[0]] = e.target.value;
  //   this.setState(newState, this.props.updateData(this.state));
  // }

  // renderSubFields() {
  //   if (this.props.field.subField) {
  //     return this.props.field.subField.map((currSubField, index) => {
  //       currSubField.key = this.props.field.key + "_subField" + index;
  //       return <FormField
  //               field={currSubField}
  //               key={currSubField.key}
  //               isSubField={true}
  //               parentFieldType={this.props.field.type}
  //               conditions={this.props.conditions}
  //               updateData={this.updateFormField}
  //               />
  //     })
  //   }
  // }

  render() {
    let field = this.props.field;
    return (
      <div className="formSection">
        <FormField
          field={field}
          key={field.id}
          parentid={field.parentid || false}
          parentFieldType={this.props.field.type}
          conditions={this.props.conditions}
          updateData={this.updateFormField}
        />
        {/* this.renderSubFields() */}
      </div>
    );
  }
}

FormField.propTypes = {
  conditions: PropTypes.object.isRequired,
  field: PropTypes.array.isRequired,
  parentid: PropTypes.string,
  parentFieldType: PropTypes.string,
  updateData: PropTypes.func.isRequired,
  addField: PropTypes.func.isRequired
};

export default FormField;
