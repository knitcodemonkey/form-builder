import React, { Component } from "react";
import PropTypes from "prop-types";
import "./exportJSON/exportJSONStyles.css";
import FormatTreeToFlat from "../library/treeFlatMapper/formatTreeToFlat";

class ExportJSON extends Component {
  render() {
    const formFieldsDeepClone = JSON.parse(
      JSON.stringify(this.props.formFields)
    );
    const flat = new FormatTreeToFlat(formFieldsDeepClone);
    return (
      <div className="exportJSON">
        <p>
          I have set up this form builder to accept data from multiple types of
          sources:
        </p>
        <ul>
          <li>
            A schema-less database with a tree layout - relies on children being
            assigned to "subFields" within item object, but that could be
            modified in real applications
          </li>
          <li>A relational database returning an array of objects</li>
          <li>
            A separate file returning a json string in either a tree or flat
            configuration. This is triggered by adding clearing localStorage and
            appending
            <a href="/?prePopulateParams=true">?prePopulateParams=true</a> to
            your url.
          </li>
        </ul>
        <p>
          The two textareas below, and the contents of the json file
          ('./src/library/prePopulateParams.js'), can all be copy/pasted into
          localStorage with a key of 'formBuilder' to duplicate the form.
        </p>
        <hr />
        <label htmlFor="exportState">App State (tree format)</label>
        <textarea
          id="exportState"
          defaultValue={JSON.stringify(this.props.formFields)}
        />

        <label htmlFor="exportState">
          localStorage/REST Output (flat format)
        </label>
        <textarea id="exportState" defaultValue={JSON.stringify(flat)} />
      </div>
    );
  }
}

ExportJSON.propTypes = {
  formFields: PropTypes.array.isRequired
};

export default ExportJSON;
