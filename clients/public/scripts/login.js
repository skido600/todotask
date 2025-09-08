import ToggleHandle from "./ToggleFucntion.js";
import { showButtonLoader, hideButtonLoader } from "./Loader.js";
import showToast from "./showToast.js";

function Loginauth() {
  const error_username_email = document.getElementById("erroruseremail");
  const errorpassword = document.getElementById("errorpassword");
  const password_vis = document.getElementById("visibility_login");
  const passwordInput = document.getElementById("password");

  const form = document.getElementById("LoginForm");

  password_vis?.addEventListener("click", () => {
    ToggleHandle(passwordInput, password_vis);
  });

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const email_username = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();
    let isValid = true;
    if (!email_username) {
      error_username_email.textContent = "email is required";
      isValid = false;
    } else {
      error_username_email.textContent = "";
    }
    if (!password) {
      errorpassword.textContent = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      errorpassword.textContent = "Password must be at least 6 characters";

      isValid = false;
    } else {
      errorpassword.textContent = "";
    }

    //submit
    if (isValid) {
      showButtonLoader();
      try {
        const res = await fetch(
          "https://todotask-4.onrender.com/auth/loginuser",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email_username, password }),
          }
        );

        const response = await res.json();

        if (response.success) {
          localStorage.setItem("token", response.data);

          showToast(response.message, "bg-green-500");
          window.location.href = "./admin.html";
        } else {
          showToast(response.message || "Login failed", "bg-red-500");
        }
      } catch (err) {
        showToast(err.message || "Something went wrong", "bg-red-500");
      } finally {
        hideButtonLoader("login");
      }
    }
  });
}

export default Loginauth;
