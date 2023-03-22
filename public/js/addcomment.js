document.addEventListener("DOMContentLoaded", () => {
  const addCommentButtons = document.querySelectorAll(".addcomment");

  addCommentButtons.forEach((addCommentButton) => {
    addCommentButton.addEventListener("click", () => {
      const parentSection = addCommentButton.parentNode;
      const commentInput = document.createElement("input");
      commentInput.type = "text";
      commentInput.classList.add("commentInput");
      parentSection.appendChild(commentInput);

      const postButton = document.createElement("button");
      postButton.textContent = "Post Comment";
      postButton.classList.add("postCommentButton");
      postButton.classList.add("button");
      parentSection.appendChild(postButton);

      addCommentButton.remove();

      const blog_id = parentSection.querySelector("#blogId").textContent;
      const username = document.getElementById("username").textContent;

      const postButtons = document.querySelectorAll(".postCommentButton");
      postButtons.forEach((postButton) => {
        postButton.addEventListener("click", () => {
          const comment = commentInput.value;
          fetch(`/api/comments`, {
            method: "POST",
            body: JSON.stringify({ username, comment, blog_id }),
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
  });
});
