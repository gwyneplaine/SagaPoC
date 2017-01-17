import React, { Component } from 'react';
import { Link } from 'react-router';

class App extends Component {
	render () {
		return (
			<div>
				<div className={'navigation'}>
					<h1>Navigation</h1>
					<ul>
						<li>
							 <Link to={'/list/post'}>Post</Link>
						</li>
						<li>
							<Link to={'/list/post-category'}>Post Category</Link>
						</li>
					</ul>
				 </div>
				<div>
					{ this.props.children }
				</div>
			</div>
		)
	}
}

export default App;
