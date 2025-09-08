function checkTokenAndLogout(tokenData) {
  const currentTime = Math.floor(Date.now() / 1000);
  if (tokenData.exp < currentTime) {
    console.log("Token expired. Logging out...");
    localStorage.removeItem("token");

    window.location.href = "./login.html";
    return true;
  } else {
    console.log("Token valid.");
    return false;
  }
}

export default checkTokenAndLogout;
