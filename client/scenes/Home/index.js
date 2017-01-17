import React, { Component } from 'react';
import { Link } from 'react-router';
class Home extends Component {
	render () {
		return (
			<div>
				<ul>
					<li>
						 <Link to={'/list/post'}>Post</Link>
					</li>
					<li>
						<Link to={'/list/post-category'}>Post Category</Link>
					</li>
				</ul>
			</div>
		);
	}
}

export default Home;
