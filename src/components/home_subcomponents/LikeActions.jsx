import { Height } from "@material-ui/icons";
import React from "react";
import one from "../../assets/like-btns/1-like.png";
import two from "../../assets/like-btns/2-celebrate.png";
import three from "../../assets/like-btns/3-support.png";
import four from "../../assets/like-btns/4-love.png";
import five from "../../assets/like-btns/5-insightful.png";
import six from "../../assets/like-btns/6-logo.png";

class LikeActions extends React.Component {
	state = { show: false };

	style = {
		img: {
			width: "2rem",
			height: "2rem",
			marginLeft: "1rem",
		},
		container: {
			backgroundColor: "white",
			borderRadius: "4rem",
			paddingTop: "1rem",
			paddingLeft: "1rem",
			paddingRight: "1rem",
			paddingBottom: "1rem",
			borderBottomColor: "rgba(0, 0, 0, 0.9)",
			boxShadow: "2px 2px #888888",
			position: "absolute",
			bottom: "4rem",
		},
	};
	render() {
		let { show } = this.props;
		return (
			<div
				style={this.style.container}
				className={
					show ? "like-actions-container d-flex flex-row" : "d-none"
				}>
				<div>
					<img style={this.style.img} src={one} alt='' />
				</div>

				<div>
					<img style={this.style.img} src={two} alt='' />
				</div>

				<div>
					<img style={this.style.img} src={three} alt='' />
				</div>

				<div>
					<img style={this.style.img} src={four} alt='' />
				</div>

				<div>
					<img style={this.style.img} src={five} alt='' />
				</div>

				<div>
					<img style={this.style.img} src={six} alt='' />
				</div>
			</div>
		);
	}
}

export default LikeActions;
