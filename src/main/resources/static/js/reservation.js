function is_checked() {

  // 1. checkbox element를 찾습니다.
  const checkbox = document.getElementById('my_checkbox');

  // 2. checked 속성을 체크합니다.
  const is_checked = checkbox.checked;

  // 3. 결과를 출력합니다.
  console.log(is_checked);

}

function onClickCheckBox(e) {
  // changeCheckBox(e);
  getSelectedTimeStamp();
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
  let checkedList = document.querySelectorAll("input[type='checkbox']:checked");

  if (checkedList.length > 1) {
    nextValue = e.value;
    if ((nextValue - preValue) > 1 || (preValue - nextValue) > 1) {
      alert("연속된 시간을 선택하세요");
      event.preventDefault();
    } else {
      preValue = e.value;
      e.nextElementSibling.style.backgroundColor = "grey";
    }
  } else {
    preValue = 0;
    nextValue = 0;
    preValue = e.value;
    e.nextElementSibling.style.backgroundColor = "grey";
  }

  changeCheckBox(e);
}

function getCarList(e) {
  fetch('/getCarData', {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(selectValue(e))
  }).then(res => res.json())
    .then(data => {
      console.log(data);
      changeOption(data);
    }).catch(() => {
    console.log('실패');
  });
}

function selectValue(e) {
  let result;

  if (e == null) {
    result = {'null': null};
  } else {
    switch (e.name) {
      case 'manufac':
        result = {
          'manufac': e.value
        };
        break;
      case 'model':
        result = {
          'model': e.value
        };
        break;
      case 'batCap':
        result = {
          'batCap': e.value
        };
        break;
    }
  }

  return result;
}

function changeOption(list) {
  let targetNum;

  if (!(list[0].manufac == null)) {
    targetNum = 0;
    inputOption(list, targetNum);
  } else if (!(list[0].model == null)) {
    targetNum = 1;
    inputOption(list, targetNum);
  } else if (!(list[0].batCap ==  null)) {
    targetNum = 2;
    inputOption(list, targetNum);
  } else if (!(list[0].outPut == null)) {
    targetNum = 3;
    inputOption(list, targetNum);
  }
}

function inputOption(list, targetNum) {
  let target;

  if (targetNum === 0) {
    target = document.querySelector('#cars-manufacturer-select');
  } else if (targetNum === 1) {
    target = document.querySelector('#cars-model-select');
    target.innerHTML = `<option value="modelChoose">---모델을 선택해주세요---</option>`;
  } else if (targetNum === 2) {
    target = document.querySelector('#cars-batCap-select');
    target.innerHTML = `<option value="batCapChoose">---배터리용량을 선택해주세요---</option>`;
  } else if (targetNum === 3) {
    target = document.querySelector('#cars-outPut-select');
    target.innerHTML = `<option value="outPutChoose">---충전속도를 선택해주세요---</option>`;

    if (selectChgerType === 2) {
      list = [{'outPut': '완속'}];
    } else {
      list = [{'outPut': '급속'}];
    }
  }

  for (let i = 0; i < list.length; i++) {
    let opt = document.createElement("option");
    opt.value = list[i][target.getAttribute("name")];
    opt.innerText = list[i][target.getAttribute("name")];
    target.appendChild(opt);
  }
}

function getSelectedTimeStamp() {
  const resTime = document.querySelector('#reservation-resTime');
  let selectedTime = document.querySelectorAll("input[type='checkbox']:checked");
  let startTime = selectedTime[0].nextElementSibling.innerText.split('~');
  let endTime = selectedTime[selectedTime.length - 1].nextElementSibling.innerText.split('~');

  let resultTime = startTime[0] + '~' + endTime[1];

  resTime.innerText = resultTime;
}

function viewChargingPercentage(e) {
  const chargeType = document.querySelector('#cars-outPut-select');
  const out = document.querySelector('#cars-batCap-select');
  let startValue = e;
  let param;
  let result;
  let outPutValue;

  if (chargeType.value === '완속') {
    param = 7;
  } else {
    param = 50;
  }

  outPutValue = out.value;
  result = parseInt(startValue + (param / outPutValue * 100));
  console.log(result);
}