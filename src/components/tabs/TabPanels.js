// from Ryan Florence's Compound Components Workshop

import React, { Component } from 'react';

export default class TabPanels extends Component {
  render() {
    return (
      <div className="tabPanels">
        {this.props.children[this.props.activeIndex]}
      </div>
    );
  }
}
