const author_name = document.querySelector("#author_name").value.trim();
const subject = document.querySelector("#postsubject").value.trim();
const post = document.querySelector("#postbody").value.trim();
const user_id = document.querySelector("#user_id").value.trim();

const submitFormHandler = async (event) => {
  event.preventDefault();

  if (subject && post) {
    const response = await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify({ author_name, subject, post, user_id }),
      headers: { "Content-Type": "application/json " },
    });

    if (response.ok) {
      alert("Post successful!");
      document.location.replace("/dashboard");
    } else {
      alert("Oops! Something went wrong");
    }
  }
};

document
  .querySelector("#submit-form")
  .addEventListener("submit", submitFormHandler);
