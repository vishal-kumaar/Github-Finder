import config from "./config.js";
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const loginForm = document.getElementById("login-form");
const rememberMe = document.getElementById("remember-me");

function loginUser(data, callback) {
  const xhr = new XMLHttpRequest();

  xhr.open("POST", `${config.baseUrl}/api/auth/login`, true);

  xhr.setRequestHeader("content-type", "application/json");
  xhr.responseType = "json";

  xhr.onprogress = function () {
    console.log("Loading...");
  };

  xhr.onload = function () {
    if (this.response?.success) {
      callback(null, this.response);
    } else {
      callback(this.response?.message, null);
    }
  };

  xhr.send(JSON.stringify(data));
}

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const data = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  loginUser(data, (err, res) => {
    if (err) {
      window.alert(err);
      return;
    }

    if (rememberMe.checked) {
      document.cookie = `sessionToken=${res.token.value}; expires=${new Date(
        Date.now() + parseInt(res.token.expiresIn) * 24 * 60 * 60 * 1000
      )}; path="/"`;
    } else {
      sessionStorage.setItem("sessionToken", `Bearer ${res.token}`);
    }

    window.alert(res.message);
    window.location.href = "index.html";
  });
});
