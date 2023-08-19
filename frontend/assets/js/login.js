const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const login = document.getElementById("login");

function loginUser(data, callback) {
  const xhr = new XMLHttpRequest();

  xhr.open("POST", `http://localhost:4000/api/auth/login`, true);

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

login.addEventListener("click", function (event) {
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
