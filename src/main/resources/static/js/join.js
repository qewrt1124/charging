const joinIdElement = document.querySelector('#joinUserId');
const joinPassElement = document.querySelector('#joinUserPass');
const joinPassConfirm = document.querySelector('#joinConfirmUserPass');
const joinName = document.querySelector('#joinUserName');
const joinPhNum = document.querySelector('#joinPhNum');
const idAlert = document.querySelector('#idAlert');

let idBoolean;
let passBoolean;
let passConfirmBoolean;
let nameBoolean;
let phNumBoolean;
let duplicateBoolean = false;

function joinBooleanInitialization() {
  idBoolean = false;
  passBoolean = false;
  passConfirmBoolean = false;
  nameBoolean = false;
  phNumBoolean = false;
  duplicateBoolean = false;
}

function moveJoinPage() {
  const loginPage = document.querySelector('#info-wrap4');
  const joinPage = document.querySelector('#info-wrap5');
  clearInput();
  joinBooleanInitialization();
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

/* 회원가입버튼 누르면 다 통과했는지 체크하고 집어 넣음 */
function onClickJoin() {
  let result = booleanCheck();

  if (result === true) {
    joinFetch();
  }
}

/*아이디 체크*/
function isId(asValue) {
  let regExp = /^[a-z]+[a-z0-9]{5,19}$/g;

  if (regExp.test(asValue)) {
    joinIdElement.style.border = "1px solid black";
    idAlert.innerHTML = "";
    idBoolean = true;
    duplicateBoolean = true;
    return true;
  } else {
    joinIdElement.style.border = "2px solid red";
    idAlert.innerHTML = "영어와 숫자를 6~19자리까지 입력하세요.";
    idBoolean = false;
    duplicateBoolean = true;
    alert('아이디 형식이 맞지 않습니다.');
    return false;
  }
}

/*비밀번호 체크*/
function isPassword(asValue) {
  let regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
  let alertSpace = document.getElementById("passAlert");

  if (regExp.test(asValue)) {
    joinPassElement.style.border = "1px solid black";
    alertSpace.innerHTML = "";
    passBoolean = true;
    return true;
  } else {
    joinPassElement.style.border = "2px solid red";
    alertSpace.innerHTML = "영어, 숫자, 특수 문자(1개이상) 혼합해서 9~16자리까지 입력하세요.";
    passBoolean = false;
    return false;
  }
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
    passConfirmBoolean = true;
    return true;
  } else {
    passConfirm.style.border = "2px solid red";
    alertSpace.innerHTML = "비밀번호가 일치하지 않습니다.";
    passConfirmBoolean = false;
    return false;
  }
}

/*이름 체크*/
function isName(asValue) {
  let regExp = /^[a-zA-Z가-힣]*$/;
  let inputSpace = document.getElementById("joinUserName");
  let alertSpace = document.getElementById("nameAlert");

  if (regExp.test(asValue)) {
    inputSpace.style.border = "1px solid black";
    alertSpace.innerHTML = "";
    nameBoolean = true;
    return true;
  } else {
    inputSpace.style.border = "2px solid red";
    alertSpace.innerHTML = "한글 또는 영어만 입력하세요.";
    nameBoolean = false;
    return false;
  }
}

// 핸드폰 번호 체크
function isHpNum() {
  let regExp = /[0-9]{9,11}/g;
  let asValue = joinPhNum.value;
  let alertSpace = document.getElementById("phNumAlert");
  if (regExp.test(asValue)) {
    joinPhNum.style.border = "1px solid black";
    alertSpace.innerHTML = "";
    phNumBoolean = true;
    return true;
  } else {
    joinPhNum.style.border = "2px solid red";
    alertSpace.innerHTML = "10~11자리의 숫자를 입력하세요.";
    phNumBoolean = false;
    return false;
  }
}

// 로그인페이지 전환
function changeLoginPage() {
  const loginPage = document.querySelector('#info-wrap4');
  const joinPage = document.querySelector('#info-wrap5');
  clearInput();
  loginPage.style.visibility = 'visible';
  joinPage.style.visibility = 'hidden';
}

// 인풋창 비우기
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

// 아이디 중복체크 버튼
function duplicationIdCheckButton() {
  let id = document.querySelector('#joinUserId');
  let userIdValue = joinIdElement.value;
  let userIdList = {
    'userId': id.value
  }

  duplicateBoolean = false;

  if (isId(userIdValue)) {
    duplicationIdCheck(userIdList);
  }
}

// 아이디 중복체크 controller
function duplicationIdCheck(userIdList) {
  fetch("/idDuplicateCheck", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userIdList),
  })
    .then((res) => res.json())
    .then((data) => {
      userIdDuplicated(data);
    })
    .catch((e) => {
      console.log("주변 정보 가져오기 실패");
      console.log(e);
    });
}

// 아이디가 중복됬을 때 띄우는 경고창
function userIdDuplicated(e) {
  let result = false;

  if (e === 0) {
    alert("아이디가 중복 됩니다.");
  } else {
    alert("사용 가능한 아이디 입니다.")
    result = true;
  }

  return result;
}

function booleanCheck() {
  let result = false;

  if (idBoolean === false || joinIdElement.value === null || duplicateBoolean === false) {
    alert('아이디 중복체크를 해주세요.')
    joinIdElement.focus();
  } else if (passBoolean === false || joinPassElement.value === null) {
    joinPassElement.focus();
  } else if (passConfirmBoolean === false || joinPassConfirm.value === null) {
    joinPassConfirm.focus();
  } else if (nameBoolean === false || joinName.value === null) {
    joinName.focus();
  } else if (isHpNum() === false || phNumBoolean === false || joinPhNum.value === null) {
    joinPhNum.focus();
  } else {
    result = true;
  }

  return result;
}