import showToast from "./showToast.js";

function logout() {
  showToast("Successfully logged out", "bg-green-500");
  localStorage.clear("token");
  setTimeout(() => {
    window.location.href = "./login.html";
  }, 2000);
}

export default logout;
