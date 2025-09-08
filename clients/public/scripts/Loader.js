function showButtonLoader(message = "Loading...") {
  const btnText = document.getElementById("btn_text");
  const btnSubmit = document.getElementById("btn_submit");

  btnText.textContent = message;
  btnSubmit.disabled = true;
  btnSubmit.classList.add("opacity-50", "cursor-not-allowed");
}

function hideButtonLoader(caption) {
  const btnText = document.getElementById("btn_text");
  const btnSubmit = document.getElementById("btn_submit");
  if (!btnText || !btnSubmit) return;
  btnText.textContent = caption;
  btnSubmit.disabled = false;
  btnSubmit.classList.remove("opacity-50", "cursor-not-allowed");
}

export { showButtonLoader, hideButtonLoader };
