function ToggleHandle(passinput, icon) {
  if (!passinput) return;
  if (passinput.type === "password") {
    passinput.type = "text";
    icon.src =
      "./img/visibility_off_24dp_FF008B_FILL0_wght400_GRAD0_opsz24.svg";
  } else {
    passinput.type = "password";
    icon.src = "./img/visibility_24dp_FF008B_FILL0_wght400_GRAD0_opsz24.svg";
  }
}

export default ToggleHandle;
