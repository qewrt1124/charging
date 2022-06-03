document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    dateClick: function (info) {
      alert('Date: ' + info.dateStr);
      alert('Resource ID: ' + info.resource.id);
    },
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true,
    businessHours: true,
    dayMaxEvents: true, // allow "more" link when too many events
    height: 350,
  });
  calendar.render();
});

// let str = '06:00 ~ 08:00';
// let time1 = str.substr(0, 2);
// let time2 = str.substr(-5, 2);
//
// console.log(time1);
// console.log(time2);

function is_checked() {

  // 1. checkbox element를 찾습니다.
  const checkbox = document.getElementById('my_checkbox');

  // 2. checked 속성을 체크합니다.
  const is_checked = checkbox.checked;

  // 3. 결과를 출력합니다.
  console.log(is_checked);

}

function carMenufacturer(e) {
  let car = new Map();
  car.set("테슬라", "테슬라");
  car.set("현대", "현대");
  car.set("기아", "기아");
  car.set("폭스바겐", "폭스바겐");

  let carModel = [1, 2, 3, 4];

  car.forEach((value, key,) => console.log(key + ',' + value));
  let target = document.getElementById("cars-sub-category");

  if (e === "Hyundai") {
    inputOption(carModel);
  }

  function inputOption(d) {
    for (let i=0; i<d.length; i++){
      let carMenu = document.createElement("option");
      carMenu.value = d[i];
      carMenu.innerText = value;
      target.appendChild(carMenu);
    }
    for (let [key, value] of d) {
      let carMenu = document.createElement("option");
      carMenu.value = value;
      carMenu.innerText = value;
      target.appendChild(carMenu);
    }
  }
}

// let myelement = document.querySelector('input[name="my_check"]');
// console.log(myelement.value);
