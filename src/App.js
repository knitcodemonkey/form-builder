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
import FormatFlatToTree from "./library/treeFlatMapper/formatFlatToTree";
import FormatTreeToFlat from "./library/treeFlatMapper/formatTreeToFlat";

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
        newState = { formFields: new FormatFlatToTree(newState.formFields) };
      }
      this.setState(newState);
    } else {
      // easy pre-population of some fields while coding/testing
      if (window.location.href.includes("prepopulate=true")) {
        // create a tree from a flat relational REST API return
        const tree = new FormatFlatToTree(prePopulateParams);
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

  updateData(formFields) {
    // save state in tree form
    this.setState({ formFields: formFields });

    // reset this.flat so that we don't end up pushing onto a pre-existing list
    // flatten tree for output to exportJSON or to Rest API
    const flat = new FormatTreeToFlat(JSON.parse(JSON.stringify(formFields)));

    // save to localStorage in flat form
    localStorage.setItem("formBuilder", JSON.stringify({ formFields: flat }));
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
