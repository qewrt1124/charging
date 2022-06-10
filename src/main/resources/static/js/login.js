const loginPage = document.querySelector('#info-wrap4');
const joinPage = document.querySelector('#info-wrap5');
const loginIdElement = document.querySelector('#loginId');
const passElement = document.querySelector('#loginPass');

let pageOpenCheck = 0;

function onClickProfile() {
  console.log(pageOpenCheck);
  if (pageOpenCheck === 0) {
    loginPage.style.visibility = 'visible';
    pageOpenCheck = 1;
    console.log("innerIf : " + pageOpenCheck);
  } else {
    loginPage.style.visibility = 'hidden';
    joinPage.style.visibility = 'hidden';
    pageOpenCheck = 0;
    console.log("innerElse : " + pageOpenCheck);
  }
}

function onClickLoginButton() {
  loginIdPassCheck();
}

function getLoginInfo() {
  let loginId = loginIdElement.value;
  let loginPass = passElement.value;

  let loginInfo = {
    'userId': loginId,
    'pass': loginPass
  }

  return loginInfo;
}

function loginOk(e) {
  if (e === 1) {
    loginPage.style.visibility = 'hidden';
    joinPage.style.visibility = 'visible';
  } else {
    alert('아이디 또는 비밀번호가 맞지 않습니다.');
  }
}

function loginIdPassCheck() {
  fetch("/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getLoginInfo()),
  })
    .then((res) => res.json())
    .then((data) => {
      loginOk(data);
    })
    .catch((e) => {
      console.log("로그인 체크 실패");
      console.log(e);
    });
}
