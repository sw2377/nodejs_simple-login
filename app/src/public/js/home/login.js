"use strict"

const id = document.querySelector("#id");
const password = document.querySelector("#password");
const loginBtn = document.querySelector("#loginBtn");

loginBtn.addEventListener("click", login);

function login(e) {
  e.preventDefault();

  if (!id.value) return alert("아이디를 입력해 주세요.");
  if (!password.value) return alert("비밀번호를 입력해 주세요.");

  const req = {
    id: id.value,
    password: password.value
  }

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req)
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      location.href = "/";
    } else {
      if (res.err) return alert(res.err);
      alert(res.msg);
    }
  })
  // error 처리 
  .catch((err) => {
    console.error("로그인 중 에러 발생");
  })
}
