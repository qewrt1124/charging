let mapContainer = document.getElementById('map'), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(36.494692, 127.26536), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
  };

let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

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

let rangeList = {"centerLat": 36.494692, "centerLng": 127.26536, "level": 3};

// 지도 레벨, 중심좌표 얻어 오기
kakao.maps.event.addListener(map, 'center_changed', function () {

  // 지도의  레벨을 얻어옵니다
  let level = map.getLevel();

  // 지도의 중심좌표를 얻어옵니다
  let latlng = map.getCenter();

  let centerLat = latlng.getLat();
  let centerLng = latlng.getLng();

  // setMarkers(null);

  rangeList = {"centerLat": centerLat, "centerLng": centerLng, "level": level};

  visibleReloadButton();
});

// 최초 마커 찍기
getRangeList(rangeList);

function addChargingStationList(e) {
  let list = document.querySelector('#map-location-list-wrap');
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
  let list = document.querySelector('#map-location-list-wrap');
  list.innerHTML = "";
}

// 마커를 생성하고 지도위에 표시하는 함수입니다
function addMarker(position) {

  // 마커를 생성합니다
  let marker = new kakao.maps.Marker({
    position: position
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
      position: marker.getPosition()
    });

    overlay.setMap(null);

    // 마커 윈도우 추가
    kakao.maps.event.addListener(marker, 'click', function () {
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

  setMarkers(map)
}

// "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
function hideMarkers() {
  setMarkers(null);
}

// 맵 센터좌표 주변 정보 가져오는 함수
function getRangeList(rangeList) {
  $.ajax({
    async: true,
    url: '/rangeList',
    type: 'POST',
    data: JSON.stringify(rangeList),
    dataType: 'json',
    contentType: 'application/json; charset=UTF-8',
    success: (data) => {
      overlays = [];
      RepetitionAddMaker(data);
      delChargingStationList();
      addChargingStationList(data);
    }
  }).fail(() => {
    console.log('실패');
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
  const infoWrap = document.querySelector('#info-wrap1');
  infoWrap.style.visibility = 'visible';
  console.log(markers[0]);
}

// 닫기 버튼
function exitButton() {
  const infoWrap = document.querySelector('#info-wrap1');
  infoWrap.style.visibility = 'hidden';
}

// stationInfo 내용 갈아 끼기
function chageStatinInfo(e) {
  const statNm = document.querySelector('#stationInfo-top-title-content');
  const statUpdDt = document.querySelector('#stationInfo-top-title-update-content');
  const addr = document.querySelector('#stationInfo-top-title-detail-addr');
  const busiCall = document.querySelector('#stationInfo-top-title-detail-busiCall');
  const bnm = document.querySelector('#stationInfo-middle-stationInfo-bnm');
  const useTime = document.querySelector('#stationInfo-middle-stationInfo-useTime');
  const reservation = document.querySelector('#stationInfo-bottom-chargingStatus-detail-table');

  statNm.innerText = `${e[0].statNm}`;
  statUpdDt.innerText = `${e[0].statUpdDt}`;
  addr.innerText = `${e[0].addr}`;
  busiCall.innerText = `${e[0].busiCall}`;
  bnm.innerText = `${e[0].bnm}`;
  useTime.innerText = `${e[0].bnm}`;

  reservation.innerHTML = '';

  for (let i = 0; i < e.length; i++) {
    reservation.innerHTML += `
      <tr>
        <td class="stationInfo-reservation-check">예약가능여부</td>
        <td class="stationInfo-bottom-chargingStatus-adapter">
          <ul>
            ` + GetChargeInfo(e[i].chgerType) + `
          </ul>
        </td>
      </tr>
      `
  }
  let asdid = markers[3].zd;

  console.log(markers[3].zd.id);
}

function getChargingInfo(statId) {
  $.ajax({
    async: true,
    url: '/chargingInfo?statId=' + statId,
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json; charset=UTF-8',
    success: (data) => {
      console.log(data);
      chageStatinInfo(data);
      getDetail();
    }
  }).fail(() => {
    console.log('실패');
  });
}

function GetChargeInfo(chrgId){
  let ac = "<li><span style='color: blue'>AC3상</span></li>";
  let dcCombo = "<li><span style='color: blue'>DC콤보</span></li>";
  let dcCha = "<li><span style='color: blue'>DC차데모</span></li>";
  let slow = "<li><span style='color: blue'>AC완속</span></li>";

  //dcCha
  if(!"01|05|06".includes(chrgId)) {
    dcCha = "<li><span style='color: gray;'>DC차데모</span></li>";
  }
  //dcCombo
  if(!"04|05|06".includes(chrgId)) {
    dcCombo = "<li><span style='color: gray;'>DC콤보</span></li>";
  }
  //ac
  if(!"03|06|07".includes(chrgId)) {
    ac = "<li><span style='color: gray;'>AC3상</span></li>";
  }
  //slow
  if(!"02".includes(chrgId)) {
    slow = "<li><span style='color: gray;'>AC완속</span></li>";
  }

  return dcCha + dcCombo + ac + slow;
}
// 위치 새로고침 버튼 보이게 하는 함수
function visibleReloadButton() {
  let reload = document.querySelector('#reload-button');
  reload.style.display = 'block';
}

// 새로고침 함수
function ReloadButtonClick() {
  setMarkers(null);
  getRangeList(rangeList);
}

// 맵 리스트 충전소 이름 눌렀을때 함수
function ClickedStationName(lat, lng, statId, i) {
  panTo(lat, lng);
  // getChargingInfo(statId);
  // markerClic k(i);

  overlays[i].setMap(map);
}

// 마커 클릭 함수
function markerClick(i) {
  let markerZd = markers[i].zd.id;
  let markerId = '#' + markerZd.split('.').join('\\\\.').split(':').join('\\\\:');
  console.log(markerId);
  // let spMarker = markerZd.split('.');
  // let sp = spMarker[3].split(':');
  // console.log(spMarker)
  // let result;
  // for (let i = 0; i < spMarker.length - 1; i++) {
  //   result += spMarker[i] + '//.';
  // }

  // console.log(markerId);
  document.querySelector(`${markerId}`).click();
}