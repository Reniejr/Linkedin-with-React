export const editPost = async (id, text) => {
	try {
		const res = await fetch(`${process.env.REACT_APP_BASE_URL}/${id}`, {
			method: "PUT",
			headers: new Headers({
				"Content-Type": "application/json",
			}),
			body: JSON.stringify(text),
		});
		if (res.ok) {
			return res;
		} else {
			console.log("there is an error with editing post");
		}
	} catch (err) {
		console.log("there is an error", err);
	}
};

//DELETE a single post -> note: you can delete only posts where the userId of the post matched the currentUserId
export const deletePost = async (id) => {
	try {
		const res = await fetch(`${process.env.REACT_APP_POSTS}/${id}`, {
			method: "DELETE",
			headers: new Headers({
				"Content-Type": "application/json",
			}),
		});
		if (res.ok) {
			return res;
		} else {
			console.log("there is an error with delete");
		}
	} catch (err) {
		console.log("there is an error", err);
	}
};
