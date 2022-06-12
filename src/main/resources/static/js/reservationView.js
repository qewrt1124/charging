let nowPage = 1;
let totalPage = 0;
let pageNumHtml;
const pageButton = document.querySelector('#reservationView-Button-wrap');

function getReservationView(mid) {
  fetch("/reservationView", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(makeReservationViewParam(mid)),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      getEndPage(mid);
      makeReservationList(data);
    })
    .catch((e) => {
      console.log("예약리스트 가져오기 실패");
      console.log(e);
    });
}

function makeReservationViewParam(mid) {
  let list = {
    "mid": mid
  }

  return list;
}

function makeReservationList(e) {

  const reservationViewTable = document.querySelector('#reservationView-table');

  reservationViewTable.innerHTML = `
      <tr>
        <td>글번호</td>
        <td>충전소이름</td>
        <td>충전기번호</td>
        <td>예약날짜</td>
        <td>예약시간</td>
        <td>쿠폰번호</td>
      </tr>
  `;

  for (let i = 0; i < e.length; i++) {
    reservationViewTable.innerHTML += `
      <tr>
        <td>${e[i].rid}</td>
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

function showReservationTime(e) {
  let time = e.startTime + ' ~ ' + e.endTime + '시';

  return time;
}

function makePageNumber(start, endPage) {
  pageButton.innerHTML = `
    <button><</button>
  `;

  if (start % 5 > 0) {
    if ((start + 4) <= endPage) {
      for (let i = start; i <= start + 4; i++) {
        pageNumHtml += `
        <button>${i}</button>
      `;
      }
    } else {
      for (let i = start; i <= endPage; i++) {
        pageNumHtml += `
        <button>${i}</button>
      `;
      }
    }
  }

  pageButton.innerHTML += `
    <button>></button>
  `;
}

function makePageNumJson(mid, pageNumber) {

  let pageJson = {
    'mid': mid,
    'pageNumber': pageNumber
  }

  return pageJson;
}

function getEndPage(mid) {
  fetch("/reservationViewCount", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(makeReservationViewParam(mid)),
  })
    .then((res) => res.json())
    .then((data) => {
      makeFirstPage(data);
    })
    .catch((e) => {
      console.log("예약리스트 가져오기 실패");
      console.log(e);
    });
}

function makeFirstPage(endPage) {
  let endPageNum1 = endPage / 10;
  let endPageNum2 = endPage % 10;

  pageButton.innerHTML = `
    <button><</button>
  `;

  if ((endPageNum1 < 5) && (endPageNum2 > 0)) {
    for (let i = 1; i <= endPageNum1 + 1; i++) {
      pageButton.innerHTML += `
        <button onclick="getNowPageList(${midNum}, ${i})">${i}</button>
      `;
    }
  } else if ((endPageNum1 < 5) && (endPageNum2 === 0)) {
    for (let i = 1; i <= endPageNum1; i++) {
      pageButton.innerHTML += `
        <button onclick="getNowPageList(${midNum}, ${i})">${i}</button>
      `;
    }
  } else if ((endPageNum1 > 5)) {
    for (let i = 1; i <= 5; i++) {
      pageButton.innerHTML += `
        <button onclick="getNowPageList(${midNum}, ${i})">${i}</button>
      `;
    }
  }

  pageButton.innerHTML += `
    <button>></button>
  `;
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
      console.log(data);
    })
    .catch((e) => {
      console.log("예약리스트 가져오기 실패");
      console.log(e);
    });
}