import React, { Component } from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from './context';

import Navbar from './components/navbar';
import Appbar from './components/appbar';
import Champions from './pages/champions.js';
import Champion from './pages/champion.js';
import Search from './pages/search.js';

export default class App extends Component {
	render() {
		return (
			<MemoryRouter>
				<Provider>
					<React.Fragment>
						<Appbar />
						<Navbar />
						<div style={{ height: 'auto', paddingBottom: '56px' }}>
							<Route exact path="/" component={Champions} />
							<Route path="/search" component={Search} />
							<Route path="/champion/:championId" component={Champion} />
						</div>
					</React.Fragment>
				</Provider>
			</MemoryRouter>
		);
	}
}
