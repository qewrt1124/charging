let eventStartDate = "2022-06-23";
let showDate = getToday();

// 달력(Fullcalendar) 함수 - 날짜 누르면 예약페이지 내용 바뀜
document.addEventListener("DOMContentLoaded", function () {
  let calendarEl = document.getElementById("calendar");
  let calendar = new FullCalendar.Calendar(calendarEl, {
    dateClick: function (info) {
      onClickDate(info.dateStr);
    },
    titleFormat: {
      year: "numeric",
      month: "2-digit"
    },
    // events: [{start: eventStartDate, display: "background"}],
    // events: function () {
    //   [{start: eventStartDate, display: "background"}];
    // },
    timeZone: "local",
    initialDate: showDate,
    initialView: "dayGridMonth",
    editable: true,
    selectable: true,
    businessHours: true,
    dayMaxEvents: true,
    height: 350,
  });
  calendar.render();
});

// 예약리스트 가져올 json데이터 만들기 (충전기 번호, 날짜, 충전소번호)
function makeReservationListParam(chgerId, statId, date) {
  let ResParam = {
    chgerId: chgerId,
    resDate: date,
    statId: statId,
  };

  return ResParam;
}

// 예약리스트(예약시간) 가져오기 - 예약하기 버튼을 누르면 예약시간을 가져와서 체크박스 비활성화 시킴
function getReservationList(chgerId, date, statId) {
  chargingNum = chgerId;

  fetch("/getReservationList", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(makeReservationListParam(chgerId, statId, date)),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("1차")
      openReservationPage();
      console.log("2차")
      clearReservationPage(date);
      console.log("3차")
      changeReservationPage(data);
      // getReservationStatIdInfo(chgerId, statId, date);
    })
    .catch((e) => {
      console.log(e);
      console.log("예약시간 가져오기");
    })
}

// 예약리스트를 가져와서 예약되어 있는 시간은 예약시간 비활성화
function changeReservationPage(e) {
  let selectAll = document.querySelectorAll("[name='tId']");

  for (let i = 0; i < selectAll.length; i++) {
    selectAll[i].removeAttribute("disabled");
    selectAll[i].checked = false;
    selectAll[i].nextElementSibling.style.backgroundColor = "white";
  }
  if (!(e.length === 0)) {
    for (let i = 0; i < selectAll.length; i++) {
      for (let j = 0; j < e.length; j++) {
        if (e[j].endTime == selectAll[i].value) {
          selectAll[i].disabled = "disabled";
          selectAll[i].nextElementSibling.style.backgroundColor =
            "rgb(201, 199, 199)";
        }
      }
    }
  }
}

// 달력의 날짜를 누르면 해당 일자의 예약리스트를 가져오고 예약페이지 내용을 바꿈
async function onClickDate(date) {
  if (modifyCheck == false) {
    console.log("modifyCheck = false");
    await getReservationList(selectChgerId, date, selectStatId);
    await getReservationStatIdInfo(selectChgerId, date, selectStatId);
    selectDate = date;
  } else if (modifyCheck == true && showDate == date) {
    console.log("modifyCheck = true");
    await clearReservationPage();
    await getReservationList(selectChgerId, date, selectStatId);
    await getReservationStatIdInfo(selectChgerId, date, selectStatId);
    await getSameCouponNumList(mId, showDate, selectCouponNum);
  } else if (modifyCheck == true && showDate != date) {
    console.log("동작확인3");
    clearReservationPage();
    await getReservationList(selectChgerId, date, selectStatId);
    await getReservationStatIdInfo(selectChgerId, date, selectStatId);
  }

}

// 체크박스 눌렀을때 작동하는 함수
function onClickCheckBox(e) {
  getSelectedTimeStamp();
  continuousCheck(e);
}

function changeCheckBox(e) {
  let coom = e.nextElementSibling;

  if (!e.checked) {
    coom.style.backgroundColor = "white";
  }
}

// 체크박스 색 변하는거
function checkBoxChangeRed(e) {
  if (e.checked) {
    e.nextElementSibling.style.backgroundColor = "rgb(250, 43, 43)";
  } else {
    e.nextElementSibling.style.backgroundColor = "white";
  }
}

// 연속된 시간대만 체크할 수 있고 눌렀을 때 색이 변함
// -- 연속되지 않은 시간을 체크하면 경고창을 띄움
function continuousCheck(e) {
  let checkedList = document.querySelectorAll("input[type='checkbox']:checked");
  let length = checkedList.length;
  let clickedIndex;

  for (let i = 0; i < checkedList.length; i++) {
    if (e.value === checkedList[i].value) {
      clickedIndex = i;
      break;
    }
  }

  if (length === 2) {
    let first = checkedList[0].value;
    let second = checkedList[1].value;

    if ((first == 1 && second == 24)) {
      checkBoxChangeRed(e);
    } else if ((second - first) != 1 || (second - first) != 1) {
      alert("연속된 시간을 선택하세요");
      event.preventDefault();
      clearTimeStamp();
      getSelectedTimeStamp();
    } else {
      checkBoxChangeRed(e);
    }
  } else if (length > 2) {
    let first = checkedList[0].value;
    let second = checkedList[1].value;
    let preLast = checkedList[length - 2].value;
    let last = checkedList[length - 1].value;

    for (let i = 0; i < length; i++) {
      console.log("전전 " + i + "번째 : " + checkedList[i].value);
    }

    if (first == 1 && last == 24) {
      if (checkedList[clickedIndex].value == 1) {
        if (last - first == 23) {
          checkBoxChangeRed(e);
        }
      } else if (checkedList[clickedIndex].value - checkedList[clickedIndex - 1].value < checkedList[clickedIndex + 1].value - checkedList[clickedIndex].value) {
        if (checkedList[clickedIndex].value - checkedList[clickedIndex - 1].value == 1) {
          checkBoxChangeRed(e);
        } else {
          alert("연속된 시간을 선택하세요");
          event.preventDefault();
          clearTimeStamp();
          getSelectedTimeStamp();
        }
      } else if (checkedList[clickedIndex].value - checkedList[clickedIndex - 1].value > checkedList[clickedIndex + 1].value - checkedList[clickedIndex].value) {
        if (checkedList[clickedIndex + 1].value - checkedList[clickedIndex].value == 1) {
          checkBoxChangeRed(e);
        } else {
          alert("연속된 시간을 선택하세요");
          event.preventDefault();
          clearTimeStamp();
          getSelectedTimeStamp();
        }
      }
    } else if ((second - first) > 1 || (last - preLast) > 1) {
      alert("연속된 시간을 선택하세요");
      // for (let i = 0; i < length; i++ ) {
      //   console.log("전 " + i + "번째 : " + checkedList[i].value);
      // }
      event.preventDefault();
      clearTimeStamp();
      getSelectedTimeStamp();
      // for (let i = 0; i < length; i++ ) {
      //   console.log("후 " + i + "번째 : " + checkedList[i].value);
      // }
    } else {
      checkBoxChangeRed(e);
    }
  } else {
    checkBoxChangeRed(e);
  }

  changeCheckBox(e);
}

// 선택완료 누르면 체크되어 있는 시간 계산
function multipleCheck(checkedList) {
  let length = checkedList.length;
  let first = checkedList[0].value;
  let last = checkedList[length - 1].value;
  let result = true;

  if (length == 2) {
    if (first == 1 && last == 24) {
      result = true;
    } else if (last - first != 1) {
      result = false;
    }
  } else if (length > 2) {
    if (first == 1 && last == 24) {
      for (let i = 1; i < checkedList.length - 1; i++) {
        if (checkedList[i].value - checkedList[i - 1].value < checkedList[i + 1].value - checkedList[i].value) {
          if (checkedList[i].value - checkedList[i - 1].value != 1) {
            result = false;
          }
        } else if (checkedList[i].value - checkedList[i - 1].value > checkedList[i + 1].value - checkedList[i].value) {
          if (checkedList[i + 1].value - checkedList[i].value != 1) {
            result = false;
          }
        }
      }
    } else {
      for (let i = 0; i < checkedList.length - 1; i++) {
        if (checkedList[i + 1].value - checkedList[i].value != 1) {
          result = false;
        }
      }
    }
  }

  return result;
}

// 시간 선택 되어 있는게 1~5개면 true 아니면 false
function reservationCountBoolean(checkedList) {
  let length = checkedList.length;
  let countResult = false;

  if (0 < length && length < 6) {
    countResult = true;
  }

  return countResult;
}

/* 예약내역 데이터 가져오기 */

// 예약데이터 json
function reservationInsertList(mid, couponNum, date, chgerType) {
  let timeList = checkedList();

  let reservationList = {
    mid: mid,
    statId: selectStatId,
    chgerId: chargingNum,
    // resDate: selectDate,
    resDate: date,
    tidList: timeList,
    chgerCharge: resultPrice,
    statNm: selectStatNm,
    couponNum: couponNum,
    chgerType: chgerType,
  };

  return reservationList;
}

// 체크된 시간을 배열로 리턴함
function checkedList() {
  let checked = document.querySelectorAll("input[type='checkbox']:checked");
  let checkedValues = [];
  for (let i = 0; i < checked.length; i++) {
    checkedValues.push(checked[i].value);
  }

  return checkedValues;
}

// 예약 데이터 DB에 집어 넣기
// -- 성공하면 예약확인 페이지 내용이 바뀌고 페이지 이동
// -- 실패하면 데이터는 들어가지 않고 실패이유가 console에 뜨고 경고창 나옴 / 페이지 이동 및 내용 갈아끼우기 실행 되지 않음
function insertReservation(mid, date) {
  fetch("/insertReservation", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservationInsertList(mid, null, date, selectChgerType)),
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

// 시간이 선택되지 않으면 경고창 뜨고 시간이 하나 이상 선택되어 있을때만 데이터가 DB에 들어가도록 실행
function onClickReservationButton(mid, date) {
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
      insertReservation(mid, date);
    }
  } else if (timeResult === true && selectCheck === true && JSON.stringify(timeResultList) === JSON.stringify(checkedList)) {
    insertReservation(mid, date);
  }
}

/* 제조사/차량/배터리/충전기속도 옵션 */
// 제조사/차량/배터리/충전기속도 옵션 초기화
// 제조사/차량/배터리 정보 DB에서 가져오는 함수
function getCarList(e, chgerType) {
  fetch("/getCarData", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(selectValue(e)),
  })
    .then((res) => res.json())
    .then((data) => {
      changeOption(data, selectChgerType);
    })
    .catch((e) => {
      console.log("차량정보 가져오기 실패");
      console.log(e);
    });
}

// 선택된 옵션의 값을 가져오는 함수
function selectValue(e) {
  let result;

  if (e == null) {
    result = {null: null};
  } else {
    switch (e.name) {
      case "manufac":
        result = {
          manufac: e.value,
        };
        break;
      case "model":
        result = {
          model: e.value,
        };
        break;
      case "batCap":
        result = {
          batCap: e.value,
        };
        break;
    }
  }

  return result;
}

// 옵션에 내용 채우기 - onchange 됬을 때 동작함
function changeOption(list, chgerType) {
  const model = document.querySelector('#cars-model-select');
  const batCap = document.querySelector('#cars-batCap-select');
  const outPut = document.querySelector('#cars-outPut-select');

  let targetNum;

  if (!(list[0].manufac == null)) {
    targetNum = 0;
    inputOption(list, targetNum, chgerType);
    model.innerHTML = `<option>제조사 선택</option>`;
    batCap.innerHTML = `<option>제조사 선택</option>`;
    outPut.innerHTML = `<option>제조사 선택</option>`;
  } else if (!(list[0].model == null)) {
    targetNum = 1;
    inputOption(list, targetNum, chgerType);
    batCap.innerHTML = `<option>모델 선택</option>`;
    outPut.innerHTML = `<option>모델 선택</option>`;
  } else if (!(list[0].batCap == null)) {
    targetNum = 2;
    inputOption(list, targetNum, chgerType);
    outPut.innerHTML = `<option>배터리용량 선택</option>`;
  } else if (!(list[0].outPut == null)) {
    targetNum = 3;
    inputOption(list, targetNum);
  }
}

// 제조사/차량/배터리용량/충전속도 옵션 초기화
function removerOption() {
  const selectTagList = document.querySelectorAll("select");
  for (let i = 0; i < selectTagList.length; i++) {
    selectTagList[i].innerHTML = "";
  }
}

// 제조사/차량/배터리용량/충전속도 옵션 변경 함수
function inputOption(list, targetNum, chgerType) {
  let target;

  if (targetNum === 0) {
    target = document.querySelector("#cars-manufacturer-select");
    target.innerHTML = `<option value="manufacturerChoose">제조사 선택</option>`;
  } else if (targetNum === 1) {
    target = document.querySelector("#cars-model-select");
    target.innerHTML = `<option value="modelChoose">차량 선택</option>`;
  } else if (targetNum === 2) {
    target = document.querySelector("#cars-batCap-select");
    target.innerHTML = `<option value="batCapChoose">배터리용량 선택</option>`;
  } else if (targetNum === 3) {
    target = document.querySelector("#cars-outPut-select");
    target.innerHTML = `<option value="outPutChoose">충전속도 선택</option>`;

    if (chgerType === '02') {
      list = [{outPut: "완속"}];
    } else {
      list = [{outPut: "급속"}];
    }
  }

  for (let i = 0; i < list.length; i++) {
    let opt = document.createElement("option");
    opt.value = list[i][target.getAttribute("name")];
    opt.innerText = list[i][target.getAttribute("name")];
    target.appendChild(opt);
  }
}

/* 예약상황 */
function getReservationStatIdInfo(chgerId,date, statId) {
  fetch("/getReservationStatIdInfo", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(makeReservationListParam(chgerId, statId)),
  })
    .then((res) => res.json())
    .then((data) => {
      openReservationPage();
      // clearReservationPage(date);
      reservationStatus(data, date);
      console.log("4차 - 함수");
    })
    .catch((e) => {
      console.log(e);
      console.log("예약시간 가져오기");
    });
}

// 예약페이지의 예약상황 주소, 충전기번호, 날짜 표시
function reservationStatus(e, date) {
  const statNm = document.querySelector("#reservation-statNm");
  const chgerId = document.querySelector("#reservation-chgerId");
  const resDate = document.querySelector("#reservation-resDate");
  statNm.innerText = `${e.statNm}`;
  chgerId.innerText = `${e.chgerId}`;

  if (e.resDate === null && date === null) {
    resDate.innerText = getToday();
  } else if (e.resDate !== null && date === null) {
    resDate.innerText = `${e.resDate}`;
  } else {
    resDate.innerText = `${date}`;
  }

}

// 예약상황의 예약 시간 내용 초기화
function removeReservationTime() {
  const targetTime = document.querySelector("#reservation-resTime");
  targetTime.innerText = "";
}

function clearTimeStamp() {
  const resTime = document.querySelector("#reservation-resTime");
  resTime.innerText = "";
}

// 예약시간 체크박스를 선택하면 예약상황의 시간이 바뀜
// - 선택된 시간이 없을 때는 시간이 표시되지 않음
function getSelectedTimeStamp() {
  const resTime = document.querySelector("#reservation-resTime");
  let selectedTime = document.querySelectorAll("input[type='checkbox']:checked");
  let first = selectedTime[0];
  let last = selectedTime[selectedTime.length - 1];
  let resultTime = "";
  let startTime = first.nextElementSibling.innerText.split(" ~ ");
  let endTime = last.nextElementSibling.innerText.split(" ~ ");


  if (selectedTime.length === 1) {
    resultTime = selectedTime[0].nextElementSibling.innerText;
  } else if (selectedTime.length === 2) {
    if (first.value == 1 && last.value == 24) {
      resultTime = endTime[0] + " ~ " + startTime[1];
    } else {
      resultTime = startTime[0] + " ~ " + endTime[1];
    }
  } else if (selectedTime.length > 2) {
    if (first.value == 1 && last.value == 24) {
      endTime = time1(selectedTime);
      startTime = time2(selectedTime);
      resultTime = startTime[0] + " ~ " + endTime[1];
    } else {
      resultTime = startTime[0] + " ~ " + endTime[1];
    }
  } else {
    resultTime = "";
  }

  resTime.innerText = resultTime;
}

/* first = 1 && last = 24일 때 시간 나타내기 */

// endTime
function time1(selectedTime) {
  for (let i = 0; i < selectedTime.length - 1; i++) {
    if (selectedTime[i + 1].value - selectedTime[i].value !== 1) {
      return selectedTime[i].nextElementSibling.innerText.split(" ~ ");
    }
  }
}

// startTime
function time2(selectedTime) {
  for (let i = selectedTime.length - 1; i > 0; i--) {
    if (selectedTime[i].value - selectedTime[i - 1].value !== 1) {
      return selectedTime[i].nextElementSibling.innerText.split(" ~ ");
    }
  }
}

function onClickCompleteButton() {
  let checkedList = document.querySelectorAll("input[type='checkbox']:checked");
  let timeBoolean = false;

  if (checkedList.length === 0) {
    alert("시간을 선택해주세요.");
  } else {
    let reservationResult = multipleCheck(checkedList);
    let lengthCount = reservationCountBoolean(checkedList);

    if (reservationResult === true && lengthCount === true) {
      timeBoolean = true;
      timeResultList = checkedList;
      timeResult = true;
    } else if (reservationResult === false && lengthCount === false) {
      alert("1 ~ 5개의 연속된 시간을 선택하세요.")
    } else if (reservationResult === false && lengthCount === true) {
      alert("연속된 시간을 선택하세요.")
    } else if (reservationResult === true && lengthCount === false) {
      alert("1 ~ 5개의 연속된 시간을 선택하세요.");
    }
  }

  if (timeBoolean === true) {
    clearTimeStamp();
    getSelectedTimeStamp();
  }

  return timeBoolean;
}

// 예약상황 예상결제가격/완료 퍼센트 입력 함수
function viewChargingPercentage() {
  const chargeType = document.querySelector("#cars-outPut-select");
  const out = document.querySelector("#cars-batCap-select");
  const resultPercentage = document.querySelector("#reservation-endPercentage");
  const overPercentage = document.querySelector("#reservation-overPercentage");
  const payment = document.querySelector("#charging-payment");
  const overPayment = document.querySelector("#over-charging-payment");
  const start = document.querySelector("#reservation-startPercentage");
  const fee = document.querySelector("#reservation-fee");
  const manufacturer = document.querySelector("#cars-manufacturer-select");
  const model = document.querySelector("#cars-model-select");
  const batCap = document.querySelector("#cars-batCap-select");
  let selectedTimePrice = document.querySelectorAll(
    "input[type='checkbox']:checked"
  );
  let startValue = start.value;
  let param;
  let result;
  let outPutValue;
  let price;
  let checkedLength = selectedTimePrice.length;
  let overPrice;

  if (timeResult === true) {
    if (manufacturer.value === "manufacturerChoose") {
      alert("제조사를 선택해주세요.");
    } else if (model.value === "modelChoose") {
      alert("차량을 선택해주세요,");
    } else if (batCap.value === "batCapChoose") {
      alert("배터리용량을 선택해주세요.")
    } else if (chargeType.value === "outPutChoose") {
      alert("충전속도를 선택해주세요.")
    } else if (start.value === "") {
      alert("충전시작 퍼센트를 입력해주세요.");
    } else {
      selectCheck = true;

      let timeDiffernce = checkedLength;

      if (chargeType.value === "완속") {
        param = 7;
        price = 259;
      } else {
        param = 50;
        price = 292.9;
      }

      resultPrice = totalPrice(price, timeDiffernce);

      outPutValue = out.value;
      let startPercentage = parseInt(startValue);
      result = chargingPercentage(param, outPutValue, timeDiffernce, startPercentage);
      if (result > 100) {
        overClear();
        resultPercentage.innerText = 100 + "%";
        overPercentage.innerText = " + (" + (result - 100) + "%)";
        overPrice = overChargingPrice(param, outPutValue, timeDiffernce, startPercentage, price, (result - 100));
        payment.innerText = (resultPrice - overPrice) + "원";
        overPayment.innerText = " + (" + (overPrice) + "원)";
      } else {
        overClear();
        payment.innerText = resultPrice + "원";
        resultPercentage.innerText = result + "%";
      }

      fee.innerText = resultPrice + "원";
    }
  } else {
    alert("시간을 선택한 후 선택완료를 눌러주세요.");
  }
}

function overClear() {
  const resultPercentage = document.querySelector("#reservation-endPercentage");
  const overPercentage = document.querySelector("#reservation-overPercentage");
  const payment = document.querySelector("#charging-payment");
  const overPayment = document.querySelector("#over-charging-payment");
  resultPercentage.innerText = "";
  overPercentage.innerText = "";
  overPayment.innerText = "";
  payment.innerText = "";
}

// 통합 가격 계산 함수(예약시간 * 선택 충전 속도의 가격)
function totalPrice(price, timeDiffernce) {
  let resultPrice = 0;

  resultPrice = parseInt(timeDiffernce * 60 * price);

  return resultPrice;
}

// 충전완료 퍼센트 계산 함수
function chargingPercentage(param, outPutValue, timeDiffernce, startPercentage) {
  let resultPercentage = parseInt((param / outPutValue) * timeDiffernce * 100);
  let percentage = resultPercentage + startPercentage;

  return percentage;
}

// 초과 가격 계산 함수
function overChargingPrice(param, outPutValue, timeDiffernce, startPercentage, price, overCharging) {
  let t = overCharging / 100 * outPutValue / param;
  let overPrice = parseInt(t * price * 60);

  return overPrice;
}

// 예약페이지의 취소버튼 info페이지로 이동
function reservationCancelButton() {
  const info = document.querySelector('#info-wrap1');
  const reservation = document.querySelector('#info-wrap2');
  info.style.visibility = "visible";
  reservation.style.visibility = "hidden";
  modifyCheck = false;
}

// 충전시작퍼센트 입력하는 input=text 비우기
function clearStartPercentage() {
  const startPercentageInput = document.querySelector('#reservation-startPercentage');
  startPercentageInput.value = "";
}

function clearReservationPage(date) {
  const resultPercentage = document.querySelector("#reservation-endPercentage");
  const overPercentage = document.querySelector("#reservation-overPercentage");
  const payment = document.querySelector("#charging-payment");
  const overPayment = document.querySelector("#over-charging-payment");
  const fee = document.querySelector("#reservation-fee");
  const startPercentage = document.querySelector("#reservation-startPercentage");

  resultPercentage.innerText = "";
  overPercentage.innerText = "";
  payment.innerText = "";
  overPayment.innerText = "";
  fee.innerText = "";
  startPercentage.value = "";
  selectCheck = false;
  timeResult = false;
  timeResultList = 1;
  // defaultReservationPage();
  changeInsertReservationButton(date);
}

function defaultReservationPage() {
  const reservationButtonWrap = document.querySelector("#reservation-button-wrap");

  reservationButtonWrap.innerHTML =
    `        
        <button id="reservation-button" onclick="onClickReservationButton(${mId})">예약하기</button>
        <button id="reservation-cancle-button" onclick="reservationCancelButton()">취소하기</button>
    `;
}

function changeInsertReservationButton(date, couponNum) {
  const reservationButtonWrap = document.querySelector("#reservation-button-wrap");

  if (modifyCheck == false) {
    reservationButtonWrap.innerHTML =
      `        
        <button id="reservation-button" onclick="onClickReservationButton(${mId}, '${date}')">예약하기</button>
        <button id="reservation-cancle-button" onclick="reservationCancelButton()">취소하기</button>
    `;
  } else {
    reservationButtonWrap.innerHTML = `
        <button id="reservation-button" onclick="onClickModifyReservatonButton(${mId}, '${couponNum}', '${date}')">예약변경</button>
        <button id="reservation-cancle-button" onclick="deleteReservation('${couponNum}')">예약취소</button>
        `;
  }

}