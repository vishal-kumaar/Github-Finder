const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const dobInput = document.getElementById("dob-input");
const passwordInput = document.getElementById("password-input");
const signup = document.getElementById("signup");

function signupUser(data, callback) {
  const xhr = new XMLHttpRequest();

  xhr.open("POST", `http://localhost:4000/api/auth/signup`, true);

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

signup.addEventListener("click", function (event) {
  event.preventDefault();

  const data = {
    name: nameInput.value,
    email: emailInput.value,
    dob: dobInput.value,
    password: passwordInput.value,
  };

  signupUser(data, (err, res) => {
    if (err) {
      window.alert(err);
      return;
    }

    if (!res.success) {
      window.alert(res.message);
    }

    window.alert(res.message);
    window.location.href = "/login.html";
  });
});
