import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';

function ButtonAppBar(props) {
	const { history, location } = props;
	const isNotHome = location.pathname !== '/';
	return (
		<div>
			<AppBar position="static">
				<Toolbar>
					{isNotHome &&
						<IconButton onClick={history.goBack} color="inherit" aria-label="Menu">
							<BackIcon />
						</IconButton>
					}
					<Typography variant="title" color="inherit">
						Dragon Companion
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default withRouter(ButtonAppBar);
