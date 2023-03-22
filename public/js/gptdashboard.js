document.addEventListener("DOMContentLoaded", () => {
  const editButtons = document.querySelectorAll("#editpost");

  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const parentSection = button.parentNode;
      const subjectElement = parentSection.querySelector("#subjectline");
      const postlineElement = parentSection.querySelector("#postline");
      const currentSubject = subjectElement.textContent.substring(9);
      const currentPostline = postlineElement.textContent;

      const subjectInput = document.createElement("input");
      subjectInput.type = "text";
      subjectInput.value = currentSubject;
      subjectElement.replaceWith(subjectInput);

      const postlineInput = document.createElement("textarea");
      postlineInput.textContent = currentPostline;
      postlineElement.replaceWith(postlineInput);

      const saveButton = document.createElement("button");
      saveButton.textContent = "Save Changes";
      saveButton.classList.add("button");
      parentSection.appendChild(saveButton);

      button.remove();
      const deleteButton = parentSection.querySelector("#deletepost");
      deleteButton.remove();

      const postId = parentSection.querySelector("#blog_id").textContent;

      saveButton.addEventListener("click", () => {
        const newSubject = subjectInput.value;
        const newPostline = postlineInput.value;

        fetch(`/api/blogs/${postId}`, {
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

  document.addEventListener("DOMContentLoaded", () => {
    // Get all delete buttons
    const deleteButtons = document.querySelectorAll("#deletepost");

    // Add click event listener to each delete button
    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Get the parent section of the clicked button
        const parentSection = button.parentNode;

        // Get the post ID
        const postId = parentSection.querySelector("#blog_id").textContent;

        // Send a DELETE request to the server to delete the post
        fetch(`/api/blogs/${postId}`, {
          method: "DELETE",
        })
          .then((response) => {
            // Reload the page to update the displayed posts
            window.location.href = "/dashboard";
          })
          .catch((error) => {
            console.error(error);
          });
      });
    });
  });
});
