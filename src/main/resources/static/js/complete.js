// 예약확인 페이지 내용 갈아 끼우기
function changeCompletePage(data) {
  console.log("예약확인 페이지 바꾸기 : " + data);

  const completeChgerId = document.querySelector("#complete-chgerId");
  const completeStatNm = document.querySelector("#complete-statNm");
  const completeResDate = document.querySelector("#complete-resDate");
  const completeResTime = document.querySelector("#complete-resTime");
  const completeFee = document.querySelector("#complete-fee");

  console.log("completePage : " + data);

  let startTime = data.startTime;
  let endTime = data.endTime;
  let finalResTime = startTime + " ~ " + endTime + '시';

  completeChgerId.innerText = `${data.chgerId}`;
  completeStatNm.innerText = `${data.statNm}`;
  completeResDate.innerText = `${data.resDate}`;
  completeResTime.innerText = `${finalResTime}`;
  completeFee.innerText = `${data.chgerCharge}원`;
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