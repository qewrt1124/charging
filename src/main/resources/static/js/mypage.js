function onClinkMyPageReservation(mId) {
  // contentNumber = 1;
  const reservationView = document.querySelector('#info-wrap7');
  const pageNumber = 1;
  getReservationView(mId, pageNumber);
  reservationView.style.visibility = 'visible';
}

function logout() {
  fetch("/logout", {
    method: "post",
  })
    .then(() => {
      pageReload();
    })
    .catch((e) => {
      console.log("예약리스트 가져오기 실패");
      console.log(e);
    });
}

function deleteMember(mid) {
  fetch("/deleteMember", {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(makeReservationViewParam(mid)),
  })
    .then((res) => res.json())
    .then((data) => {
      pageReload();
    })
    .catch((e) => {
      console.log("예약리스트 가져오기 실패");
      console.log(e);
    });
}

function onClickFavorite(mId) {
  // contentNumber = 1;
  const favoritePage = document.querySelector('#info-wrap8');
  const pageNumber = 1;
  getFavoriteList(mId, pageNumber);
  favoritePage.style.visibility = 'visible';
}


function getFavoriteList(mid, pageNumber) {
  fetch("/getFavoriteList", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(makeReservationViewParam(mid, pageNumber)),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      getFavoriteEndPage(mid, pageNumber);
      makeFavoriteList(data, pageNumber);
    })
    .catch((e) => {
      console.log("즐겨찾기 목록 가져오기 실패");
      console.log(e);
    });
}

function getFavoriteEndPage(mid, pageNumber) {
  fetch("/favoriteCount", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(makeReservationViewParam(mid)),
  })
    .then((res) => res.json())
    .then((data) => {
      endPage = endPageValue(data);
      makeFavoritePagingButton(data, pageNumber);
      pageButtonChangeColor(pageNumber);
    })
    .catch((e) => {
      console.log("예약리스트 가져오기 실패");
      console.log(e);
    });
}

// 예약내역확인 리스트 만들기
function makeFavoriteList(e, pageNumber) {
  const favoriteListTable = document.querySelector('#favoriteList-table');

  favoriteListTable.innerHTML = `
      <tr>
        <th style="width: 70px; height: 32px">글번호</th>
        <th style="width: 350px">충전소이름</th>
        <th style="width: 450px">충전소주소</th>
        <th style="width: 80px">충전타입</th>
        <th style="width: 50px">삭제</th>
      </tr>
  `;

  for (let i = 0; i < e.length; i++) {
    favoriteListTable.innerHTML += `
      <tr>
        <td style="height: 30px" class="contentNumber">
      `
      + pageNumberValue(i, pageNumber) +
      `
        </td>
        <td onclick="onClickStatNm('${e[i].statId}', mId)">${e[i].statNm}</td>
        <td>${e[i].addr}</td>
        <td>${e[i].chgerId}</td>
        <td>
          <button class="reservationView-common-button" onclick="onclickDeleteFavorite(${mId}, '${e[i].statId}')">삭제</button>
        </td>
      </tr>
  `;
  }
}

function onclickDeleteFavorite(mid, statId) {
  if (confirm("즐겨찾기를 삭제하시겠습니까?")) {
    deleteFavorite(mid, statId);
  }
}

function showFavoriteListPage() {
  const favoriteListPage = document.querySelector("#info-wrap8");
  favoriteListPage.style.visibility = "visible";
}

function closeFavoriteListPage() {
  const favoriteListPage = document.querySelector("#info-wrap8");
  favoriteListPage.style.visibility = "hidden";
}

function makeFavoritePagingButton(endPage, pageNumber) {
  const pageButton = document.querySelector("#favoriteList-Button-wrap");
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
    <button onclick="onclickFavoritePrePageButton(${mId})"><</button>
  `;
  if ((endPageNum3 < 5)) {
    for (let i = 1; i <= endPageNum3; i++) {
      pageFavoriteButtonHtml(pageButton, i);
    }
  }

  else if ((endPageNum3 > 5) && (pageNumber >= 6) && (buttonStartNumber + 4 <= endPageNum3)) {
    for (let i = buttonStartNumber; i <= buttonStartNumber + 4; i++) {
      pageFavoriteButtonHtml(pageButton, i);
    }
  } else if ((endPageNum3 > 5) && (pageNumber < 6) && (pageNumber + 4 <= endPageNum3)) {
    for (let i = 1; i <= 5; i++) {
      pageFavoriteButtonHtml(pageButton, i);
    }
  } else if ((endPageNum3 > 5) && (pageNumber >= 6) && (pageNumber + 4 > endPageNum3)) {
    for (let i = buttonStartNumber; i <= endPageNum3; i++) {
      pageFavoriteButtonHtml(pageButton, i);
    }
  } else if ((endPageNum3 > 5) && (pageNumber >= 6) && (endPageNum4 <= pageNumber) && (endPageNum4 <= pageNumber + 4 <= endPageNum5)) {
    for (let i = buttonStartNumber; i <= endPageNum3; i++) {
      pageFavoriteButtonHtml(pageButton, i);
    }
  }

  pageButton.innerHTML += `
    <button onclick="onclickFavoriteNextPageButton(${mId}, endPage)">></button>
  `;
}

// 이전페이지로 버튼
function onclickFavoritePrePageButton(mid) {
  let nowPage = findNowPage();

  let preValue = nowPage % 5;

  if (preValue === 1 && nowPage === 1) {
    alert("첫 페이지 입니다.")
    pageButtonChangeColor(nowPage);
  } else {
    getReservationView(mid, nowPage - 1);
  }
}

function onclickFavoriteNextPageButton(mid, endPage) {
  let nowPage = findNowPage();

  if (nowPage === endPage) {
    alert("마지막 페이지 입니다.")
    pageButtonChangeColor(nowPage);
  } else {
    getReservationView(mid, nowPage + 1);
  }
}

function pageFavoriteButtonHtml(pageButton, i) {
  pageButton.innerHTML += `
        <button class="pageNumberButton" onclick="getFavoriteNowPageList(${midNum}, ${i})">${i}</button>
      `;
}

function getFavoriteNowPageList(mid, pageNumber) {
  fetch("/getFavoriteList", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(makePageNumJson(mid, pageNumber)),
  })
    .then((res) => res.json())
    .then((data) => {
      pageButtonChangeColor(pageNumber);
      makeFavoriteList(data, pageNumber);
    })
    .catch((e) => {
      console.log("예약리스트 가져오기 실패");
      console.log(e);
    });
}

async function onClickStatNm(statId, mId) {
  await getChargingInfo(statId, mId);
  await getFavoriteCheck(mId, statId);
  await closeFavoriteListPage();
}