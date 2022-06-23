let endPage;
const pageButton = document.querySelector('#reservationView-Button-wrap');

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

function makeReservationList(e, pageNumber) {

  const reservationViewTable = document.querySelector('#reservationView-table');

  reservationViewTable.innerHTML = `
      <tr>
        <th style="width: 70px; height: 32px">글번호</th>
        <th style="width: 240px">충전소이름</th>
        <th style="width: 80px">충전기</th>
        <th style="width: 130px">예약날짜</th>
        <th style="width: 110px">예약시간</th>
        <th style="width: 300px">쿠폰번호</th>
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
    })
    .catch((e) => {
      console.log("예약리스트 가져오기 실패");
      console.log(e);
    });
}

function makePagingButton(endPage, pageNumber) {
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

  for (let i = 0; i < pageButtonAll.length; i++) {
    pageButtonAll[i].style.backgroundColor = "white";
  }

  for (let i = 0; i < pageButtonAll.length; i++) {
    if (pageButtonAll[i].innerText == pageNumber) {
      pageButtonAll[i].style.backgroundColor = "grey";
    }
  }
}

function onclickPrePageButton(mid) {
  let contentNumber = document.querySelector('.contentNumber').innerText;
  let nowPage = parseInt(contentNumber / 10) + 1;

  pageButtonChangeColor(nowPage);

  let preValue = nowPage % 5;

  if (preValue === 1 && nowPage === 1) {
    alert("첫 페이지 입니다.")
  } else {
    getReservationView(mid, nowPage - 1);
  }
}

function onclickNextPageButton(mid, endPage) {
  let contentNumber = document.querySelector('.contentNumber').innerText;
  let nowPage = parseInt(contentNumber / 10) + 1;

  pageButtonChangeColor(nowPage);

  if (nowPage === endPage) {
    alert("마지막 페이지 입니다.")
  } else {
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
  getReservationView(mid);
  const completePage = document.querySelector('#info-wrap3');
  const reservationListPage = document.querySelector('#info-wrap7');
  completePage.style.visibility = 'hidden';
  reservationListPage.style.visibility = 'visible';
}

function reservationViewCloseButton() {
  const reservationListPage = document.querySelector('#info-wrap7');
  reservationListPage.style.visibility = 'hidden';
}