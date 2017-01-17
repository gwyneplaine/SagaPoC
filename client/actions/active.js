export function setActiveSearch (search) {
	return {
		type: 'SET_ACTIVE_SEARCH',
		payload: { search },
	};
};

export function setActiveList (currentList) {
	return {
		type: 'SET_ACTIVE_LIST',
		payload: { currentList },
	}
}

export function setActiveColumns (columns) {
	return {
		type: 'SET_ACTIVE_COLUMNS',
		payload: { columns },
	}
}

export function setCurrentPage (currentPage) {
	return {
		type: 'SET_CURRENT_PAGE',
		payload: { currentPage },
	}
}

export function setActiveSort (sort) {
	return {
		type: 'SET_ACTIVE_SORT',
		payload: { sort },
	}
}

export function setActiveFilter (filters) {
	return {
		type: 'SET_ACTIVE_FILTERS',
		payload : { filters },
	}
}

export function clearFilter (path) {
	return {
		type: 'CLEAR_FILTER',
		path,
	}
}

export function clearAllFilters () {
	return {
		type: 'CLEAR_ALL_FILTERS',
	};
}
