import React, { Component } from "react";
import CreateForm from "./components/CreateForm";
import PreviewForm from "./components/PreviewForm";
import ExportJSON from "./components/ExportJSON";
import "./css/styles.css";

import TabList from "./components/tabs/TabList";
import Tabs from "./components/tabs/Tabs";
import Tab from "./components/tabs/Tab";
import TabPanels from "./components/tabs/TabPanels";
import TabPanel from "./components/tabs/TabPanel";
import prePopulateParams from "./library/prePopulateParams";

class App extends Component {
  state = {
    formFields: []
  };

  flat = [];

  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
  }

  /**
   * When component mounts, get data from local storage, if exists,
   * format it into a tree, and save it to state.
   */
  componentWillMount() {
    // Get data from local storage
    const storedState = localStorage.getItem("formBuilder");
    if (storedState) {
      let newState = JSON.parse(storedState);
      if (storedState.includes("subFields") === false) {
        newState = { formFields: this.formatFlatToTree(newState.formFields) };
      }
      this.setState(newState);
    } else {
      // easy pre-population of some fields while coding/testing
      if (window.location.href.includes("prepopulate=true")) {
        // create a tree from a flat relational REST API return
        const tree = this.formatFlatToTree(prePopulateParams);
        // set this new tree format as the state
        this.setState({
          formFields: tree
        });
        // populate the local storage
        localStorage.setItem(
          "formBuilder",
          JSON.stringify({
            formFields: tree
          })
        );
      }
    }
  }

  /**
   * Convert a flat array of objects to a tree
   * @param {object} fields - array of question objects
   * @return {object} - array of question objects in a tree format
   */
  formatFlatToTree(fields) {
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
            // reduces the list as we progress
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

      // if we didn't find any children, let's delete the array.
      if (parent.subFields.length === 0) {
        delete parent.subFields;
      } else {
        // remove known children from the list
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

  /**
   * Convert a tree array of objects to a flat array of objects
   * Updates the scoped this.flat array
   * @param {object} fields
   */
  formatTreeToFlat(fields) {
    this.flat = [];
    fields.map(field => {
      console.log(field.id);
      if (field.subFields) {
        console.log(field.id, field.subFields);
        this.formatTreeToFlat(field.subFields);
        delete field.subFields;
      }
      this.flat.push(field);
      return true;
    });
  }

  updateData(formFields) {
    const dontMessWithState = formFields.slice();

    // save state in tree form
    console.log(formFields);
    this.setState({ formFields: formFields });

    // save to localStorage in flat form
    this.formatTreeToFlat(dontMessWithState);
    // localStorage.setItem(
    //   "formBuilder",
    //   JSON.stringify({ formFields: this.flat })
    // );
  }

  render() {
    return (
      <div>
        <h1>Form Builder</h1>
        <Tabs>
          <TabList>
            <Tab>Create</Tab>
            <Tab>Preview</Tab>
            <Tab>Export</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <CreateForm
                formFields={this.state.formFields}
                updateData={this.updateData}
              />
            </TabPanel>
            <TabPanel>
              <PreviewForm formFields={this.state.formFields} />
            </TabPanel>
            <TabPanel>
              <ExportJSON formFields={this.state.formFields} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    );
  }
}

export default App;
