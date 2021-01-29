import React from "react";
import { ListGroup } from "react-bootstrap";

import { Link } from "react-router-dom";
class ShowSearchResult extends React.Component {
	state = { users: [] };

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.users !== this.props.users) {
			this.setState({
				users: this.props.users,
				keyword: this.props.keyword,
			});
		}
	}
	render() {
		const { users } = this.props;
		console.log("searched", users);
		return (
			//     <Button variant="primary" onClick={handleShow}>
			//     Launch demo modal
			//   </Button>
			<div
				className='search-result-popup'
				style={{
					display: this.props.show ? "block" : "none",
				}}>
				<ListGroup>
					<ListGroup.Item
						style={{
							textAlign: "right",
							display: this.props.show ? "block" : "none",
						}}>
						<span onClick={this.props.onHide}>&#10005;</span>
					</ListGroup.Item>
					{users.length > 0 &&
						users.map((user) => {
							return (
								<Link to={`/profile/${user._id}`}>
									<ListGroup.Item
										key={user._id}
										className='d-flex flex-row'>
										<img
											className='user-avatar mr-2'
											src={user.image}
											alt='user-avatar'
										/>
										<span className='user-name mr-2'>
											{user.name} {user.surname} &middot;
										</span>

										<span className='user-info '>
											{user.title &&
												user.title.substring(0, 14)}
											...
										</span>
									</ListGroup.Item>
								</Link>
							);
						})}
				</ListGroup>
			</div>
		);
	}
}

export default ShowSearchResult;
