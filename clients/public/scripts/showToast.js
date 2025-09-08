function showToast(message, color = "bg-green-500") {
  const container = document.getElementById("toast");
  if (!container) return;

  container.innerHTML = "";
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = ` ${color} px-5 py-2 my-2 rounded-[2px] text-sm`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove("-translate-y-20", "opacity-0");
    toast.classList.add("translate-y-0", "opacity-100");
  }, 10);

  // remove after 3s
  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("-translate-y-20", "opacity-0");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

export default showToast;
