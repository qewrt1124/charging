let selectChgerId;
let selectStatId;
let selectChgerType;
let selectDate = getToday();
let resultPrice;
let selectStatNm;

let mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(36.494692, 127.26536), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
  };

let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

let addrInfo;
let chargingNum;
let resStatId;

// 지도를 클릭했을때 클릭한 위치에 마커를 추가하도록 지도에 클릭이벤트를 등록합니다
// kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
//   // 클릭한 위치에 마커를 표시합니다
//   addMarker(mouseEvent.latLng);
// });

// 지도에 표시된 마커 객체를 가지고 있을 배열입니다
let markers = [];

// 마커 하나를 지도위에 표시합니다
// addMarker(new kakao.maps.LatLng(33.450701, 126.570667));

// 지도 타입 변경 컨트롤을 생성한다
let mapTypeControl = new kakao.maps.MapTypeControl();

// 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도에 확대 축소 컨트롤을 생성한다
let zoomControl = new kakao.maps.ZoomControl();

// 지도의 우측에 확대 축소 컨트롤을 추가한다
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

let rangeList = { centerLat: 36.494692, centerLng: 127.26536, level: 3 };

// 지도 레벨, 중심좌표 얻어 오기
kakao.maps.event.addListener(map, "center_changed", function () {
  // 지도의  레벨을 얻어옵니다
  let level = map.getLevel();

  // 지도의 중심좌표를 얻어옵니다
  let latlng = map.getCenter();

  let centerLat = latlng.getLat();
  let centerLng = latlng.getLng();

  // setMarkers(null);

  rangeList = { centerLat: centerLat, centerLng: centerLng, level: level };

  visibleReloadButton();
});

// 최초 마커 찍기
getRangeList(rangeList);

function addChargingStationList(e) {
  let list = document.querySelector("#map-location-list-wrap");
  for (let i = 0; i < e.length; i++) {
    list.innerHTML += `<div class="map-location-list" onclick="panTo(${e[i].lat}, ${e[i].lng})">
        <a href='javascript:void(0);' onclick="ClickedStationName(${e[i].lat}, ${e[i].lng}, '${e[i].statId}', ${i})"><span class="map-location-list-title" style="font-size: 25px;">${e[i].statNm}</span></a>
        <span class="map-location-list-contentOne">${e[i].addr}</span>
        <span class="map-location-list-contentTwo">${e[i].busiCall}</span>
        </div>`;
  }
}

// 맵 왼쪽 충전소 리스트 제거
function delChargingStationList() {
  let list = document.querySelector("#map-location-list-wrap");
  list.innerHTML = "";
}

// 마커를 생성하고 지도위에 표시하는 함수입니다
function addMarker(position) {
  // 마커를 생성합니다
  let marker = new kakao.maps.Marker({
    position: position,
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);

  // 생성된 마커를 배열에 추가합니다
  markers.push(marker);

  return marker;
}

let overlays = [];

// 마커 반복해서 찍기
function RepetitionAddMaker(e) {
  for (let i = 0; i < e.length; i++) {
    let marker = addMarker(new kakao.maps.LatLng(e[i].lat, e[i].lng));

    // 마커 윈도우 내용
    let content = `<div class="wrap">
    <div class="info">
      <div class="title">
        <div class="close" onclick="closeOverlay(${i})" title="닫기"></div>
      </div>
      <div class="body">
        <div class="img">
          <img width="73" height="70">
        </div>
        <div class="desc">
          <div class="ellipsis">${e[i].statNm}</div>
          <div class="jibun ellipsis">${e[i].addr}</div>
          <div><a onclick="getChargingInfo('${e[i].statId}')" class="link">상세정보</a></div>
        </div>
       </div>
    </div>
    </div>`;

    let overlay = new kakao.maps.CustomOverlay({
      content: content,
      map: map,
      position: marker.getPosition(),
    });

    overlay.setMap(null);

    // 마커 윈도우 추가
    kakao.maps.event.addListener(marker, "click", function () {
      overlay.setMap(map);
    });
    overlays.push(overlay);
  }
}

// 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
function closeOverlay(index) {
  overlays[index].setMap(null);
}

// 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
function setMarkers(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// "마커 보이기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에 표시하는 함수입니다
function showMarkers() {
  setMarkers(map);
}

// "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
function hideMarkers() {
  setMarkers(null);
}

// 맵 센터좌표 주변 정보 가져오는 함수
function getRangeList(rangeList) {
  fetch("/rangeList", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rangeList),
  })
    .then((res) => res.json())
    .then((data) => {
      overlays = [];
      RepetitionAddMaker(data);
      delChargingStationList();
      addChargingStationList(data);
    })
    .catch(() => {
      console.log("실패");
    });
}

// 이동할 위도 경도 위치 생성
function panTo(lat, lng) {
  // 이동할 위도 경도 위치를 생성합니다
  let moveLatLon = new kakao.maps.LatLng(lat, lng);

  // 지도 중심을 부드럽게 이동시킵니다
  // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
  map.panTo(moveLatLon);
}

// 상세정보 눌렀을때 창 나오게
function getDetail() {
  const infoWrap = document.querySelector("#info-wrap1");
  infoWrap.style.visibility = "visible";
}

// 닫기 버튼
function exitButton() {
  const stationInfoPage = document.querySelector("#info-wrap1");
  const reservationPage = document.querySelector("#info-wrap2");
  stationInfoPage.style.visibility = "hidden";
  reservationPage.style.visibility = "hidden";
}

// stationInfo 내용 갈아 끼기
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

// 충전소의 번호로 충전소 정보 전부 다 가져오기
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
    .catch(() => {});
}

// stationInfo의 충전기타입 체크
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

// 위치 새로고침 버튼 보이게 하는 함수
function visibleReloadButton() {
  let reload = document.querySelector("#reload-button");
  reload.style.display = "block";
}

// 새로고침 함수
function ReloadButtonClick() {
  for (let i = 0; i < overlays.length; i++) {
    overlays[i].setMap(null);
  }
  getRangeList(rangeList);
}

// 맵 리스트 충전소 이름 눌렀을때 함수
function ClickedStationName(lat, lng, statId, i) {
  panTo(lat, lng);

  overlays[i].setMap(map);
}

// 마커 클릭 함수
function markerClick(i) {
  let markerZd = markers[i].zd.id;
  let markerId =
    "#" + markerZd.split(".").join("\\\\.").split(":").join("\\\\:");

  document.querySelector(`${markerId}`).click();
}

// 예약하기 눌렀을때 충전기번호에 해당하는 예약 내역가져오기
function ClickedReservation(chgerId, date, statId, chgerType) {
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

function getReservationList(chgerId, date, statId) {
  let ResParam = {
    chgerId: chgerId,
    resDate: date,
    statId: statId,
  };

  chargingNum = chgerId;

  fetch("/getReservationList", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ResParam),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      openReservationPage();
      console.log("middle");
      changeReservationPage(data);
      console.log("bottom");
    })
    .catch((e) => {
      console.log(e);
      console.log("실패");
    });
}

function changeReservationPage(e) {
  let selectAll = document.querySelectorAll("[name='tId']");

  for (let i = 0; i < selectAll.length; i++) {
    selectAll[i].removeAttribute("disabled");
    selectAll[i].nextElementSibling.style.backgroundColor = "white";
  }
  if (!(e.length === 0)) {
    for (let i = 0; i < selectAll.length; i++) {
      for (let j = 0; j < e.length; j++) {
        if (e[j].tid == selectAll[i].value) {
          selectAll[i].disabled = "disabled";
          selectAll[i].nextElementSibling.style.backgroundColor = "grey";
        }
      }
    }
  }
  reservationStatus();
}

function reservationStatus() {
  const statNm = document.querySelector("#reservation-statNm");
  const chgerId = document.querySelector("#reservation-chgerId");
  const resDate = document.querySelector("#reservation-resDate");
  // const resTime = document.querySelector('#reservation-resTime');
  // const fee = document.querySelector('#reservation-fee');

  statNm.innerText = `${addrInfo}`;
  chgerId.innerText = `${chargingNum}`;
  resDate.innerText = `${selectDate}`;
}

function onClickDate(date) {
  getReservationList(selectChgerId, date, selectStatId);
  selectDate = date;
}

document.addEventListener("DOMContentLoaded", function () {
  let calendarEl = document.getElementById("calendar");
  let calendar = new FullCalendar.Calendar(calendarEl, {
    dateClick: function (info) {
      onClickDate(info.dateStr);
    },
    initialView: "dayGridMonth",
    editable: true,
    selectable: true,
    businessHours: true,
    dayMaxEvents: true, // allow "more" link when too many events
    height: 350,
  });
  calendar.render();
});

function onClickReservationButton() {
  insertReservation();
}

// 예약데이터
function reservationInsertList() {
  let timeList = checkedList();
  let reservationList = {
    userId: "qewrt1124",
    statId: resStatId,
    chgerId: chargingNum,
    resDate: selectDate,
    tidList: timeList,
    chgerCharge: resultPrice,
    statNm: selectStatNm,
  };

  return reservationList;
}

function insertReservation() {
  fetch("/insertReservation", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservationInsertList()),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      changeCompletePage(data);
      reservationCheck();
    })
    .catch(() => {
      console.log("실패");
    });
}

function checkedList() {
  let checked = document.querySelectorAll("input[type='checkbox']:checked");
  let checkedValues = [];
  for (let i = 0; i < checked.length; i++) {
    checkedValues.push(checked[i].value);
  }

  return checkedValues;
}

function changeCompletePage(data) {
  const completeChgerId = document.querySelector("#complete-chgerId");
  const completeStatNm = document.querySelector("#complete-statNm");
  const completeResDate = document.querySelector("#complete-resDate");
  const completeResTime = document.querySelector("#complete-resTime");
  const completeFee = document.querySelector("#complete-fee");

  console.log(data[0]);

  let dataLength = data.length;
  let startTime = data[0].startTime;
  let endTime = data[dataLength - 1].endTime;
  let finalResTime = startTime + " ~ " + endTime;

  completeChgerId.innerText = `${data[0].chgerId}`;
  completeStatNm.innerText = `${data[0].statNm}`;
  completeResDate.innerText = `${data[0].resDate}`;
  completeResTime.innerText = `${finalResTime}`;
  completeFee.innerText = `${data[0].chgerCharge}`;
}

// 예약확인 페이지 이동
function reservationCheck() {
  const reservation = document.querySelector("#info-wrap2");
  const complete = document.querySelector("#info-wrap3");
  reservation.style.visibility = "hidden";
  complete.style.visibility = "visible";
}
