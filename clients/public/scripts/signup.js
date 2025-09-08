import { showButtonLoader, hideButtonLoader } from "./Loader.js";
import ToggleHandle from "./ToggleFucntion.js";
import showToast from "./showToast.js";
function HandlSignup() {
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.getElementById("visibility");
  const form = document.getElementById("signupForm");
  const emailErrorBox = document.getElementById("erroruseremail");
  const usernameErrorBox = document.getElementById("errorusername");
  const passwordErrorBox = document.getElementById("errorpassword");

  toggleIcon?.addEventListener("click", () => {
    ToggleHandle(passwordInput, toggleIcon);
  });
  form?.addEventListener("submit", async (e) => {
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

      isValid = false;
    } else {
      passwordErrorBox.textContent = "";
    }

    if (isValid) {
      showButtonLoader();
      try {
        const res = await fetch(
          "https://todotask-4.onrender.com/auth/createuser",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
          }
        );

        const response = await res.json();

        if (response.success) {
          showToast(response.message, "bg-green-500");
          window.location.href = "./login.html";
        } else {
          showToast(response.message || "Login failed", "bg-red-500");
        }
      } catch (err) {
        showToast(err.message || "Something went wrong", "bg-red-500");
      } finally {
        hideButtonLoader("sign up");
      }
    }
  });
}

export default HandlSignup;
