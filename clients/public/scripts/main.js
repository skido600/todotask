import Loginauth from "./login.js";
import HandlSignup from "./signup.js";
import Task from "./taskloic.js";

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
});
