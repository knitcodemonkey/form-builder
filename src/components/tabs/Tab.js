// from Ryan Florence's Compound Components Workshop
import React, { Component } from 'react';

class Tab extends Component {
  render() {
    return (
      <button
        disabled={this.props.isDisabled}
        onClick={this.props.onClick}
        className={
          this.props.isDisabled
            ? "tab disabledTab"
            : this.props.isActive ? "tab activeTab" : "tab"
        }
      >
        {this.props.children}
      </button>
    );
  }
}

export default Tab;
