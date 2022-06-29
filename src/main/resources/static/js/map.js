let selectChgerId;
let selectStatId;
let selectChgerType;
let selectCouponNum;
let selectDate = getToday();
let resultPrice;
let selectStatNm;
let selectCheck = false;
let timeResult = false;
let timeResultList;
// 수정하기 누른 상태인지 체크하는 변수
let modifyCheck = false;
// let contentNumber = 1;
let addrInfo;
let chargingNum;
let resStatId;
let favoriteChecking = false;
// 지도를 표시할 div
let mapContainer = document.getElementById("map"),
  mapOption = {
    // 지도의 중심좌표
    center: new kakao.maps.LatLng(36.501704698064316, 127.26378170671532),
    // 지도의 확대 레벨
    level: 3,
  };

// 지도를 생성합니다
let map = new kakao.maps.Map(mapContainer, mapOption);

// 지도에 표시된 마커 객체를 가지고 있을 배열입니다
let markers = [];

// 지도 타입 변경 컨트롤을 생성한다
// let mapTypeControl = new kakao.maps.MapTypeControl();

// 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
// map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도에 확대 축소 컨트롤을 생성한다
let zoomControl = new kakao.maps.ZoomControl();

// 지도의 우측에 확대 축소 컨트롤을 추가한다
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

let rangeList = { centerLat: 36.501704698064316, centerLng: 127.26378170671532, level: 3 };

// 지도 레벨, 중심좌표 얻어 오기
kakao.maps.event.addListener(map, "center_changed", function () {
  // 지도의  레벨을 얻어옵니다
  let level = map.getLevel();

  // 지도의 중심좌표를 얻어옵니다
  let latlng = map.getCenter();

  let centerLat = latlng.getLat();
  let centerLng = latlng.getLng();

  // 중심좌표 및 확대 레벨 json
  rangeList = { centerLat: centerLat, centerLng: centerLng, level: level };

  visibleReloadButton();
});

// 최초 마커 찍기
getRangeList(rangeList);

// location-list-wrap에 충전소 이름 및 주소 등을 띄우는 함수
function addChargingStationList(e) {
  let list = document.querySelector("#location-list-wrap");
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
  let list = document.querySelector("#location-list-wrap");
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

// 마커 눌렀을때 간력한 정보 띄우는 overlays를 저장하는 배열
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
          <div><a onclick="onclickChargingInfo('${e[i].statId}', mId)" class="link">상세정보</a></div>
        </div>
       </div>
    </div>
    </div>`;

    // 오버레이 만들기
    let overlay = new kakao.maps.CustomOverlay({
      content: content,
      map: map,
      position: marker.getPosition(),
    });

    overlay.setMap(null);

    // 마커 윈도우 추가
    kakao.maps.event.addListener(marker, "click", function () {
      for (let i = 0; i < overlays.length; i++) {
        overlays[i].setMap(null);
      }
      overlay.setMap(map);
    });
    overlays.push(overlay);
  }
}

// 마커 클릭 함수
function markerClick(i) {
  let markerZd = markers[i].zd.id;
  let markerId =
    "#" + markerZd.split(".").join("\\\\.").split(":").join("\\\\:");

  document.querySelector(`${markerId}`).click();
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

// 이동할 위도 경도 위치 생성
function panTo(lat, lng) {
  // 이동할 위도 경도 위치를 생성합니다
  let moveLatLon = new kakao.maps.LatLng(lat, lng);

  // 지도 중심을 부드럽게 이동시킵니다
  // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
  map.panTo(moveLatLon);
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
    .catch((e) => {
      console.log("주변 정보 가져오기 실패");
      console.log(e);
    });
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

// 상세정보 눌렀을때 창 나오게
function getDetail() {
  const infoWrap = document.querySelector("#info-wrap1");
  infoWrap.style.visibility = "visible";
}

// location-list 열기 버튼
function closeLocationList() {
  const infoList = document.querySelector("#map-location-list-wrap");
  const closeButton = document.querySelector("#infoList-close-button");
  const openButton = document.querySelector("#infoList-open-button");
  infoList.style.visibility = "hidden";
  closeButton.style.visibility = "hidden";
  openButton.style.visibility = "visible";
}

// location-list 열기 버튼
function openLocationList() {
  const infoList = document.querySelector("#map-location-list-wrap");
  const closeButton = document.querySelector("#infoList-close-button");
  const openButton = document.querySelector("#infoList-open-button");
  infoList.style.visibility = "visible";
  closeButton.style.visibility = "visible";
  openButton.style.visibility = "hidden";
}

function makeSearchJson(statNm, addr) {
  let searchJson = {
    statNm: statNm,
    addr: addr
  }

  return searchJson;
}

function onclickSearchButton() {
  const searchOption = document.querySelector("#search-option");
  const searchText = document.querySelector("#search-text");
  let statNm = null;
  let addr = null;
  if (searchOption.value === "statNm") {
    statNm = searchText.value;
  } else {
    addr = searchText.value;
  }
  searchForStation(statNm, addr);
}

function searchForStation(statNm, addr) {
  fetch("/searchForStation", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(makeSearchJson(statNm, addr)),
  })
    .then((res) => res.json())
    .then((data) => {
      overlays = [];
      RepetitionAddMaker(data);
      delChargingStationList();
      addChargingStationList(data);
    })
    .catch((e) => {
      console.log("검색 실패");
      console.log(e);
    });
}