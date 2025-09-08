import Loginauth from "./login.js";
import HandlSignup from "./signup.js";
import Task from "./taskLogic.js";
import checkTokenAndLogout from "./checkTokenAndLogout.js";
import decodeToken from "./decode.js";
window.addEventListener("load", () => {
  console.log("Current Page:", window.location.pathname);
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.display = "none";
  }
});
document.addEventListener("DOMContentLoaded", () => {
  HandlSignup();
  Loginauth();

  Task();
  const token = localStorage.getItem("token");

  const userData = decodeToken(token);
  checkTokenAndLogout(userData.exp);

  if (!token) {
    window.location.href = "index.html";
    return;
  }
});
