const registerFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-register").value.trim();
  const password = document.querySelector("#password-register").value.trim();
  const name = document.querySelector("#name-register").value.trim();

  if (email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json " },
    });

    if (response.ok) {
      alert("Registration successful!");
      document.location.replace("/");
    } else {
      alert("Oops! Something went wrong");
    }
  }
};

document
  .querySelector("#register-form")
  .addEventListener("submit", registerFormHandler);
