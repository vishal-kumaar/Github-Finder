const username = document.getElementById("username");
const submit = document.getElementById("submit");
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

function fetchUser(username) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", `https://api.github.com/users/${username}`, true);

  xhr.onreadystatechange = function () {
    instruction.style.display = "flex";
    switch (this.readyState) {
      case 0:
        instruction.textContent = "Connecting...";
        break;
      case 1:
        instruction.textContent = "Connecting...";
        break;
      case 2:
        instruction.textContent = "Loading...";
        break;
      case 3:
        instruction.textContent = "Loading...";
        break;
      case 4:
        instruction.textContent = "Request Complete...";
        break;
    }
  };

  xhr.onload = function () {
    if (this.status === 200) {
      const data = JSON.parse(this.responseText);
      instruction.style.display = "none";
      displayData(data);
    } else {
      instruction.style.display = "flex";
      user.style.display = "none";
      instruction.classList.add("error");
      instruction.textContent = "User Not Found.";
    }
  };

  xhr.send();
}

submit.addEventListener("click", (event) => {
  event.preventDefault();
  fetchUser(username.value);
});
