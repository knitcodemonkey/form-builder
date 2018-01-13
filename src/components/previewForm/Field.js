import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../css/formFields.css'
import '../../css/previewFields.css'

class Field extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question : ''
    }
  }

  render() {
    let field = this.props.field;
    console.log(field.key + " styles: " + this.props.styles);
    return (
      <div className="formField">
        <div className="question">
          <label htmlFor={field.key + "_input"}>{field.question}</label>
          {
            field.type === 'bool' ? (
              <div className="radioFields">
                <div className="radio">
                  <input type="radio" id={field.key + "_Yes"} name={field.key + "_question"} value="Yes" onChange={() => this.setState({question: this.value})} /> <label htmlFor={field.key + "_Yes"}>Yes</label>
                </div>
                <div className="radio">
                  <input type="radio" id={field.key + "_No"} name={field.key + "_question"} value="No" onChange={() => this.setState({question: this.value})} /> <label htmlFor={field.key + "_No"}>No</label>
                </div>
              </div>
            ) : (
              <input id={field.key + "_input"} type="text" onChange={() => this.setState({question: this.value})} />
            )
          }
        </div>
      </div>
    );
  }
}

Field.propTypes = {
  field: PropTypes.object.isRequired,
  styles: PropTypes.object
};

export default Field;