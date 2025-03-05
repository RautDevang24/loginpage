function showLogin() {
  document.querySelector(".login").classList.remove("hidden");
  document.querySelector(".register").classList.add("hidden");
}

function showRegister() {
  document.querySelector(".register").classList.remove("hidden");
  document.querySelector(".login").classList.add("hidden");
}

function validateLogin() {
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  if (email === "" || password === "") {
    alert("All fields are required!");
    return false;
  }

  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    alert("Invalid email format!");
    return false;
  }

  alert("Login successful!");
  return true;
}

function validateRegister(event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let contact = document.getElementById("contact").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  // Name validation (only letters)
  let namePattern = /^[A-Za-z\s]+$/;
  if (!name.match(namePattern)) {
    alert("Name can only contain alphabets.");
    return false;
  }

  // Email validation
  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    alert("Invalid email format!");
    return false;
  }

  // Contact validation (10 digits, numbers only)
  let contactPattern = /^[0-9]{10}$/;
  if (!contact.match(contactPattern)) {
    alert("Contact number must be a 10-digit number.");
    return false;
  }

  // Password validation (min 6 chars, 1 uppercase, 1 number, 1 special char)
  let passwordPattern =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if (!password.match(passwordPattern)) {
    alert(
      "Password must have at least 6 characters, 1 uppercase letter, 1 number, and 1 special character."
    );
    return false;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return false;
  }

  alert("Thanks for registering!");
  document.querySelector(".register").reset();
  showLogin();
  return false;
}

function handleCredentialResponse(response) {
  console.log("Google JWT Token:", response.credential);

  // Decode JWT token and extract user info
  fetch(
    `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.credential}`
  )
    .then((res) => res.json())
    .then((user) => {
      console.log("User Info:", user);
      alert(`Welcome, ${user.name}!`);
    })
    .catch((err) => console.error("Error decoding token:", err));
}

// Initialize Google Sign-In button
window.onload = function () {
  google.accounts.id.initialize({
    client_id:
      "498365376621-u80hl769h7kj2go4v3ebthrfahi4hlh2.apps.googleusercontent.com",
    callback: handleCredentialResponse,
  });

  google.accounts.id.renderButton(
    document.getElementById("google-signin-button"),
    { theme: "outline", size: "large" }
  );
};
