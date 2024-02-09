let container = document.querySelector(".container");
let main = document.querySelector(".main");
let sideBar = document.querySelector(".side-bar");
let makeRequest = function (type, url) {
  let req = new XMLHttpRequest();
  req.open(type, url);
  req.send();
  return req;
};
let makeUserSet = function (data) {
  let userSet = new Set([]);
  data.forEach((element) => {
    userSet.add(element.userId);
  });
  return userSet;
};
const giveActiveClass = function (users) {
  [...users].forEach((user) => {
    user.addEventListener("click", (e) => {
      main.innerHTML = "";
      [...users].forEach((user) => {
        user.classList.remove("active");
      });
      user.classList.add("active");
      let activeUser = document.querySelector(".active");
      console.log(activeUser.innerHTML);
      let req = makeRequest(
        "GET",
        `https://jsonplaceholder.typicode.com/posts?userId=${activeUser.innerHTML}`
      );
      req.addEventListener("load", function () {
        console.log(JSON.parse(req.responseText));
        let data = JSON.parse(req.responseText);
        data.forEach((post) => {
          let html = `
          <div class='post'>
            <div class='post-title'>${post.title}</div>
            <div class='post-body'>${post.body}</div>
          </div>`;
          main.insertAdjacentHTML("beforeend", html);
          console.log(post.id);
        });
      });
    });
  });
};
let readAllPost = function () {
  let req = makeRequest("GET", "https://jsonplaceholder.typicode.com/posts");
  req.addEventListener("load", function () {
    console.log(JSON.parse(req.responseText));
    let data = JSON.parse(req.responseText);
    let userSet = makeUserSet(data);
    userSet.forEach((user) => {
      let userHtml = `<div class='user'>${user}</div>`;
      sideBar.insertAdjacentHTML("beforeend", userHtml);
    });
    let users = document.querySelectorAll(".user");
    giveActiveClass(users);
  });
};
readAllPost();
