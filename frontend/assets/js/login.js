const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const loginForm = document.getElementById("login-form");

function loginUser(data, callback) {
  const xhr = new XMLHttpRequest();

  xhr.open("POST", `https://api-githubfinder.vercel.app/api/auth/login`, true);

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

    sessionStorage.setItem("sessionToken", `Bearer ${res.token}`);
    window.alert(res.message);
    window.location.href = "/";
  });
});
