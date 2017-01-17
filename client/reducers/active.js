const initialState = {
	search: '',
	sort: '',
	filters: '',
	columns: [],
	currentPage: 1,
	currentList: {},
	cachedQuery: {},
}

function active (state = initialState, { type, payload }) {
	switch(type) {
		case 'SET_ACTIVE_LIST':
			return {
				...state,
				currentList: payload.currentList,
				id: payload.id,
			}
		case 'SET_ACTIVE_SEARCH':
			return {
				...state,
				search: payload.search,
			}
		case 'SET_CURRENT_PAGE':
			return {
				...state,
				currentPage: payload.currentPage,
			}
		case 'SET_ACTIVE_COLUMNS':
			return {
				...state,
				columns: payload.columns,
			}
		case 'SET_ACTIVE_FILTERS':
			return {
				...state,
				filters: payload.filters,
			}
		case 'SET_ACTIVE_SORT':
			return {
				...state,
				sort: payload.sort,
			}
		case 'QUERY_HAS_CHANGED': {
			const { search, sort, filters, columns, currentPage, cachedQuery } = payload;
			return {
				...state,
				search,
				sort,
				filters,
				columns,
				currentPage,
				cachedQuery
			}
		}
		case 'CLEAR_FILTER':
			return {
				...state,
			}
		case 'CLEAR_ALL_FILTERS':
			return {
				...state,
				filter: {},
			}
		default:
			return state;
	}
}


export default active;
