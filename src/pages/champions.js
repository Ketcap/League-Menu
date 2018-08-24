import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withContext } from "../context";
import { splashImages } from "../config.json";

import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Expand from '@material-ui/icons/ExpandMore';

import Loading from "../components/loading";

const styles = () => ({
	loadingContainer: {
		width: "100%",
		height: "100%",
		display: "flex"
	},
	progress: {
		margin: "auto"
	},
	gridList: {
		margin: 0
	},
	red: {
		color: "#F44336"
	},
	loadMore: {
		margin: '1em auto',
		display: 'flex'
	},
	link: {
		textDecoration: 'none',
		color: '#fff'
	}
});

class Champions extends Component {
	state = {
		number: 10
	}
	loadeMore = () => {
		this.setState(prev => ({
			number: prev.number + 10
		}))
	}
	toggle = championId => () => {
		const { toggleFavorite } = this.props.context;
		toggleFavorite(championId);
	};
	render() {
		const { classes } = this.props;
		const { champions, favorites } = this.props.context;
		if (Object.keys(champions) < 1) {
			return (
				<div className={classes.loadingContainer}>
					<Loading className={classes.progress} />
				</div>
			);
		}
		const { number } = this.state;
		return (
			<div>
				<GridList cellHeight={160} style={{ margin: 0 }} cols={2}>
					{Object.keys(champions).splice(0, number).map(e => {
						const champion = champions[e];
						return (
							<GridListTile style={{ padding: 0 }} key={champion.id} cols={1}>
								<img
									src={splashImages + champion.id + "_0.jpg"}
									alt={champion.name}
								/>
								<GridListTileBar
									actionPosition={'left'}
									title={
										<Link className={classes.link} to={`/champion/${champion.id}`}>
											{champion.name}
										</Link>
									}
									actionIcon={
										<IconButton
											className={classes.red}
											onClick={this.toggle(champion.id)}
										>
											{favorites.indexOf(champion.id) > -1 ? (
												<Favorite />
											) : (
													<FavoriteBorder />
												)}
										</IconButton>
									}
								/>
							</GridListTile>
						);
					})}
				</GridList>
				<Button onClick={this.loadeMore} className={classes.loadMore} variant="contained" color="default" >
					<Expand style={{ marginRight: '.3em' }} />
					Load More
      </Button>
			</div>
		);
	}
}

export default withContext(withStyles(styles)(Champions));
