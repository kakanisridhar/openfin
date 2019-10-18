import './App.scss';

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './Components/Layout/Layout';

import Routes from 'Routes';

const App: React.FC = () => {
	return (
		<Layout>
			<Switch>
				{Routes.map((route, index) => (
					<Route key={`Route-${route.text}-${index}`} exact path={route.to} component={route.page} />
				))}
			</Switch>
		</Layout>
	);
};

export default App;
