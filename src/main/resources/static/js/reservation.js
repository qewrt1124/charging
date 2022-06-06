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

function getCarList(e) {
  fetch('/getCarData', {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(selectValue(e))
  }).then(res => res.json())
    .then(data => {
      changeOption(data);
      console.log(data);
    }).catch(() => {
    console.log('실패');
  });
}

function is_checked() {

  // 1. checkbox element를 찾습니다.
  const checkbox = document.getElementById('my_checkbox');

  // 2. checked 속성을 체크합니다.
  const is_checked = checkbox.checked;

  // 3. 결과를 출력합니다.
  console.log(is_checked);

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
    }
  }

  return result;
}

function changeOption(list) {
  let targetNum;

  if (!(list[0].manufac == null)) {
    console.log("manufac");
    targetNum = 0;
    inputOption(list, targetNum);
  } else if (!(list[0].model == null)) {
    console.log("model");
    targetNum = 1;
    inputOption(list, targetNum);
  }
}

function inputOption(list, targetNum) {
  let target;

  if (targetNum === 0) {
    target = document.querySelector('#cars-manufacturer-select');
  } else if (targetNum === 1) {
    target = document.querySelector('#cars-model-select');
  } else if (targetNum === 2) {
    target = document.querySelector('#cars-batCap-select');
  } else if (targetNum === 3) {
    target = document.querySelector('#cars-outPut-select');
  }

  for (let i = 0; i < list.length; i++) {
    let opt = document.createElement("option");
    opt.value = list[i].target.name;
    opt.innerText = list[i].target.name;
    target.appendChild(opt);
  }
}