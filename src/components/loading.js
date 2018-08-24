import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loading(props) {
	return (
		<CircularProgress size={50} {...props} />
	);
}