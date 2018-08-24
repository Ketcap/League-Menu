import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import Gamepad from '@material-ui/icons/Gamepad';
import Favorite from '@material-ui/icons/Favorite';
import Search from '@material-ui/icons/Search';

const styles = {
	root: {
		position: 'fixed',
		bottom: 0,
		left: 0,
		right: 0,
		zIndex:100
	}
};

class Navbar extends React.Component {
	state = {
		value: 0,
	};

	handleChange = (event, value) => { this.setState({ value }) };

	render() {
		const { classes } = this.props;
		const { value } = this.state;

		return (
			<BottomNavigation
				value={value}
				onChange={this.handleChange}
				showLabels
				className={classes.root}
			>
				<BottomNavigationAction label="Champions" icon={<Gamepad />} component={Link} to={'/'} />
				<BottomNavigationAction label="Search" icon={<Search />} component={Link} to={'/search'}  />
			</BottomNavigation>
		);
	}
}

export default withStyles(styles)(Navbar);