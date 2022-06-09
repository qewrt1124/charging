// 예약확인 페이지 내용 갈아 끼우기
function changeCompletePage(data) {
  const completeChgerId = document.querySelector("#complete-chgerId");
  const completeStatNm = document.querySelector("#complete-statNm");
  const completeResDate = document.querySelector("#complete-resDate");
  const completeResTime = document.querySelector("#complete-resTime");
  const completeFee = document.querySelector("#complete-fee");

  let dataLength = data.length;
  let startTime = data[0].startTime;
  let endTime = data[dataLength - 1].endTime;
  let finalResTime = startTime + " ~ " + endTime + '시';

  completeChgerId.innerText = `${data[0].chgerId}`;
  completeStatNm.innerText = `${data[0].statNm}`;
  completeResDate.innerText = `${data[0].resDate}`;
  completeResTime.innerText = `${finalResTime}`;
  completeFee.innerText = `${data[0].chgerCharge}원`;
}

// 예약확인 페이지 이동
function reservationCheck() {
  const reservation = document.querySelector("#info-wrap2");
  const complete = document.querySelector("#info-wrap3");
  reservation.style.visibility = "hidden";
  complete.style.visibility = "visible";
}

// 예약확인 페이지 닫기
function completePageExit() {
  const complete = document.querySelector("#info-wrap3");
  complete.style.visibility = "hidden";
}