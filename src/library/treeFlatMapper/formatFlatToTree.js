class FormatFlatToTree {
  constructor(fields) {
    return this.buildFlatToTree(fields);
  }

  /**
   * Convert a flat array of objects to a tree
   * @param {object} fields - array of question objects
   * @return {object} - array of question objects in a tree format
   */
  buildFlatToTree(fields) {
    let fieldsToUnset = [];
    let parentPositionId = 0;
    let parents = fields
      .map((parent, idx) => {
        if (typeof parent.parentId === "undefined") {
          // tells us which fields are known parents
          fieldsToUnset.unshift(idx);
          parent.positionId = parentPositionId++;
          return parent;
        }
        return false;
      })
      .filter(function(parent) {
        // filter out the array items set to a value of `{false}`
        return parent !== false;
      });

    // Removes known parents from fieldList, which we pass to buildTree.
    // We don't need to cycle through items we've already identified and placed.
    // eslint-disable-next-line
    const fieldList = fields.filter(function(field, idx) {
      if (fieldsToUnset.indexOf(idx) === -1) {
        return field;
      }
    });
    // Gimme the tree format of our questions!
    return this.buildTree(parents, fieldList);
  }

  /**
   * Children will be, recursively, added to a "subFields" array within the parent object
   *
   * @param {array} parents - array of parent objects with `id` and `positionId`
   * @param {object} fieldList - array of children objects with `id`, `parentId` and `positionId`
   *
   * Example: parent['subFields'] = children objects
   * @returns {array} - array of objects. children nested within parent] arrays.
   *
   */
  buildTree(parents, fieldList) {
    let childFieldsToUnset = [];
    // Build tree using parents as the top level
    const tree = parents.map((parent, parentIdx) => {
      //Map through each parent to setup subFields
      let childPositionId = 0;
      parent["subFields"] = fieldList
        .map((child, childIdx) => {
          //map through each fieldList item to find children that have a matching parentId
          if (child.parentId === parent.id) {
            // assign a positionId for ease of mapping
            child.positionId = parent.positionId + "_" + childPositionId++;
            // which children do we need to remove from the master list?
            childFieldsToUnset.unshift(childIdx);
            return child;
          }
          // return a false for children we didn't match so we can
          // easily remove them in the filter method below.
          return false;
        })
        .filter(function(child) {
          // remove children with a value of {false}
          return child !== false;
        });

      if (parent.subFields.length === 0) {
        // if we didn't find any children, let's delete the reference.
        delete parent.subFields;
      } else {
        // remove known children from the fieldList
        // We don't need to keep cycling through items we've already identified and placed.
        // eslint-disable-next-line
        const childFieldList = fieldList.filter(function(field, idx) {
          if (childFieldsToUnset.indexOf(idx) === -1) {
            return field;
          }
        });

        // Now that we have a list of children, let's find out if they have children.
        this.buildTree(parent["subFields"], childFieldList);
      }

      // Now that we have the full tree for a parent, return the parent
      return parent;
    });

    // return the whole tree
    return tree;
  }
}

export default FormatFlatToTree;
