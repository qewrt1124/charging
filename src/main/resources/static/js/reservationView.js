let endPage;
// const pageButton = document.querySelector('#reservationView-Button-wrap');

function endPageValue(e) {
  let endPageNum3 = e / 10;
  if (endPageNum3 % 1 !== 0) {
    endPageNum3 = parseInt(endPageNum3) + 1;
  } else {
    endPageNum3 = parseInt(endPageNum3);
  }

  return endPageNum3;
}

function getReservationView(mid, pageNumber) {
  fetch("/reservationView", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(makeReservationViewParam(mid, pageNumber)),
  })
    .then((res) => res.json())
    .then((data) => {
      getEndPage(mid, pageNumber);
      makeReservationList(data, pageNumber);
    })
    .catch((e) => {
      console.log("예약리스트 가져오기 실패");
      console.log(e);
    });
}

function makeReservationViewParam(mid, pageNumber) {
  let list = {
    "mid": mid,
    "pageNumber": pageNumber
  }

  return list;
}

// 예약내역확인 리스트 만들기
function makeReservationList(e, pageNumber) {
  const reservationViewTable = document.querySelector('#reservationView-table');

  console.log("예약내역확인 : " + e);

  reservationViewTable.innerHTML = `
      <tr>
        <th style="width: 70px; height: 32px">글번호</th>
        <th style="width: 240px">충전소이름</th>
        <th style="width: 80px">충전기</th>
        <th style="width: 130px">예약날짜</th>
        <th style="width: 110px">예약시간</th>
        <th style="width: 300px">쿠폰번호</th>
        <th style="width: 100px">수정/삭제</th>
      </tr>
  `;

  for (let i = 0; i < e.length; i++) {
    reservationViewTable.innerHTML += `
      <tr>
        <td style="height: 30px" class="contentNumber">
      `
      + pageNumberValue(i, pageNumber) +
      `
        </td>
        <td>${e[i].statNm}</td>
        <td>${e[i].chgerId}</td>
        <td>${e[i].resDate}</td>
        <td>
      `
      + showReservationTime(e[i]) +
      `
        </td>
        <td>${e[i].couponNum}</td>
        <td>
          <button class="reservationView-common-button" onclick="onClickModifyReservationButton(${mId}, '${e[i].chgerId}', '${e[i].resDate}', '${e[i].statId}', '${e[i].statNm}','${e[i].couponNum}')">예약수정</button>
          <button class="reservationView-common-button" style="margin-top: 8px" onclick="deleteReservationButton('${mId}', '${e[i].couponNum}')">예약취소</button>
        </td>
      </tr>
  `;
  }
}

function pageNumberValue(i, pageNumber) {
  let pageNum = (pageNumber - 1) * 10 + i + 1;

  return pageNum;
}

function showReservationTime(e) {
  let time = e.startTime + ' ~ ' + e.endTime + '시';

  return time;
}

function makePageNumJson(mid, pageNumber) {

  let pageJson = {
    'mid': mid,
    'pageNumber': pageNumber
  }

  return pageJson;
}

function getEndPage(mid, pageNumber) {
  fetch("/reservationViewCount", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(makeReservationViewParam(mid)),
  })
    .then((res) => res.json())
    .then((data) => {
      endPage = endPageValue(data);
      makePagingButton(data, pageNumber);
      pageButtonChangeColor(pageNumber);
    })
    .catch((e) => {
      console.log("예약리스트 가져오기 실패");
      console.log(e);
    });
}

function makePagingButton(endPage, pageNumber) {
  const pageButton = document.querySelector('#reservationView-Button-wrap');

  let endPageNum3 = endPage / 10;
  if (endPageNum3 % 1 !== 0) {
    endPageNum3 = parseInt(endPageNum3) + 1;
  }
  let endPageNum4 = parseInt(endPageNum3 / 5) * 5 + 1;
  let endPageNum5 = parseInt(endPageNum3 / 5 + 1) * 5;
  let buttonStartNumber;
  if (pageNumber % 10 === 0) {
    buttonStartNumber = pageNumber - 4;
  } else {
    buttonStartNumber = parseInt(pageNumber / 5) * 5 + 1;
  }

  pageButton.innerHTML = `
    <button onclick="onclickPrePageButton(${mId})"><</button>
  `;
  if ((endPageNum3 < 5)) {
    for (let i = 1; i <= endPageNum3; i++) {
      pageButtonHtml(pageButton, i);
    }
  }
    // else if ((endPageNum1 < 5) && (endPageNum2 === 0)) {
    //   for (let i = 1; i <= endPageNum1; i++) {
    //     console.log("2");
    //     pageButton.innerHTML += `
    //       <button onclick="getNowPageList(${midNum}, ${i})">${i}</button>
    //     `;
    //   }
  // }
  else if ((endPageNum3 > 5) && (pageNumber >= 6) && (buttonStartNumber + 4 <= endPageNum3)) {
    for (let i = buttonStartNumber; i <= buttonStartNumber + 4; i++) {
      pageButtonHtml(pageButton, i);
    }
  } else if ((endPageNum3 > 5) && (pageNumber < 6) && (pageNumber + 4 <= endPageNum3)) {
    for (let i = 1; i <= 5; i++) {
      pageButtonHtml(pageButton, i);
    }
  } else if ((endPageNum3 > 5) && (pageNumber >= 6) && (pageNumber + 4 > endPageNum3)) {
    for (let i = buttonStartNumber; i <= endPageNum3; i++) {
      pageButtonHtml(pageButton, i);
    }
  } else if ((endPageNum3 > 5) && (pageNumber >= 6) && (endPageNum4 <= pageNumber) && (endPageNum4 <= pageNumber + 4 <= endPageNum5)) {
    for (let i = buttonStartNumber; i <= endPageNum3; i++) {
      pageButtonHtml(pageButton, i);
    }
  }

  pageButton.innerHTML += `
    <button onclick="onclickNextPageButton(${mId}, endPage)">></button>
  `;
}

function pageButtonHtml(pageButton, i) {
  pageButton.innerHTML += `
        <button class="pageNumberButton" onclick="getNowPageList(${midNum}, ${i})">${i}</button>
      `;
}

function pageButtonChangeColor(pageNumber) {
  let pageButtonAll = document.querySelectorAll(".pageNumberButton");

  console.log("페이지 버튼 색 변환 동작 확인");

  for (let i = 0; i < pageButtonAll.length; i++) {
    pageButtonAll[i].style.backgroundColor = "white";
  }

  for (let i = 0; i < pageButtonAll.length; i++) {
    if (pageButtonAll[i].innerText == pageNumber) {
      pageButtonAll[i].style.backgroundColor = "grey";
    }
  }
}

// 페이지번호 알아내기
function findNowPage() {
  let contentNumber = document.querySelector('.contentNumber').innerText;
  let nowPage = parseInt(contentNumber / 10) + 1;

  return nowPage;
}

// 이전페이지로 버튼
function onclickPrePageButton(mid) {
  let nowPage = findNowPage();

  let preValue = nowPage % 5;

  if (preValue === 1 && nowPage === 1) {
    alert("첫 페이지 입니다.")
    pageButtonChangeColor(nowPage);
  } else {
    // pageButtonChangeColor(nowPage - 1);
    getReservationView(mid, nowPage - 1);
  }
}

function onclickNextPageButton(mid, endPage) {
  let nowPage = findNowPage();

  if (nowPage === endPage) {
    alert("마지막 페이지 입니다.")
    pageButtonChangeColor(nowPage);
  } else {
    // pageButtonChangeColor(nowPage + 1);
    getReservationView(mid, nowPage + 1);
  }
}

function getNowPageList(mid, pageNumber) {
  fetch("/reservationView", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(makePageNumJson(mid, pageNumber)),
  })
    .then((res) => res.json())
    .then((data) => {
      pageButtonChangeColor(pageNumber);
      makeReservationList(data, pageNumber);
    })
    .catch((e) => {
      console.log("예약리스트 가져오기 실패");
      console.log(e);
    });
}

function onClickShowReservationList(mid) {
  contentNumber = 1;
  const pageNumber = 1;
  getReservationView(mid, pageNumber);
  const completePage = document.querySelector('#info-wrap3');
  const reservationListPage = document.querySelector('#info-wrap7');
  completePage.style.visibility = 'hidden';
  reservationListPage.style.visibility = 'visible';
}

function reservationViewCloseButton() {
  const reservationListPage = document.querySelector('#info-wrap7');
  reservationListPage.style.visibility = 'hidden';
}

function deleteReservation(couponNum, mid, pageNumber) {
  fetch("/deleteReservation", {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(makeModifyReservationJson(null, null, couponNum)),
  })
    .then(() => {
      getReservationView(mid, pageNumber);
    })
    .catch((e) => {
      console.log("예약리스트 가져오기 실패");
      console.log(e);
    });
}

// 페이지 수정 및 삭제 Json
function makeModifyReservationJson(mid, resDate, couponNum) {
  let list = {
    "mid": mid,
    "resDate": resDate,
    "couponNum": couponNum
  }

  return list;
}

// 예약 삭제 버튼
function deleteReservationButton(mid, couponNum) {
  let pageNumber = findNowPage();
  if (confirm("취소하시겠습니까?")) {
    deleteReservation(couponNum, mid, pageNumber);
  }
}

function getSameCouponNumList(mid, resDate, couponNum) {
  fetch("/getSameCouponNumList", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(makeModifyReservationJson(mid, resDate, couponNum)),
  })
    .then((res) => res.json())
    .then((data) => {
      clearStartPercentage();
      removerOption();
      removeReservationTime();
      getCarList();
      activateModifyTime(data);
      changeInsertReservationButton(resDate, couponNum);
      console.log("활성화 확인");
    })
    .catch((e) => {
      alert("잠시 후 다시 시도해주세요.");
      console.log("예약 수정 페이지 실패");
      console.log(e);
    });
}

async function onClickModifyReservationButton(mid, chgerId, resDate, statId, statNm, couponNum) {
  if (confirm("예약을 변경하시겠습니까?")) {
    modifyCheck = true;
    // eventStartDate = resDate;
    showDate = resDate;
    selectChgerId = chgerId;
    selectStatId = statId;
    selectCouponNum = couponNum;
    selectStatNm = statNm;
    await clearReservationPage();
    await getReservationList(chgerId, resDate, statId);
    await getReservationStatIdInfo(chgerId, resDate, statId);
    await getSameCouponNumList(mid, resDate, couponNum);
    // modifyReservationPage(couponNum);
    reservationViewCloseButton();
    completePageExit();
  }
}

// 예약수정 시 수정시간 활성화
function activateModifyTime(modifyTime) {
  console.log("예약 활성화 확인");
  let selectAll = document.querySelectorAll("[name='tId']");

  if (modifyCheck != false) {
    for (let i = 0; i < modifyTime.length; i++) {
      for (let j = 0; j < selectAll.length; j++) {
        if (modifyTime[i].endTime == selectAll[j].value) {
          selectAll[j].removeAttribute("disabled");
          selectAll[j].checked = true;
          selectAll[j].nextElementSibling.style.backgroundColor = "blue";
        }
      }
    }
  }
}

// 예약수정 눌렀을 때 예약페이지 버튼 수정
function modifyReservationPage(couponNum) {
  let reservationButtonWrap = document.querySelector("#reservation-button-wrap");
  reservationButtonWrap.innerHTML = `
        <button id="reservation-button" onclick="onClickModifyReservatonButton(${mId}, '${couponNum}')">예약변경</button>
        <button id="reservation-cancle-button" onclick="deleteReservation('${couponNum}')">예약취소</button>
        `;
}

function listConfirm(list) {
  for (let i = 0; i < list.length; i++) {
    console.log("list[" + i + "] : " + list[i].endTime);
  }
}

function onClickModifyReservatonButton(mid, couponNum, resDate, chgerType) {
  let checkedList = document.querySelectorAll("input[type='checkbox']:checked");
  let overPrice = document.querySelector("#over-charging-payment");

  if (timeResult === false) {
    alert("시간을 선택하고 선택완료를 눌러주세요.")
  } else if (timeResult === true && selectCheck === false) {
    alert("다른 옵션들을 선택하고 입력완료를 눌러주세요");
  } else if (JSON.stringify(timeResultList) !== JSON.stringify(checkedList)) {
    selectCheck = false;
    timeResult = false;
    timeResultList = 1;
    clearTimeStamp();
    alert("시간이 수정 되었습니다. 선택완료를 다시 눌러주세요.")
  } else if (timeResult === true && selectCheck === true && JSON.stringify(timeResultList) === JSON.stringify(checkedList) && overPrice.innerText !== "") {
    if (confirm("초과 금액이 발생했습니다.")) {
      modifyReservation(mid, couponNum, resDate, chgerType);
    }
  } else if (timeResult === true && selectCheck === true && JSON.stringify(timeResultList) === JSON.stringify(checkedList)) {
    modifyReservation(mid, couponNum, resDate, chgerType);
  }
}

function modifyReservation(mid, couponNum, resDate, chgerType) {
  fetch("/modifyReservation", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservationInsertList(mid, couponNum, resDate, chgerType)),
  })
    .then((res) => res.json())
    .then((data) => {
      changeCompletePage(data);
      reservationCheck();
    })
    .catch((e) => {
      alert("잠시 후 다시 시도해주세요.");
      console.log("예약하기 실패");
      console.log(e);
    });
}