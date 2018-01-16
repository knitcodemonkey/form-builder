import React, { Component } from "react";
import PropTypes from "prop-types";
import "../css/exportJSONStyles.css";

class ExportJSON extends Component {
  render() {
    return <textarea defaultValue={JSON.stringify(this.props)} />;
  }
}

ExportJSON.propTypes = {
  formFields: PropTypes.array.isRequired
};

export default ExportJSON;
