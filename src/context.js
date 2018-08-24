import React, { Component } from 'react';
import Store from 'store';
import fetch from 'unfetch';

import { data, cdn, language, } from './config.json';

const Dragon = React.createContext();

class Provider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			champions: [],
			favorites: []
		};
	}
	shuffle(object) {
		const array = this.objectToArray(object);
		for (var i = 0; i < array.length - 1; i++) {
			var j = i + Math.floor(Math.random() * (array.length - i));
			var temp = array[j];
			array[j] = array[i];
			array[i] = temp;
		}
		return this.arrayToObject(array);
	}
	objectToArray(object) {
		return Object.keys(object).map(e => ({ [e]: object[e] }));
	}
	arrayToObject(array) {
		return array.reduce((prev, current) => {
			const key = Object.keys(current)[0];
			return {
				...prev,
				[key]: current[key]
			}
		}, {});
	}
	async getChampions() {
		const champions = Store.get('champions');
		if (!champions) {
			const { versions } = this.state;
			const response = await fetch(cdn + versions[0] + language + 'champion.json');
			if (response.ok) {
				const { data: champions } = await response.json();
				const shuffled = this.shuffle(champions)
				this.setState({ champions: shuffled });
				Store.set('champions', shuffled);
			}
			return;
		}
		const shuffled = this.shuffle(champions)
		this.setState({ champions: shuffled });
		return;
	}
	getChampion = async (championId) => {
		const champion = Store.get(`Champion-${championId}`);
		if (!champion) {
			const { versions } = this.state;
			const response = await fetch(cdn + versions[0] + language + 'champion/' + championId + '.json');
			if (response.ok) {
				const { data, version } = await response.json();
				const champion = { ...data[championId], version };
				Store.set((`Champion-${championId}`, champion));
				return champion;
			}
			return;
		}
		return champion;
	}
	async getVersions() {
		const v = await fetch(data + 'versions.json').then(r => r.json());
		const versions = v.slice(0, 5);
		this.setState({ versions });
		Store.set('versions', versions);
		return;
	}
	toggleFavorite = (championId) => {
		const { favorites } = this.state;
		const index = favorites.indexOf(championId);
		const favs = index > -1 ? [...favorites.filter(e => (e !== championId))] : [...favorites, championId];
		this.setState({
			favorites: favs
		});
		Store.set('favorites', favs);
	}
	favorites() {
		const favs = Store.get('favorites');
		this.setState({ favorites: favs || [] })
	}
	async componentDidMount() {
		await this.getVersions();
		await this.getChampions();
		this.favorites();
	}
	render() {
		return (
			<Dragon.Provider
				value={{
					...this.state,
					toggleFavorite: this.toggleFavorite,
					getChampion: this.getChampion
				}}
			>
				{this.props.children}
			</Dragon.Provider>
		);
	}
}

const withContext = (Component) => (
	class WithContent extends Component {
		render() {
			return (
				<Dragon.Consumer>
					{context => (<Component {...this.props} context={context} />)}
				</Dragon.Consumer>
			);
		}
	}
);

export {
	Dragon,
	Provider,
	withContext
};