// from Ryan Florences Compound Components Workshop
import React, { Component } from 'react';

export default class TabList extends Component {
  render() {
    const children = React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        isActive: index === this.props.activeIndex,
        onClick: () => this.props.onActivate(index)
      });
    });

    return <div className="tabs">{children}</div>;
  }
}
