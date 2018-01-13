import React, { Component } from 'react';
import TabList from "./components/tabs/TabList";
import Tabs from "./components/tabs/Tabs";
import Tab from "./components/tabs/Tab";
import TabPanels from "./components/tabs/TabPanels";
import TabPanel from "./components/tabs/TabPanel";
import CreateForm from "./components/CreateForm";
import PreviewForm from "./components/PreviewForm";
import ExportJSON from "./components/ExportJSON";
import './css/styles.css';

class App extends Component {
  state = {
    formFields: [
      {
        question: "Do you own a car?",
        type: "bool",
        subField: [
          {
            condition: "equals",
            conditionValue: "yes",
            question: "What is your car's Model?",
            type: "text",
            subField: [
              {
                condition: "equals",
                conditionValue: "yes",
                question: "What is your car's Model?",
                type: "text",

              },
              {
                condition: "equals",
                conditionValue: "yes",
                question: "What is your car's Model?",
                type: "text",

              },
            ],
          }
        ],
      },
      {
        question: "Do you own a car?",
        type: "bool",
      }
    ]
  }
  
  updateData(formFields) {
    this.setState(formFields);
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
                updateData={this.updateData()}
              />
            </TabPanel>
            <TabPanel>
              <PreviewForm
                data={this.state}
              />
            </TabPanel>
            <TabPanel>
              <ExportJSON
                data={this.state}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    );
  }
}

export default App;
