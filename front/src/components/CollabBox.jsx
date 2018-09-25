import React, { Component } from 'react';

import { Alert } from 'reactstrap';
import { Tag } from 're-bulma';

import moment from 'moment';

class CollabBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    }
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
    this.props.toggle();
  }

  render() {
    const { p } = this.props;
    return (
      <div className="CollabBox">
        <Alert color="light" isOpen={this.state.visible} toggle={this.onDismiss}>
          <div className="details">
            <div className="firstAndLastNames">
              {`${p.firstname} ${p.lastname}`}
            </div>
            <div className="availability">
              <p>Disponibilité : {moment(p.end_of_mission).format('YYYY-MM-DD')}</p>
            </div>
            <div className="skills">
              {p.skills.map((skill, i) => (
                <Tag key={i}
                  style={{
                    marginTop: '5px',
                    marginBottom: '5px',
                    marginRight: '5px',
                  }}>
                  {skill}
                </Tag>))
              }
            </div>
          </div>
        </Alert>
      </div>
    );
  }
}


export default CollabBox;