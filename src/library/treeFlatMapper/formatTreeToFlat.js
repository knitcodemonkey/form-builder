class FormatTreeToFlat {
  flat = [];

  constructor(fields) {
    this.flat = [];
    this.flattenTree(fields);
    return this.flat;
  }
  /**
   * Convert a tree array of objects to a flat array of objects
   * Updates the scoped this.flat array
   * @param {object} fields
   */
  flattenTree(fields) {
    fields.map(field => {
      console.log(field.id);
      if (field.subFields) {
        console.log(field.id, field.subFields);
        this.flattenTree(field.subFields);
        delete field.subFields;
      }
      this.flat.push(field);
      return true;
    });
  }
}

export default FormatTreeToFlat;
