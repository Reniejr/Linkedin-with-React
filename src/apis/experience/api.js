//---------------------------------------------EXPERIENCE-------------------------
//GET EXPERIENCES
export async function fetchUserExperiences(userId) {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/experiences/${userId}`,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return "Something Went Wrong";
    }
  } catch (error) {
    console.log(error);
  }
}

//CREATE EXPERIENCE
export async function createExperience(userId, experience) {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/experiences/${userId}`,
      {
        method: "POST",
        body: JSON.stringify(experience),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      return response.json();
    } else {
      return "Something went wrong";
    }
  } catch (error) {
    console.log(error);
  }
}

//GET SINGLE EXPERIENCE
export async function fetchSingleExperience(userId, expId) {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/experiences/${userId}/${expId}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_DOGGO,
        },
      }
    );
    if (response.ok) {
      const data = response.json();
      return data;
    } else {
      return console.log("Something went wrong");
    }
  } catch (error) {
    console.log(error);
  }
}

//UPDATE SINGLE EXPERIENCE
export async function updateSingleExperience(userId, expId, updated) {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/experiences/${userId}/${expId}`,
      {
        method: "PUT",
        body: JSON.stringify(updated),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      return "Experience updated";
    } else {
      return "Something went wrong";
    }
  } catch (error) {
    console.log(error);
  }
}

//DELETE SINGLE EXPERIENCE
export async function deleteExperience(userId, expId) {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/experiences/${userId}/${expId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      return "Experience Sent to Shadow Realm";
    } else {
      return "Something Went Wrong";
    }
  } catch (error) {
    console.log(error);
  }
}

export async function submitExperienceImage(userId, file, expId) {
  let form_data = new FormData();

  form_data.append("image", file.files[0]);
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/experiences/${userId}/${expId}/picture`,
      {
        method: "POST",
        body: form_data,
      }
    );
    if (response.ok) {
      return "Image Created";
    } else {
      throw new Error("Could not add experiences!");
    }
  } catch (error) {
    console.log(error);
  }
}
