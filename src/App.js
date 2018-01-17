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

class App extends Component {
  state = {
    formFields: [
      {
        id: 1,
        question: "Do you have a car?",
        type: "bool"
      },
      {
        id: 2,
        question: "Do you have children?",
        type: "bool"
      },
      {
        id: 3,
        parentId: 1,
        condition: 'Equals',
        conditionValue: 'Yes',
        question: "Do you ride the bus?",
        type: "bool"
      },
      {
        id: 4,
        parentId: 2,
        condition: 'Equals',
        conditionValue: 'Yes',
        question: "How many children do you have?",
        type: "number"
      },
      {
        id: 5,
        parentId: 4,
        condition: 'Greater Than',
        conditionValue: 1,
        question: "Do your children live with you?",
        type: "bool"
      },
      {
        id: 6,
        parentId: 4,
        condition: 'Equals',
        conditionValue: 1,
        question: "Does your child live with you?",
        type: "bool"
      },
      {
        id: 7,
        parentId: 3,
        condition: 'Equals',
        conditionValue: "Yes",
        question: "How many times, per week, do you ride the bus?",
        type: "number"
      }
    ]
  };

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
      this.setState(formatFlatToTree(JSON.parse(storedState)));
      return;
    }
  }

  /**
   * Convert a flat array of objects to a tree
   * @param {object} fields - array of question objects
   * @return {object} - array of question objects in a tree format
   */
  formatFlatToTree(fields) {
    let fieldList = fields.slice();
    let parents = fields.map((parent, idx) => {
      if (typeof parent.parentId === 'undefined') {
        parent.positionId = idx;
        fieldList.splice(idx, 1);
        return parent;
      }
    }); 

    return buildTree(parents, fieldList);
  }

  buildTree(parents, fieldList) {
    let tree = parents.map((parent) => {
      let children = fieldList.map((child, childIdx) => {
        if(child.parentId === parent.id) {
          child.positionId = parent.positionId + "_" + childIdx;
          if(parent.subFields) {
            parent.subFields.push(child);
          } else {
            parent['subFields'] = child;
          }
          fieldsCopy.splice(childIdx, 1);
        }
        return child;
      });
      buildTree(children, fieldList);
      return parent;
    });
    return tree;
  }

  /**
   * Convert a tree array of objects to a flat array of objects
   * @param {object} fields
   * @return {object}
   */
  formatTreeToFlat(fields) {
    return fields;
  }

  updateData(formFields) {
    localStorage.setItem(
      "formBuilder",
      JSON.stringify({ formFields: formatTreeToFlat(formFields)});
    );
    this.setState({ formFields: formFields });
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
