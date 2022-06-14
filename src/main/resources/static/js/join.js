const joinIdElement = document.querySelector('#joinUserId');
const joinPassElement = document.querySelector('#joinUserPass');
const joinPassConfirm = document.querySelector('#joinConfirmUserPass');
const joinName = document.querySelector('#joinUserName');
const joinPhNum = document.querySelector('#joinPhNum');
const idAlert = document.querySelector('#idAlert');

function moveJoinPage() {
  const loginPage = document.querySelector('#info-wrap4');
  const joinPage = document.querySelector('#info-wrap5');
  clearInput();
  loginPage.style.visibility = 'hidden';
  joinPage.style.visibility = 'visible';
}

function getJoinInfo() {
  let joinId = joinIdElement.value;
  let joinPass = joinPassElement.value;
  let name = joinName.value;
  let phNum = joinPhNum.value;

  let joinInfo = {
    'userId': joinId,
    'pass': joinPass,
    'hpNum': phNum,
    'userName': name
  }

  return joinInfo;
}

function joinFetch() {
  fetch("/join", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getJoinInfo()),
  })
    .then((res) => res.json())
    .then((data) => {
      changeLoginPage();
    })
    .catch((e) => {
      console.log("회원가입 실패");
      console.log(e);
      alert("잠시 후 다시 시도해 주세요");
    });
}

function onClickJoin() {
  joinFetch();
}

/*아이디 체크*/
function isId(asValue) {
  let regExp = /^[a-z]+[a-z0-9]{5,19}$/g;

  if (regExp.test(asValue)) {
    joinIdElement.style.border = "1px solid black";
    idAlert.innerHTML = "";
    return true;
  } else {
    joinIdElement.style.border = "2px solid red";
    idAlert.innerHTML = "<br>영어와 숫자를 6~19자리까지 입력하세요.";
    return false
  }

  return regExp.test(asValue);
}

/*비밀번호 체크*/
function isPassword(asValue) {
  let regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
  let alertSpace = document.getElementById("passAlert");

  if (regExp.test(asValue)) {
    joinPassElement.style.border = "1px solid black";
    alertSpace.innerHTML = "";
    return true;
  } else {
    joinPassElement.style.border = "2px solid red";
    alertSpace.innerHTML = "<br>영어, 숫자, 특수 문자(1개이상) 혼합해서 9~16자리까지 입력하세요.";
    return false
  }

  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

/*비밀번호 체크*/
function passwordConfirm() {
  let passConfirm = document.getElementById("joinConfirmUserPass");
  let pass1 = document.getElementById("joinUserPass").value;
  let pass2 = passConfirm.value;
  let alertSpace = document.getElementById("passConfirmAlert");

  if (pass1 === pass2) {
    passConfirm.style.border = "1px solid black";
    alertSpace.innerHTML = "";
    return true;
  } else {
    passConfirm.style.border = "2px solid red";
    alertSpace.innerHTML = "<br>비밀번호가 일치하지 않습니다.";
    return false
  }
}

/*이름 체크*/
function isName(asValue) {
  let regExp = /^[a-zA-Z가-힣][a-zA-Z가-힣]*$/;
  let inputSpace = document.getElementById("joinUserName");
  let alertSpace = document.getElementById("nameAlert");

  if (regExp.test(asValue)) {
    inputSpace.style.border = "1px solid black";
    alertSpace.innerHTML = "";
    return true;
  } else {
    inputSpace.style.border = "2px solid red";
    alertSpace.innerHTML = "<br>한글 또는 영어만 입력하세요.";
    return false
  }
}

function endCheck() {
  if (isId(document.getElementById("id").value) == false) {
    alert("아이디체크");
  } else if (isPassword(document.getElementById("pass").value) == false) {
    alert("비밀번호체크");
  }
}

function changeLoginPage() {
  const loginPage = document.querySelector('#info-wrap4');
  const joinPage = document.querySelector('#info-wrap5');
  clearInput();
  loginPage.style.visibility = 'visible';
  joinPage.style.visibility = 'hidden';
}

function clearInput() {
  let text = document.querySelectorAll("input[type='text']");
  let pass = document.querySelectorAll("input[type='password']");
  let tel = document.querySelectorAll("input[type='tel']");

  for (let i = 0; i < text.length; i++) {
    text[i].value = "";
  }
  for (let i = 0; i < pass.length; i++) {
    pass[i].value = "";
  }
  for (let i = 0; i < tel.length; i++) {
    tel[i].value = "";
  }
}