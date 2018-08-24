import React, { Component } from 'react';
import { withContext } from '../context';

import { withStyles } from "@material-ui/core/styles";
import Loading from '../components/loading';
import ClassChampion from '../classes/champion';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

const styles = () => ({
	loadingContainer: {
		width: "100%",
		height: "100%",
		display: "flex"
	},
	progress: {
		margin: "3em auto"
	},
	splashImage: {
		margin: 0,
		padding: 0,
		width: '100%',
	},
	header: {
		position: 'relative'
	},
	promotion: {
		display: 'flex',
		position: 'absolute',
		bottom: '4px',
		left: 0,
		right: 0,
		height: '70px',
		backgroundColor: 'rgba(0,0,0,.5)',
		justifyContent: 'left',
		alignItems: 'center',
		padding: '.3em .5em'
	},
	avatar: {
		height: 60,
		width: 60,
		marginRight: '.5em'
	},
	skillInfo: {
		padding: '.5em'
	}
})

class Champion extends Component {
	state = {
		loading: true,
		tab: 0
	}
	handleTab = (event, tab) => {
		this.setState({ tab });
	};
	async componentDidMount() {
		const { championId } = this.props.match.params;
		const { getChampion } = this.props.context;
		let champion = await getChampion(championId);
		setTimeout(() => {
			champion = new ClassChampion(champion);
			console.log(champion)
			this.setState({ champion, loading: false })
			console.log(champion.get_spells())
		})
	}
	render() {
		const { loading } = this.state;
		const { classes } = this.props;
		if (loading) {
			return (
				<div className={classes.loadingContainer}>
					<Loading className={classes.progress} />
				</div>
			)
		}
		const { champion, tab } = this.state;
		const spells = champion.get_spells();
		return (
			<div>
				<div className={classes.header}>
					<img className={classes.splashImage} src={champion.get_image()} />
					<div className={classes.promotion}>
						<Avatar className={classes.avatar} src={champion.heroIcon()} />
						<div>
							<Typography style={{ color: '#fff' }} variant="title" gutterBottom>
								{champion.name}
							</Typography>
							<Typography style={{ color: '#fff' }} variant="subheading" gutterBottom>
								{champion.title}
							</Typography>
						</div>
					</div>
				</div>
				<Paper elevation={2}>
					<Tabs
						value={tab}
						onChange={this.handleTab}
						indicatorColor="primary"
						textColor="primary"
						fullWidth
						centered
					>
						{spells.map(spell => (
							<Tab key={spell.name} icon={<img width='36' height='36' src={spell.image} />} />
						))}
					</Tabs>
				</Paper>
				<div className={classes.skillInfo}>
					<Typography variant="subheading" gutterBottom>
						{spells[tab].name}
					</Typography>
					<Typography variant="body1" gutterBottom>
						<span dangerouslySetInnerHTML={{ __html: spells[tab].tooltip }} />
					</Typography>
				</div>
			</div>
		);
	}
}

export default withContext(withStyles(styles)(Champion));