let container = document.querySelector(".container");
let main = document.querySelector(".main");
let sideBar = document.querySelector(".side-bar");

const getAllUser = function () {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((user) => {
        let userHtml = `<div class='user' onclick="userActive(${user.id}, this)">${user.name}</div>`;
        sideBar.insertAdjacentHTML("beforeend", userHtml);
      });
    });
};
const getUserPost = function (userId) {
  main.innerHTML = "";
  return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((post) => {
        let postHtml = `
        <div class='post'>
          <div class='post-title'>${post.title}</div>
          <div class='post-body'>${post.body}</div>
        </div>`;
        main.insertAdjacentHTML("beforeend", postHtml);
      });
    });
};
getAllUser();

function userActive(userId, user) {
  getUserPost(userId);
  let users = document.getElementsByClassName("user");
  [...users].forEach((user) => {
    user.classList.remove("active");
  });
  user.classList.add("active");
}
