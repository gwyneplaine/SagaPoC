import { select, put } from 'redux-saga/effects';

export function sortParser (sort, currentList) {
	return sort;
}


export function columnParser (columns, currentList) {
	// Extract column data from the current list.
	// return the result.
	console.log('CURRENT LIST', currentList);
	console.log(columns);
	if (!columns) return;

	return columns;
}

export function filterParser (filter) {
	return filter;
}
