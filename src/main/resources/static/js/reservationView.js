function getReservationView(e) {
  fetch("/reservationView", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(makeReservationViewParam(e)),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      makeReservationList(data);
    })
    .catch((e) => {
      console.log("예약리스트 가져오기 실패");
      console.log(e);
    });
}

function makeReservationViewParam(e) {
  let list = {
    "mid": e
  }

  return list;
}

function makeReservationList(e) {

  console.log(e);

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
        <td>${e[i].rId}</td>
        <td>${e[i].statId}</td>
        <td>${e[i].chgerId}</td>
        <td>${e[i].resDate}</td>
        <td>${e[i].tid}</td>
        <td>${e[i].couponNum}</td>
      </tr>
  `;
  }
}
