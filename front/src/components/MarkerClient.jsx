import React, { Component } from 'react';

import { Icon } from 're-bulma';

class MarkerClient extends Component {
  constructor(args) {
    super(args);
    this.state = {
      hover: false,
    };
  }

  onMouseEnterHandler() {
    this.setState({ hover: true });
  }

  onMouseLeaveHandler() {
    this.setState({ hover: false });
  }

  render() {
    return (
      <div>
        <Icon
          color={'isDanger'}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            transform: 'translate(-50%, -100%)',
            zIndex: this.state.hover ? 100 : 0,
            opacity: this.state.hover ? 1 : 0.8,
            border: '1px',
            borderColor: 'red',
          }}
          icon="fa fa-map-marker" size="isLarge" />
      </div>
    );
  }
}

export default MarkerClient;