// 닫기 버튼
function exitButton() {
  const stationInfoPage = document.querySelector("#info-wrap1");
  const reservationPage = document.querySelector("#info-wrap2");
  stationInfoPage.style.visibility = "hidden";
  reservationPage.style.visibility = "hidden";
}

// 충전소 정보(stationInfo) 내용 갈아 끼기
function chageStatinInfo(e) {
  const statNm = document.querySelector("#stationInfo-top-title-content");
  const statUpdDt = document.querySelector(
    "#stationInfo-top-title-update-content"
  );
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

  statNm.innerText = `${e[0].statNm}`;
  statUpdDt.innerText = `${e[0].statUpdDt}`;
  addr.innerText = `${e[0].addr}`;
  busiCall.innerText = `${e[0].busiCall}`;
  bnm.innerText = `${e[0].bnm}`;
  useTime.innerText = `${e[0].bnm}`;

  addrInfo = e[0].statNm;
  resStatId = e[0].statId;

  reservation.innerHTML = "";

  // 충전소 정보(stationInfo) 표시하는 쪽의 충전기 예약버튼
  for (let i = 0; i < e.length; i++) {
    reservation.innerHTML +=
      `
      <tr>
        <td class="stationInfo-reservation-check">
        <button onclick="ClickedReservation('${e[i].chgerId}', getToday(), '${e[i].statId}', '${e[i].chgerType}')">예약하기</button>
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

// 충전소의 번호(statId)로 충전소 정보 전부 다 가져오기
function getChargingInfo(statId) {
  fetch("/chargingInfo?statId=" + statId, {
    method: "get",
    dataType: "json",
  })
    .then((res) => res.json())
    .then((data) => {
      chageStatinInfo(data);
      getDetail();
    })
    .catch((e) => {
      console.log("충전소 번호로 충전소 정보 가져오기 실패");
      console.log(e);
    });
}

// 맵 리스트 충전소 이름 눌렀을때 함수
function ClickedStationName(lat, lng, statId, i) {
  panTo(lat, lng);

  overlays[i].setMap(map);
}

// 예약하기 눌렀을때 충전기번호에 해당하는 예약 내역가져오기
function ClickedReservation(chgerId, date, statId, chgerType) {
  clearStartPercentage();
  removerOption();
  removeReservationTime();
  getReservationList(chgerId, date, statId);
  selectChgerId = chgerId;
  selectStatId = statId;
  getCarList();
  selectChgerType = chgerType;
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
