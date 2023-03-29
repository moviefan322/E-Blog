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
      await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json " },
      });
      document.location.replace("/");
    } else {
      const logBut = document.getElementById("regdiv");
      const newP = document.createElement("p");
      newP.classList.add("red");
      newP.textContent = "Registration Unsuccessful. Please try again.";
      logBut.appendChild(newP);
    }
  }
};

document
  .querySelector("#register-form")
  .addEventListener("submit", registerFormHandler);
