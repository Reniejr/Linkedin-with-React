export async function getReactionsByPostId(postId) {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/reactions/${postId}`
    );
    if (response.statusText === "Not Found") {
      return null;
    }
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function postReaction(userId, postId, react) {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/reactions/${userId}/${postId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(react),
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return "something went wrong";
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteReact(userId, postId) {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/reactions/${userId}/${postId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      return "deleted";
    } else {
      return "something went wrong";
    }
  } catch (error) {
    console.log(error);
  }
}
