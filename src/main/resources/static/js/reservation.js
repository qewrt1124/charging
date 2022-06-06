function is_checked() {

  // 1. checkbox element를 찾습니다.
  const checkbox = document.getElementById('my_checkbox');

  // 2. checked 속성을 체크합니다.
  const is_checked = checkbox.checked;

  // 3. 결과를 출력합니다.
  console.log(is_checked);

}

// function ManuFac(manuFac) {
//   let ResParam ={
//     "manuFac": manuFac,
//   };
// }
//
// getManuFac(ManuFac);
// getModel(Model);

// let
//
// function getCarInfo(){
const manuFac = document.querySelector('#cars-manufacturer-select');
//   const Model = document.querySelector('#cars-sub-category');
//
//   manuFac.innerHTML = `${}`
// }

// 차량 관련 함수
function getManuFac() {
  let a = getCarInfo();
  fetch('/getManuFac', {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(a)
  }).then(res => res.json())
    .then(data => {
      console.log(data)
    })
}

function showMap(){
  console.log(getCarInfo());
  console.log(1234124);
}

function getModel(Model) {
  fetch('/getModel', {
    method: 'get',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  }).then(rea => rea.json())
    .then(data => {
      console.log(data)
    })
}

function getCarInfo() {
  let TeslaCompany = new Map();
  TeslaCompany.set("Tesla", "테슬라");

  let HyundaiCompany = new Map();
  HyundaiCompany.set("Hyundai", "현대");

  const manuFac = document.querySelector('#cars-manufacturer-select');
  let map = {"manufac": manuFac.value};



  // car.set("기아", "기아");
  // car.set("폭스바겐", "폭스바겐");

  let teslaModel = new Map();
  teslaModel.set("TeslaCompany", "모델3");
  teslaModel.set("TeslaCompany", "모델Y");
  teslaModel.set("TeslaCompany", "모델S");
  teslaModel.set("TeslaCompany", "모델X");

  let hyundaiModel = new Map();
  hyundaiModel.set("HytundaiCompany", "그랜저 하이브리드");
  hyundaiModel.set("HytundaiCompany", "코나 하이브리드");
  hyundaiModel.set("HytundaiCompany", "아반떼 하이브리드");
  hyundaiModel.set("HytundaiCompany", "포터2 일렉트");
  hyundaiModel.set("HytundaiCompany", "싼타페 하이브리드");
  hyundaiModel.set("HytundaiCompany", "쏘나타 하이브리드");
  hyundaiModel.set("HytundaiCompany", "투싼하이브리드");

  teslaModel.forEach((value, key) => console.log(key + ',' + value));
  let target = document.getElementById("cars-sub-category");

  return map;
}

// // 차량정보 db로 모델 정보 전부 다 가져오기
// function getCarInfo(model){
//   fetch('/getCarInfo?model=' + model, {
//     method: 'get',
//     dataType: 'json',
//   }).then(res => res.json())
//     .then(data => {
//       console.log(data);
//     });
// }
// let carMenufacturer;
// let carModelList;


// 차량 제조사 내역 가지고 오기

// let TeslaModel = new Map();
// TeslaModel.set("Tesla", "Model3");
//
// TeslaModel.forEach((value, key,) => console.log(key + ',' + value));
// let target = document.getElementById("cars-sub-category");
//
// if (e === "Hyundai") {
//   inputOption(carMenufacturer);
// }

// 차량 모델 가지고 오기
// function SelectCarModel() {
//   let teslaModel = new Map();
//   teslaModel.set("tesla", "모델3");
//   teslaModel.set("tesla", "모델Y");
//   teslaModel.set("tesla", "모델S");
//   teslaModel.set("tesla", "모델X");

// teslaModel.forEach((value, key) => console.log(key + ',' + value));
// let target = document.getElementById("cars-model-select");
// }

//차량 정보 리스트로 뿌리기

// function carModelList(model) {
//   let list = document.querySelector('#cars-manufacturer-select');
//
//   list.innerHTML = "";
//
// }

// 차량 모델 정보 가져오는 함수
function getModelList(model) {
  let ModelList = {
    "model": model
  };

  fetch('/ModelList', {
    method: 'get',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ModelList)
  }).then(res => res.json())
    .then(data => {
      console.log(data);
    })
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

function activate() {
  const time1 = document.querySelector('#reservation-time1');
}

// let myelement = document.querySelector('input[name="my_check"]');
// console.log(myelement.value);

function onClickReservationButton() {

}

// function insertReservation() {
//   fetch()
// }

