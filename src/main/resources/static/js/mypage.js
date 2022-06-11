function onClinkMyPageReservation(mId) {
  const reservationView = document.querySelector('#info-wrap7');
  console.log(mId);
  getReservationView(mId);
  reservationView.style.visibility = 'visible';
}