const joinIdElement = document.querySelector('#joinUserId');
const joinPassElement = document.querySelector('#joinUserPass');
const joinPassConfirm = document.querySelector('#joinConfirmUserPass');
const joinName = document.querySelector('#joinUserName');
const joinPhNum = document.querySelector('#joinPhNum');

function hiddenPage() {
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
      console.log(data);
    })
    .catch((e) => {
      console.log("로그인 체크 실패");
      console.log(e);
    });
}

function onClickJoin() {
  joinFetch();
}

/*아이디 체크*/
function isId(asValue) {
  let regExp = /^[a-z]+[a-z0-9]{5,19}$/g;
  let inputSpace = document.getElementById("id");
  let alertSpace = document.getElementById("idAlert");

  if (regExp.test(asValue)) {
    inputSpace.style.border = "1px solid black";
    alertSpace.innerHTML = "";
    return true;
  } else {
    inputSpace.style.border = "2px solid red";
    alertSpace.innerHTML = "<br>영어와 숫자를 6~19자리까지 입력하세요.";
    return false
  }

  return regExp.test(asValue);
}

/*비밀번호 체크*/
function isPassword(asValue) {
  let regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
  let inputSpace = document.getElementById("pass");
  let alertSpace = document.getElementById("passAlert");

  if (regExp.test(asValue)) {
    inputSpace.style.border = "1px solid black";
    alertSpace.innerHTML = "";
    return true;
  } else {
    inputSpace.style.border = "2px solid red";
    alertSpace.innerHTML = "<br>영어, 숫자, 특수 문자(1개이상) 혼합해서 9~16자리까지 입력하세요.";
    return false
  }

  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

/*비밀번호 체크*/
function passwordConfirm() {
  let passConfirm = document.getElementById("passConfirm");
  let pass1 = document.getElementById("pass").value;
  let pass2 = passConfirm.value;
  let alertSpace = document.getElementById("passConfirmAlert");

  if (pass1 !== pass2) {
    passConfirm.style.border = "2px solid red";
    alertSpace.innerHTML = "<br>비밀번호가 일치하지 않습니다.";
    return false
  }
}

/*이름 체크*/
function isName(asValue) {
  let regExp = /^[a-zA-Z가-힣][a-zA-Z가-힣]*$/;
  let inputSpace = document.getElementById("name");
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