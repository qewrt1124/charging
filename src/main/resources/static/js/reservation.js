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
}

function inputOption(d) {
  for (let [key, value] of d) {
    let carMenu = document.createElement("option");
    carMenu.value = value;
    carMenu.innerText = value;
    target.appendChild(carMenu);
  }
}

function onClickCheckBox(e) {
  // changeCheckBox(e);
  continuousCheck(e);
}

function changeCheckBox(e) {
  if (!(e.checked)) {
    e.nextElementSibling.style.backgroundColor = "white";
  }
}

let preValue;
let nextValue = 0;

function continuousCheck(e) {
    nextValue = e.value;
    if ((nextValue - preValue) > 1) {
      alert("연속된 시간을 선택하세요");
      event.preventDefault();
    } else {
      preValue = e.value;
      e.nextElementSibling.style.backgroundColor = "grey";
    }
  changeCheckBox(e);
}

function getOptionValue(e) {

}
