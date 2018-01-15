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
    formFields: []
  };

  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
  }

  componentWillMount() {
    const storedState = localStorage.getItem("formBuilder");
    if (storedState) {
      this.setState(JSON.parse(storedState));
      return;
    }
  }

  updateData(formFields) {
    localStorage.setItem(
      "formBuilder",
      JSON.stringify({ formFields: formFields })
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
