import React, { Component } from 'react';
import { connect } from 'react-redux';
import faker from 'faker';

import { setActiveList, setActiveFilter, setActiveSort, setActiveColumns, setCurrentPage, setActiveSearch, clearAllFilters } from '../../actions/active';

const colvar1 = ['name', 'id'];
const colvar2 = ['lastCreatedAt', 'lastUpdatedAt'];
const columns = [colvar1, colvar2];

class List extends Component {
	constructor () {
		super();
		this.setFilter = this.setFilter.bind(this);
		this.setSearch = this.setSearch.bind(this);
		this.setColumns = this.setColumns.bind(this);
		this.setCurrentPage = this.setCurrentPage.bind(this);
		this.setSort = this.setSort.bind(this);
		this.clearAllFilters = this.clearAllFilters.bind(this);
	}
	componentWillMount () {
		const { listId }  = this.props.params;
		this.props.setActiveList({id: listId});
	}
	componentWillReceiveProps (nextProps) {
		if (this.props.params.listId !== nextProps.params.listId) {
			const { listId } = nextProps.params.listId;
			this.props.setActiveList({id: listId});
		}
	}
	setFilter () {
		const filter = faker.random.word();
		this.props.setFilter(filter);
	}
	setSort () {
		const sort = faker.random.word();
		this.props.setSort(sort);
	}
	setColumns () {
		const colIndex = Math.round(Math.random());
		this.props.setColumns(columns[colIndex]);
	}
	setCurrentPage () {
		const currentPage = Math.round(Math.random() * 10);
		this.props.setCurrentPage(currentPage);
	}
	setSearch () {
		const searchParams = faker.random.word();
		this.props.setSearch(searchParams);
	}
	render () {
		return (
			<div>
				<ul>
					<lu><button> Add Random Query </button></lu>
					<lu><button onClick={this.setFilter}> Add Random Filter </button></lu>
					<lu><button onClick={this.setSort}> Add Random Sort </button></lu>
					<lu><button onClick={this.setSearch}> Add Random Search </button></lu>
					<lu><button onClick={this.setCurrentPage}> Add Random Page </button></lu>
					<lu><button onClick={this.setColumns}> Add Random Columns </button></lu>
				</ul>
				<div>
					<ul>
						<li>{`Search: ${this.props.active.search}`}</li>
						<li>{`Current Page: ${this.props.active.currentPage}`}</li>
						<li>{`Filter: ${this.props.active.filters}`}</li>
						<li>{`Sort: ${this.props.active.sort}`}</li>
						<li>{`Columns: ${this.props.active.columns}`}</li>
					</ul>
				</div>
				<button onClick={this.clearAllFilters}>CLEAR ALL FILTERS</button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		active: state.active
	}
};

const mapDispatchToProps = dispatch => {
	return {
		setSort: (sort) => { return dispatch(setActiveSort(sort))},
		setFilter: (filter) => { return dispatch(setActiveFilter(filter)) },
		setSearch: (search) => { return dispatch(setActiveSearch(search)) },
		setCurrentPage: (page) => { return dispatch(setCurrentPage(page)) },
		setColumns: (columns) => { return dispatch(setActiveColumns(columns)) },
		setActiveList: (list, id, initial) => { return dispatch(setActiveList(list, id, initial))},
		clearAllFilters: () => { return dispatch(clearAllFilters()) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
