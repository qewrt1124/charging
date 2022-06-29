// 닫기 버튼
function exitButton() {
  const stationInfoPage = document.querySelector("#info-wrap1");
  const reservationPage = document.querySelector("#info-wrap2");
  stationInfoPage.style.visibility = "hidden";
  reservationPage.style.visibility = "hidden";
}

// 충전소 정보(stationInfo) 내용 갈아 끼기
function chageStatinInfo(e) {
  let able = 0;
  const totalCharging = document.querySelector("#totalCharging");
  const chargingAble = document.querySelector("#chargingAble");
  const statNm = document.querySelector("#stationInfo-top-title-content");
  // const statUpdDt = document.querySelector(
  //   "#stationInfo-top-title-update-content"
  // );
  const addr = document.querySelector("#stationInfo-top-title-detail-addr");
  const busiCall = document.querySelector(
    "#stationInfo-top-title-detail-busiCall"
  );
  const bnm = document.querySelector("#stationInfo-middle-stationInfo-bnm");
  const useTime = document.querySelector(
    "#stationInfo-middle-stationInfo-useTime"
  );
  const reservation = document.querySelector(
    "#stationInfo-bottom-chargingStatus-detail-table"
  );

  selectStatNm = e[0].statNm;
  totalCharging.innerText = `전체 ${e.length}대`;
  statNm.innerText = `${e[0].statNm}`;
  // statUpdDt.innerText = `${e[0].statUpdDt}`;
  addr.innerText = `${e[0].addr}`;
  busiCall.innerText = `${e[0].busiCall}`;
  bnm.innerText = `${e[0].bnm}`;
  useTime.innerText = `${e[0].bnm}`;

  addrInfo = e[0].statNm;
  resStatId = e[0].statId;

  reservation.innerHTML = "";

  for (let i = 0; i < e.length; i++) {
    if (!(e[i].stat === 2 || e[i].stat === 3)) {
      able++;
    }
  }

  chargingAble.innerText = `충전가능 ${able}대`;
  // 충전소 정보(stationInfo) 표시하는 쪽의 충전기 예약버튼
  for (let i = 0; i < e.length; i++) {
    reservation.innerHTML +=
      `
      <tr>
        <td class="stationInfo-reservation-check">
        <button onclick="ClickedReservation('${e[i].chgerId}', getToday(), '${e[i].statId}', '${e[i].chgerType}', ${mId})">예약하기</button>
        </td>
        <td class="stationInfo-bottom-chargingStatus-adapter">
          <ul>
            ` +
      GetChargeInfo(e[i].chgerType) +
      `
          </ul>
        </td>
      </tr>
      `;
  }
}

// 충전소 정보(stationInfo)의 충전기타입 체크
function GetChargeInfo(chrgId) {
  let ac = "<li><span style='color: blue'>AC3상</span></li>";
  let dcCombo = "<li><span style='color: blue'>DC콤보</span></li>";
  let dcCha = "<li><span style='color: blue'>DC차데모</span></li>";
  let slow = "<li><span style='color: blue'>AC완속</span></li>";

  //dcCha
  if (!"01|05|06".includes(chrgId)) {
    dcCha = "<li><span style='color: gray;'>DC차데모</span></li>";
  }
  //dcCombo
  if (!"04|05|06".includes(chrgId)) {
    dcCombo = "<li><span style='color: gray;'>DC콤보</span></li>";
  }
  //ac
  if (!"03|06|07".includes(chrgId)) {
    ac = "<li><span style='color: gray;'>AC3상</span></li>";
  }
  //slow
  if (!"02".includes(chrgId)) {
    slow = "<li><span style='color: gray;'>AC완속</span></li>";
  }

  return dcCha + dcCombo + ac + slow;
}

async function onclickChargingInfo(statId, mId) {
  await getChargingInfo(statId, mId);
  await getFavoriteCheck(mId, statId);
}

// 충전소의 번호(statId)로 충전소 정보 전부 다 가져오기(fetch)
function getChargingInfo(statId, mId) {
  fetch("/chargingInfo?statId=" + statId, {
    method: "get",
    dataType: "json",
  })
    .then((res) => res.json())
    .then((data) => {
      chageStatinInfo(data);
      getDetail();
      console.log("완료");
    })
    .catch((e) => {
      console.log("충전소 번호로 충전소 정보 가져오기 실패");
      console.log(e);
    });
}

// 맵 리스트 충전소 이름 눌렀을때 함수
function ClickedStationName(lat, lng, statId, i) {
  for (let j = 0; j < overlays.length; j++) {
    closeOverlay(j);
  }

  panTo(lat, lng);

  overlays[i].setMap(map);
}

// 예약하기 눌렀을때 충전기번호에 해당하는 예약 내역가져오기
async function ClickedReservation(chgerId, date, statId, chgerType, mId) {
  if (mId !== "null") {
    modifyCheck = false;
    clearStartPercentage();
    removerOption();
    removeReservationTime();
    await getReservationList(chgerId, date, statId);
    await getReservationStatIdInfo(chgerId, date, statId);
    selectChgerId = chgerId;
    selectStatId = statId;
    selectChgerType = chgerType;
    await getCarList(null, selectChgerType);
  } else {
    console.log(mId);
    alert("로그인 후 예약이 가능합니다.")
  }
}

// 충전소 상세정보 창 닫고 예약페이지 여는 함수
function openReservationPage() {
  const stationInfoPage = document.querySelector("#info-wrap1");
  const reservationPage = document.querySelector("#info-wrap2");
  stationInfoPage.style.visibility = "hidden";
  reservationPage.style.visibility = "visible";
}

// 현재 날짜 알아내기
function getToday() {
  let today = new Date();
  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let day = ("0" + today.getDate()).slice(-2);

  let dateString = year + "-" + month + "-" + day;

  let hours = ("0" + today.getHours()).slice(-2);

  return dateString;
}

function makeFavoriteDto(mid, statId) {
  let favoriteDto = {
    mid: mid,
    statId: statId
  }

  return favoriteDto;
}

function getFavoriteCheck(mid, statId) {
  fetch("/getFavoriteCheck", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(makeFavoriteDto(mid, statId)),
  })
    .then((res) => res.json())
    .then((data) => {
      favoriteInnerHtml(data, mid, statId);
    })
    .catch((e) => {
      console.log("즐겨찾기 정보 가져오기 실패");
      console.log(e);
    });
}

async function favoriteInnerHtml(data, mid, statId) {
  const favoriteLocation = document.querySelector("#stationInfo-top-title-favorite");
  if (data.length === 0) {
    favoriteLocation.innerHTML = `
    <img class="stationInfo-favorite-icon" src="/image/favorites-lcon-empty.png" onclick="onclickAddFavoriteButton(${mid}, '${statId}')">
    `;
    favoriteChecking = false;
  } else {
    favoriteLocation.innerHTML = `
    <img class="stationInfo-favorite-icon" src="/image/favorites-lcon-fullFill.png" onclick="onclickAddFavoriteButton(${mid}, '${statId}')">
    `;
    favoriteChecking = true;
  }
}

async function onclickAddFavoriteButton(mid, statId) {
  if (favoriteChecking == false) {
    await addFavorite(mid, statId);
  } else {
    await deleteFavorite(mid, statId);
  }
}

function addFavorite(mid, statId) {
  fetch("/addFavorite", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(makeFavoriteDto(mid, statId)),
  })
    .then(() => {
      const favoriteLocation = document.querySelector("#stationInfo-top-title-favorite");
      favoriteLocation.innerHTML = `
    <img class="stationInfo-favorite-icon" src="/image/favorites-lcon-fullFill.png" onclick="onclickAddFavoriteButton(${mid}, '${statId}')">
    `;
      favoriteChecking = true;
    })
    .catch((e) => {
      console.log("즐겨찾기 추가 실패");
      console.log(e);
    });
}

function deleteFavorite(mid, statId) {
  fetch("/deleteFavorite", {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(makeFavoriteDto(mid, statId)),
  })
    .then(() => {
      const favoriteLocation = document.querySelector("#stationInfo-top-title-favorite");
      favoriteLocation.innerHTML = `
    <img class="stationInfo-favorite-icon" src="/image/favorites-lcon-empty.png" onclick="onclickAddFavoriteButton(${mid}, '${statId}')">
    `;
      favoriteChecking = false;
    })
    .catch((e) => {
      console.log("즐겨찾기 삭제 실패");
      console.log(e);
    });
}