import React from "react";
import PropTypes from "prop-types";
import FormField from "./previewForm/PreviewFormField";
import "../css/previewFields.css";

const PreviewForm = (props: { formFields: Array }) => (
  <div className="PreviewForm">
    {props.formFields.map((field, index) => {
      field.key = field.type + index;
      return <FormField field={field} key={field.key} />;
    })}
  </div>
);

PreviewForm.propTypes = {
  formFields: PropTypes.array.isRequired
};

export default PreviewForm;
