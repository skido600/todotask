const passwordInput = document.getElementById("password") as HTMLInputElement;
const toggleIcon = document.getElementById("visibility") as HTMLImageElement;
const form = document.getElementById("signupForm") as HTMLFormElement;
const emailErrorBox = document.getElementById(
  "erroruseremail"
) as HTMLParagraphElement;
const usernameErrorBox = document.getElementById(
  "errorusername"
) as HTMLParagraphElement;
const passwordErrorBox = document.getElementById(
  "errorpassword"
) as HTMLParagraphElement;
console.log(passwordErrorBox);

toggleIcon?.addEventListener("click", () => {
  if (!passwordInput) return;

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.src =
      "./img/visibility_off_24dp_FF008B_FILL0_wght400_GRAD0_opsz24.svg";
  } else {
    passwordInput.type = "password";
    toggleIcon.src =
      "./img/visibility_24dp_FF008B_FILL0_wght400_GRAD0_opsz24.svg";
  }
});

form?.addEventListener("submit", (e): void => {
  console.log("clicked");
  e.preventDefault();
  const formData = new FormData(form);
  const username = formData.get("username")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString().trim();

  let isValid = true;

  if (!username) {
    usernameErrorBox.textContent = "Username is required";
    isValid = false;
  } else {
    usernameErrorBox.textContent = "";
  }

  // Validate email
  if (!email) {
    emailErrorBox.textContent = "Email is required";
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    emailErrorBox.textContent = "Invalid email format";
    isValid = false;
  } else {
    emailErrorBox.textContent = "";
  }

  if (!password) {
    passwordErrorBox.textContent = "Password is required";
    isValid = false;
  } else if (password.length < 6) {
    passwordErrorBox.textContent = "Password must be at least 6 characters";
    console.log(isValid);
    isValid = false;
  } else {
    passwordErrorBox.textContent = "";
  }
  if (isValid) {
    console.log(isValid);
    const data = { username, email, password };
    console.log("Form data:", data);
  }
});
