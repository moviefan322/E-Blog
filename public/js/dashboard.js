document.addEventListener("DOMContentLoaded", () => {
  const deleteButton = document.getElementById("deletepost");

  // Add click event listener to each delete button
  deleteButton.addEventListener("click", () => {
    // Get the post ID
    const postId = document.getElementById("blog_id").textContent;
    // Send a DELETE request to the server to delete the post
    fetch(`/api/blogs/${postId}`, {
      method: "DELETE",
    })
      .then((response) => {
        // Reload the page to update the displayed posts
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const editButton = document.getElementById("editpost");

  editButton.addEventListener("click", () => {
    const parentSection = editButton.parentNode;
    const subjectEl = parentSection.querySelector("#subjectline");
    const postlineEl = parentSection.querySelector("#postline");
    const currentSubject = subjectEl.textContent.substring(9);
    const currentPostline = postlineEl.textContent;

    const subjectInput = document.createElement("input");
    subjectInput.type = "text";
    subjectInput.value = currentSubject;
    subjectEl.replaceWith(subjectInput);

    const postlineInput = document.createElement("textarea");
    postlineInput.textContent = currentPostline;
    postlineEl.replaceWith(postlineInput);

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save Changes";
    saveButton.classList.add("button");
    parentSection.appendChild(saveButton);

    const deleteButton = parentSection.querySelector("#deletepost");
    deleteButton.remove();

    editButton.remove();

    const blogId = parentSection.querySelector("#blog_id").textContent;

    saveButton.addEventListener("click", () => {
      const newSubject = subjectInput.value;
      const newPostline = postlineInput.value;

      fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        body: JSON.stringify({ subject: newSubject, post: newPostline }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });
});
