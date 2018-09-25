import React, { Component } from 'react';
import CollabBox from '../components/CollabBox';
import { connect } from 'react-redux';

import { Icon, Tag } from 're-bulma';

class MarkerPeople extends Component {
	constructor(args) {
		super(args);
		this.state = {
			hover: false,
			clicked: false,
		};
		this.onClickToggleBox = this.onClickToggleBox.bind(this);
	}

	onMouseEnterHandler() {
		this.setState({ hover: true });
	}

	onMouseLeaveHandler() {
		this.setState({ hover: false });
	}

	onClickToggleBox() {
		this.setState({
			clicked: !this.state.clicked,
		})
	}

	render() {
		const { icon, click, color, active, p, selectedCollab } = this.props;
		return (
			<div className="MarkerPeople">
				<Tag color={color} onClick={() => { click(); this.onClickToggleBox() }} className="Tag"
					style={{
						cursor: 'pointer',
						zIndex: this.state.hover ? 2 : 0,
						opacity: this.state.hover ? 1 : 0.8,
						border: '1px',
						borderColor: 'black',
					}}
					onMouseLeave={this.onMouseLeaveHandler.bind(this)}
					onMouseEnter={this.onMouseEnterHandler.bind(this)}
				>
					{!this.state.hover ?
						(
							<div style={{ color: active ? 'white' : 'black', cursor: 'pointer' }}>
								<Icon icon={`fa fa-${icon}`} />
							</div>
						) : (
							<div style={{ zIndex: this.state.hover ? 2 : 0 }}>
								<strong>
									{`${p.firstname} ${p.lastname}`}
								</strong>
							</div>
						)}
				</Tag>
				{this.state.clicked && selectedCollab.length === 1 ?
					<CollabBox
						p={p}
						toggle={this.onClickToggleBox}
						style={{
							zIndex: 3,
							top: 10,
						}}
					/>
					: null}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		selectedCollab: state.selectedCollab,
	};
};

export default connect(mapStateToProps)(MarkerPeople);