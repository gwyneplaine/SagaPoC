import { take, fork, takeLatest, select, put, call} from 'redux-saga/effects';

import { replace, push } from 'react-router-redux';

import { composeQueryParams, stringifyColumns, parametizeFilters } from '../utils/queryParams';

import { columnParser, sortParser, filterParser } from '../parsers';

import isEqual from 'lodash/isEqual';

function * evalQueryParams () {
		// This generator gets triggered by SET_ACTIVE_LIST.
		// When SET_ACTIVE_LIST is resolved by our reducer, we want to evaluate the new query paramters.
		// This involves the following things.

		const { pathname, query } = yield select(state => state.routing.locationBeforeTransitions);
		const { cachedQuery, currentList } = yield select(state => state.active);

		// - First checking if the new path is in the list scene, if it is not. Bail out.
		if (!pathname.match(/list/)) return;

		// - Next we want to evaluate whether or not the passed in query is the same as the cachedQuery.
		if (isEqual(query, cachedQuery)) {
			// If it is the same, then pass then notify the redux state,
			yield put({ type: 'QUERY_HAS_NOT_CHANGED' });
		} else {
			// - If it isn't, we can then proceed to parsing the new query parameters and passing them to the next process.
			const parsedQuery = parseQueryParams(query, currentList);
			yield put({ type: 'QUERY_HAS_CHANGED', payload: parsedQuery });
		}
};

function parseQueryParams (query, currentList) {
	const { search, filters, page } = query;

	// Here we should parse the key value pairs in our query object.
	// Ater which they should be categorically passed into the selectors we've set up for extracting the appropriate values.
	// For example columnsParser(column), would extract and return the relevant column values from the current list.

	const columns = columnParser(query.columns, currentList);
	const sort = sortParser(query.sort, currentList);

	return {
		sort,
		filters,
		search,
		columns,
		currentPage: page,
	}
}

function * loadItems () {
	// Moved Load items into a generator.
	// If your implementation revolves around api services that are consumed within app state,
	// You can access it using a selector and call the method

	// i.e. const loadItems = yield select(state => state.active.currentList.loadItems)
	// yield call(loadItems, ARGUMENTS);

	while (true) {
		yield take('LOAD_ITEMS');
		yield put({ type: 'LOADING_ITEMS' });
		const { data, error }  = yield call(loadItemsAPI);
		if (!error) {
			yield put({ type: 'ITEMS_LOADED', payload: data });
		} else {
			yield put({ type: 'ITEMS_LOADING_ERROR', payload: data });
		}
	}
}

function * updateQueryParams () {
	const active = yield select(state => state.active);
	const location = yield select((state) => state.routing.locationBeforeTransitions);
	const currentList = yield select((state) => state.active.currentList);

	let sort = active.sort;
	let page = active.currentPage;

	if (sort === currentList.defaultSort) sort = void 0;

	let columns = active.columns;

	let search = active.search;
	
	let filters = active.filters;

	if (page === 1) page = undefined;

	const newParams = composeQueryParams({
		page,
		columns,
		sort,
		search,
		filters
	}, location);

	yield put({ type: 'REPLACE_CACHED_QUERY', payload: { cachedQuery: newParams }});

	yield put(replace({
		pathname: location.pathname,
		query: newParams
	}));

	yield put({ type: 'LOAD_ITEMS' });
};



function * rootSaga () {
	// Significantly simplified forks here.
	// I don't need to worry about using order to conditionally allow certain actions.
	// Because processes  triggered by actions from UI never cross with processes generated from actions occuring due to lifecycle triggers.

	// the use of takeLatest also allows us to easily deal with race conditions, and latency related failures.

	yield fork(loadItems);
	yield fork(takeLatest, ['SET_ACTIVE_LIST'], evalQueryParams);
	yield fork(takeLatest, [
		'QUERY_HAS_CHANGED',
		'SET_ACTIVE_COLUMNS',
		'SET_ACTIVE_SORT',
		'SET_CURRENT_PAGE',
		'SET_ACTIVE_SEARCH',
		'SET_ACTIVE_FILTERS',
		'CLEAR_FILTER',
		'CLEAR_ALL_FILTERS'
	], updateQueryParams);
}


export default rootSaga;
