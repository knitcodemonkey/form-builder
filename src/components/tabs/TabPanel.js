// from Ryan Florence's Compound Components Workshop
import React, { Component } from 'react';

export default class TabPanel extends Component {
  render() {
    return <div className="panel">{this.props.children}</div>;
  }
}
