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
});
