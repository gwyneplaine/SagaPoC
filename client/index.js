import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, IndexRoute, browserHistory, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store/index';
import App from './App';
import Home from './scenes/Home';
import List from './scenes/List';

const history = syncHistoryWithStore(browserHistory, store);

render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={Home}/>
				<Route path='list/:listId' component={List}/>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('app')
);
