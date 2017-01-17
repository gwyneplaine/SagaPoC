import faker from 'faker';

/**
 * Flattens filters from state into the minimum needed object to be used as a url
 * param
 *
 * @param  {Object} filterArray         The array of filters from state
 */
export function parametizeFilters (filterArray) {
	if (!filterArray || filterArray.length === 0) {
		return;
	}
	return filterArray.map((filter) => {
		return Object.assign({
			path: filter.field.path,
		}, filter.value);
	});
}



export function generateQueryParams () {
	const sortArray = ['__default', 'descending', 'ascending'];
	return {
		columns: [],
		filters: [{ name: faker.random.first_name }],
		sort: sortArray[Math.floor(Math.random() * 3)],
		page: Math.floor(Math.random() * 10),
		search: faker.lorem.words,
	}
};

export function stringifyQueryParams (query) {
	return JSON.stringify(query);
}


/**
 * Stringify the columns array from the state
 *
 * @param  {Array}  columns            The columns from the active state
 * @param  {String} defaultColumnPaths The default column paths of the current list
 *
 * @return {String}                    The column array, stringified
 */
export function stringifyColumns (columns, defaultColumnPaths) {
	if (!columns) {
		return;
	}
	// Turns [{ path: 'someColumn' }, { path: 'someOtherColumn' }]
	// into ['someColumn', 'someOtherColumn']
	let columnString = columns.map((column) => column.path);
	// Turns that array into 'someColumn,someOtherColumn'
	if (Array.isArray(columnString)) columnString = columnString.join(',');
	// If that is the same as the default columns, don't set the query param
	if (columnString === defaultColumnPaths) columnString = undefined;
	return columnString;
}


/**
 * Updates the query parameters with the ones passed as the first argument
 *
 * @param  {Object} params         The new parameters to be added
 * @param  {Object} location       The current location object
 */
export function composeQueryParams (params, location) {
	console.log(location.query);
	if (!location) return;
	const newParams = Object.assign({}, location.query);
	// Stringify nested objects inside the parameters
	Object.keys(params).forEach(i => {
		if (params[i]) {
			if(params[i] == 'search') {
				console.log(params[i]);
			}
			newParams[i] = params[i];
			if (typeof newParams[i] === 'object') {
				newParams[i] = JSON.stringify(newParams[i]);
			}
		} else {
			delete newParams[i];
		}
	});
	return newParams;
}
