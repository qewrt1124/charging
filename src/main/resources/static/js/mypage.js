function onClinkMyPageReservation(mId) {
  contentNumber = 1;
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

function memberDelete(mId) {

}