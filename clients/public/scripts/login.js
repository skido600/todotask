import ToggleHandle from "./ToggleFucntion.js";

function Loginauth() {
  const error_username_email = document.getElementById("erroruseremail");
  const errorpassword = document.getElementById("errorpassword");
  const password_vis = document.getElementById("visibility");
  const passwordInput = document.getElementById("password");
  const form = document.getElementById("LoginForm");
  if (!form) {
    console.error("LoginForm not found!");
    return;
  }
  password_vis?.addEventListener("click", () => {
    ToggleHandle(passwordInput, password_vis);
  });
  form?.addEventListener("submit", (e) => {
    console.log("clicked");
    e.preventDefault();
    const formData = new FormData(form);
    const email_username = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();
    let isValid = true;
    if (!email_username) {
      error_username_email.textContent = "email/username is required";
      isValid = false;
    } else {
      error_username_email.textContent = "";
    }
    if (!password) {
      errorpassword.textContent = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      errorpassword.textContent = "Password must be at least 6 characters";
      console.log(isValid);
      isValid = false;
    } else {
      errorpassword.textContent = "";
    }

    //submit
    if (isValid) {
      console.log(isValid);
      const data = { email_username, password };
      console.log("Form data:", data);
    }
  });
}

export default Loginauth;
