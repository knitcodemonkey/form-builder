// from Ryan Florence's Compound Components Workshop
import React, { Component } from 'react';
import TabPanels from './TabPanels'
import TabList from './TabList'
import '../../css/tabStyles.css';

export default class Tabs extends Component {
  state = {
    activeIndex: 0
  };

  render() {
    const children = React.Children.map(this.props.children, (child, index) => {
      if (child.type === TabPanels) {
        return React.cloneElement(child, {
          activeIndex: this.state.activeIndex
        });
      } else if (child.type === TabList) {
        return React.cloneElement(child, {
          activeIndex: this.state.activeIndex,
          onActivate: activeIndex => this.setState({ activeIndex })
        });
      } else {
        return child;
      }
    });

    return <div>{children}</div>;
  }
}
