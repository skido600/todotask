function checkTokenAndLogout(tokenData) {
  const currentTime = Math.floor(Date.now() / 1000);
  if (tokenData.exp < currentTime) {
    localStorage.removeItem("token");
    window.location.href = "./login.html";
    return true;
  } else {
    return false;
  }
}

export default checkTokenAndLogout;
