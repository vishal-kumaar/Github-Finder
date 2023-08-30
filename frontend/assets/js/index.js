import config from "./config.js";
const username = document.getElementById("user-name");
const useremail = document.getElementById("user-email");
const navLinks = document.querySelector(".nav-links").children;
const usernameInput = document.getElementById("username-input");
const userForm = document.getElementById("user-form");
const user = document.getElementById("user");
const instruction = document.getElementById("instruction");
const profilePic = document.getElementById("profile_pic");
const name = document.getElementById("name");
const userLocation = document.getElementById("location");
const followers = document.getElementById("followers");
const portfolioLink = document.getElementById("porfolio_link");
const publicRepos = document.getElementById("public_repos");
const bio = document.getElementById("bio");

function displayData(data) {
  user.style.display = "block";
  profilePic.src = data.avatar_url;
  name.textContent = data.name;
  userLocation.textContent = data.location;
  followers.textContent = data.followers;
  portfolioLink.href = data.html_url;
  publicRepos.textContent = data.public_repos;
  bio.textContent = data.bio;
}

function fetchUser(username, callback) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", `https://api.github.com/users/${username}`, true);

  xhr.responseType = "json";

  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status === 200) {
        callback(null, this.response);
      } else {
        callback("User Not Found.", null);
      }
    }
  };

  xhr.send();
}

function fetchProfile(sessionToken, callback) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", `${config.baseUrl}/api/user`, true);

  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("Authorization", sessionToken);
  xhr.responseType = "json";

  xhr.onload = function () {
    if (this.response?.success) {
      callback(null, this.response);
    } else {
      callback(this.response?.message, null);
    }
  };

  xhr.send();
}

function getCookie(key) {
  const cookieList = document.cookie.split("; ");
  for (let val of cookieList) {
    const cookie = val.split("=");
    if (cookie[0] === key) {
      return cookie[1];
    }
  }
}

function deleteCookie(cookieName) {
  const pastDate = new Date(0).toUTCString();
  document.cookie = `${cookieName}=; expires=${pastDate}; path=/;`;
}

const sessionToken =
  sessionStorage.getItem("sessionToken") || getCookie("sessionToken");

if (sessionToken) {
  navLinks[0].style.display = "none";
  navLinks[1].style.display = "none";
  navLinks[2].style.display = "none";
  navLinks[3].style.display = "block";
} else {
  navLinks[0].style.display = "inline-block";
  navLinks[1].style.display = "inline-block";
  navLinks[2].style.display = "inline-block";
  navLinks[3].style.display = "none";
}

fetchProfile(sessionToken, (err, res) => {
  if (err || !res?.success) {
    return;
  }

  username.textContent = res.user.name;
  useremail.style.display = "block";
  useremail.textContent = res.user.email;
});

userForm.addEventListener("submit", (event) => {
  event.preventDefault();
  fetchProfile(sessionToken, (err, res) => {
    if (err) {
      window.alert(err);
      return;
    }

    if (!res.success) {
      window.alert(res.message);
    }

    fetchUser(usernameInput.value, (err, res) => {
      if (err) {
        document.body.style.backgroundColor = "darkred";
        instruction.style.display = "flex";
        user.style.display = "none";
        instruction.textContent = "User Not Found.";
        return;
      }

      instruction.style.display = "none";
      document.body.style.backgroundColor = "#1E194D";
      displayData(res);
    });
  });
});

navLinks[3].addEventListener("click", function () {
  sessionStorage.removeItem("sessionToken");
  deleteCookie("sessionToken");
  window.location.reload();
});
