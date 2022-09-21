let steveInfo = {};

function fetchApi() {
  fetch("https://api.github.com/users/stevenvallarsa")
    .then(response => response.json())
    .then(data => {
      steveInfo.img = data.avatar_url;
      steveInfo.hirable = data.hireable;
      steveInfo.bio = data.bio;
    })
    .then(response => {
      document.getElementById("steve-image").setAttribute("src", steveInfo.img);
      document.getElementById("tag").innerText = steveInfo.bio;
    })
    .catch(err => console.error(err));
}

fetchApi();
