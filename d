[1mdiff --cc src/main/java/project/oecr/reservation/controller/ReservationController.java[m
[1mindex a936738,8137c2f..0000000[m
[1m--- a/src/main/java/project/oecr/reservation/controller/ReservationController.java[m
[1m+++ b/src/main/java/project/oecr/reservation/controller/ReservationController.java[m
[36m@@@ -1,14 -1,12 +1,19 @@@[m
  package project.oecr.reservation.controller;[m
  [m
  import org.springframework.beans.factory.annotation.Autowired;[m
[32m++<<<<<<< HEAD[m
[32m +import org.springframework.web.bind.annotation.PostMapping;[m
[32m +import org.springframework.web.bind.annotation.RequestBody;[m
[32m +import org.springframework.web.bind.annotation.RestController;[m
[32m++=======[m
[32m+ import org.springframework.web.bind.annotation.*;[m
[32m++>>>>>>> 8b4cf511731e88aa8c33cad77e171eca67d4917b[m
  import project.oecr.dto.CarInfoDto;[m
  import project.oecr.dto.ReservationDto;[m
[32m +import project.oecr.dto.TimeDto;[m
  import project.oecr.reservation.service.ReservationService;[m
  [m
[32m+ import java.util.ArrayList;[m
  import java.util.List;[m
  [m
  @RestController[m
[36m@@@ -25,18 -23,21 +30,36 @@@[m [mpublic class ReservationController [m
      return list;[m
    }[m
  [m
[32m++<<<<<<< HEAD[m
[32m +  @PostMapping("/insertReservation")[m
[32m +  public int insertReservation(@RequestBody ReservationDto reservationDto) {[m
[32m +[m
[32m +    int result = reservationService.insertReservation(reservationDto);[m
[32m +[m
[32m +    return 1;[m
[32m +  }[m
[32m +[m
[32m +  @PostMapping("/getCarData")[m
[32m +  public List getCarData(@RequestBody CarInfoDto carInfoDto) {[m
[32m +[m
[32m +    List list = reservationService.getCarData(carInfoDto);[m
[32m++=======[m
[32m+   @PostMapping("/getManuFac")[m
[32m+   public List getManuFac(CarInfoDto carInfoDto) {[m
[32m+     List list = reservationService.getMenuFacList(carInfoDto);[m
[32m+ [m
[32m+     System.out.println(carInfoDto);[m
[32m+     return list;[m
[32m+   }[m
[32m+ [m
[32m+ [m
[32m+   @PostMapping("/getModel")[m
[32m+   public List getModel(CarInfoDto carInfoDto) {[m
[32m+ [m
[32m+     List list = reservationService.getModel(carInfoDto);[m
[32m+ [m
[32m+     System.out.println("차 모델+++++++++++");[m
[32m++>>>>>>> 8b4cf511731e88aa8c33cad77e171eca67d4917b[m
  [m
      return list;[m
    }[m
[1mdiff --cc src/main/java/project/oecr/reservation/dao/ReservationDao.java[m
[1mindex a2ae04d,6077d5c..0000000[m
[1m--- a/src/main/java/project/oecr/reservation/dao/ReservationDao.java[m
[1m+++ b/src/main/java/project/oecr/reservation/dao/ReservationDao.java[m
[36m@@@ -21,18 -20,15 +21,32 @@@[m [mpublic class ReservationDao [m
      return sqlSession.selectList(nameSpace + ".getReservationList", reservationDto);[m
    }[m
  [m
[32m++<<<<<<< HEAD[m
[32m +  public List getCarManu(CarInfoDto carInfoDto) {[m
[32m +[m
[32m +    return sqlSession.selectList(nameSpace + ".getCarData", carInfoDto);[m
[32m +  }[m
[32m +[m
[32m +  public List getCarModel(CarInfoDto carInfoDto) {[m
[32m +[m
[32m +    return sqlSession.selectList(nameSpace + ".getCarModel", carInfoDto);[m
[32m +  }[m
[32m +[m
[32m +  public int insertReservation(ReservationDto reservationDto) {[m
[32m +[m
[32m +    return sqlSession.insert(nameSpace + ".insertReservation", reservationDto);[m
[32m +  }[m
[32m++=======[m
[32m+ [m
[32m+   public List getManuFac(String ManuFac) {[m
[32m+ [m
[32m+     return sqlSession.selectList(nameSpace + ".carInfo", ManuFac);[m
[32m+   }[m
[32m+ [m
[32m+ [m
[32m+ //  public List getModel(String Model) {[m
[32m+ //[m
[32m+ //    return sqlSession.selectList(nameSpace + ".carInfo", Model);[m
[32m+ //  }[m
[32m++>>>>>>> 8b4cf511731e88aa8c33cad77e171eca67d4917b[m
  }[m
[1mdiff --cc src/main/java/project/oecr/reservation/service/ReservationService.java[m
[1mindex 4a4cce0,aaa37b7..0000000[m
[1m--- a/src/main/java/project/oecr/reservation/service/ReservationService.java[m
[1m+++ b/src/main/java/project/oecr/reservation/service/ReservationService.java[m
[36m@@@ -9,7 -9,8 +9,14 @@@[m [mpublic interface ReservationService [m
  [m
    public List getReservationList(ReservationDto reservationDto);[m
  [m
[32m++<<<<<<< HEAD[m
[32m +  public int insertReservation(ReservationDto reservationDto);[m
[32m +[m
[32m +  public List getCarData(CarInfoDto ManuFac);[m
[32m++=======[m
[32m+ [m
[32m+   public List getMenuFacList(CarInfoDto ManuFac);[m
[32m+ [m
[32m+   public List getModel(CarInfoDto Model);[m
[32m++>>>>>>> 8b4cf511731e88aa8c33cad77e171eca67d4917b[m
  }[m
[1mdiff --cc src/main/java/project/oecr/reservation/service/ReservationServiceImpl.java[m
[1mindex bdd02e3,62ebf86..0000000[m
[1m--- a/src/main/java/project/oecr/reservation/service/ReservationServiceImpl.java[m
[1m+++ b/src/main/java/project/oecr/reservation/service/ReservationServiceImpl.java[m
[36m@@@ -6,8 -6,6 +6,11 @@@[m [mimport project.oecr.dto.CarInfoDto[m
  import project.oecr.dto.ReservationDto;[m
  import project.oecr.reservation.dao.ReservationDao;[m
  [m
[32m++<<<<<<< HEAD[m
[32m +import java.time.LocalDate;[m
[32m +import java.time.format.DateTimeFormatter;[m
[32m++=======[m
[32m++>>>>>>> 8b4cf511731e88aa8c33cad77e171eca67d4917b[m
  import java.util.ArrayList;[m
  import java.util.List;[m
  [m
[36m@@@ -24,71 -22,20 +27,91 @@@[m [mpublic class ReservationServiceImpl imp[m
    }[m
  [m
    @Override[m
[32m++<<<<<<< HEAD[m
[32m +  public int insertReservation(ReservationDto reservationDto) {[m
[32m +[m
[32m +    reservationDto.setCouponNum(makeCoupon(reservationDto));[m
[32m +    List tidList = reservationDto.getTidList();[m
[32m +    int result = 0;[m
[32m +[m
[32m +    for (int i = 0; i < tidList.size(); i++) {[m
[32m +      reservationDto.setTid((Integer) tidList.get(i));[m
[32m +      result = reservationDao.insertReservation(reservationDto);[m
[32m +      if (result == 0) {[m
[32m +        break;[m
[32m +      }[m
[32m +    }[m
[32m +[m
[32m +    return result;[m
[32m +  }[m
[32m +[m
[32m +  public String makeCoupon(ReservationDto reservationDto) {[m
[32m +[m
[32m +    StringBuffer result = new StringBuffer();[m
[32m +[m
[32m +    String statId = reservationDto.getStatId();[m
[32m +    String date = getDate();[m
[32m +    String time = getMillisecond();[m
[32m +[m
[32m +    result.append(statId);[m
[32m +    result.append(date);[m
[32m +    result.append(time);[m
[32m +[m
[32m +    String stResult = result.toString();[m
[32m +[m
[32m +    return stResult;[m
[32m +  }[m
[32m +[m
[32m +  public String getMillisecond() {[m
[32m +    Long millis = System.currentTimeMillis();[m
[32m +[m
[32m +    String strTime = millis.toString();[m
[32m +    String resultTime = strTime.substring(0, 7);[m
[32m +[m
[32m +    return resultTime;[m
[32m +  }[m
[32m +[m
[32m +  public String getDate() {[m
[32m +    LocalDate now = LocalDate.now();[m
[32m +    String nowDate = now.format(DateTimeFormatter.ofPattern("yyddMM"));[m
[32m +[m
[32m +    System.out.println("nowDate : " + nowDate);[m
[32m +[m
[32m +    String[] splitedDate = nowDate.split("-");[m
[32m +[m
[32m +    return nowDate;[m
[32m +  }[m
[32m +[m
[32m +  @Override[m
[32m +  public List getCarData(CarInfoDto carInfoDto) {[m
[32m +[m
[32m +    List result = reservationDao.getCarManu(carInfoDto);[m
[32m +[m
[32m +    if (!(carInfoDto.getManufac() == null)) {[m
[32m +      result = reservationDao.getCarModel(carInfoDto);[m
[32m +    } else if (!(carInfoDto.getModel() == null)) {[m
[32m +      System.out.println("model쪽");[m
[32m +    }[m
[32m +[m
[32m +    return result;[m
[32m +  }[m
[32m +}[m
[32m++=======[m
[32m+   public List getMenuFacList(CarInfoDto ManuFac) {[m
[32m+     System.out.println(ManuFac);[m
[32m+ [m
[32m+     List list = new ArrayList();[m
[32m+ [m
[32m+     return list;[m
[32m+ //    return reservationDao.getManuFac("ManuFac");[m
[32m+   }[m
[32m+ [m
[32m+   @Override[m
[32m+   public List getModel(CarInfoDto Model) {[m
[32m+     List list = new ArrayList();[m
[32m+ [m
[32m+     return list;[m
[32m+ //    return reservationDao.getModel("Model");[m
[32m+   }[m
[31m -}[m
[32m++}[m
[32m++>>>>>>> 8b4cf511731e88aa8c33cad77e171eca67d4917b[m
[1mdiff --cc src/main/resources/static/css/reservation.css[m
[1mindex ab14eb6,ad8a8b4..0000000[m
[1m--- a/src/main/resources/static/css/reservation.css[m
[1m+++ b/src/main/resources/static/css/reservation.css[m
[36m@@@ -31,19 -30,13 +31,23 @@@[m
    width: 150px;[m
  }[m
  [m
[31m -.reservation-right-td {[m
[32m +#reservation-chgerId {[m
    width: 498px;[m
  }[m
[32m +<<<<<<< HEAD[m
  [m
  input[type='checkbox'] {[m
[32m++<<<<<<< HEAD[m
[32m +  display: inline-block;[m
[32m++=======[m
[32m+   display: block;[m
[32m++>>>>>>> 8b4cf511731e88aa8c33cad77e171eca67d4917b[m
  }[m
[32m +=======[m
[32m +/*input[type='checkbox'] {*/[m
[32m +/*  display: none;*/[m
[32m +/*}*/[m
[32m +>>>>>>> parent of 5be1a1c (complete 페이지 작업 중)[m
  [m
  .reservation-time-wrap label {[m
    border: 1px solid black;[m
[1mdiff --cc src/main/resources/static/js/reservation.js[m
[1mindex 3682547,47c9489..0000000[m
[1m--- a/src/main/resources/static/js/reservation.js[m
[1m+++ b/src/main/resources/static/js/reservation.js[m
[36m@@@ -37,89 -198,22 +37,76 @@@[m [mfunction continuousCheck(e) [m
    changeCheckBox(e);[m
  }[m
  [m
[31m -function getOptionValue(e) {[m
[31m -[m
[32m +function getCarList(e) {[m
[32m +  fetch('/getCarData', {[m
[32m +    method: 'post',[m
[32m +    headers: {[m
[32m +      "Content-Type": "application/json",[m
[32m +    },[m
[32m +    body: JSON.stringify(selectValue(e))[m
[32m +  }).then(res => res.json())[m
[32m +    .then(data => {[m
[32m +      changeOption(data);[m
[32m +      console.log(data);[m
[32m +    }).catch(() => {[m
[32m +    console.log('실패');[m
[32m +  });[m
  }[m
  [m
[31m- function is_checked() {[m
[31m- [m
[31m-   // 1. checkbox element를 찾습니다.[m
[31m-   const checkbox = document.getElementById('my_checkbox');[m
[31m- [m
[31m-   // 2. checked 속성을 체크합니다.[m
[31m-   const is_checked = checkbox.checked;[m
[31m- [m
[31m-   // 3. 결과를 출력합니다.[m
[31m-   console.log(is_checked);[m
[31m- [m
[31m -function activate() {[m
[31m -  const time1 = document.querySelector('#reservation-time1');[m
[31m--}[m
[31m- [m
[32m +function selectValue(e) {[m
[32m +  let result;[m
  [m
[31m -// let myelement = document.querySelector('input[name="my_check"]');[m
[31m -// console.log(myelement.value);[m
[32m +  if (e == null) {[m
[32m +    result = {'null': null};[m
[32m +  } else {[m
[32m +    switch (e.name) {[m
[32m +      case 'manufac':[m
[32m +        result = {[m
[32m +          'manufac': e.value[m
[32m +        };[m
[32m +        break;[m
[32m +      case 'model':[m
[32m +        result = {[m
[32m +          'model': e.value[m
[32m +        };[m
[32m +        break;[m
[32m +    }[m
[32m +  }[m
  [m
[31m -function onClickReservationButton() {[m
[32m +  return result;[m
[32m +}[m
  [m
[32m +function changeOption(list) {[m
[32m +  let targetNum;[m
[32m +[m
[32m +  if (!(list[0].manufac == null)) {[m
[32m +    console.log("manufac");[m
[32m +    targetNum = 0;[m
[32m +    inputOption(list, targetNum);[m
[32m +  } else if (!(list[0].model == null)) {[m
[32m +    console.log("model");[m
[32m +    targetNum = 1;[m
[32m +    inputOption(list, targetNum);[m
[32m +  }[m
  }[m
  [m
[31m -// function insertReservation() {[m
[31m -//   fetch()[m
[31m -// }[m
[32m +function inputOption(list, targetNum) {[m
[32m +  let target;[m
[32m +[m
[32m +  if (targetNum === 0) {[m
[32m +    target = document.querySelector('#cars-manufacturer-select');[m
[32m +  } else if (targetNum === 1) {[m
[32m +    target = document.querySelector('#cars-model-select');[m
[32m +  } else if (targetNum === 2) {[m
[32m +    target = document.querySelector('#cars-batCap-select');[m
[32m +  } else if (targetNum === 3) {[m
[32m +    target = document.querySelector('#cars-outPut-select');[m
[32m +  }[m
  [m
[32m +  for (let i = 0; i < list.length; i++) {[m
[32m +    let opt = document.createElement("option");[m
[32m +    opt.value = list[i].target.name;[m
[32m +    opt.innerText = list[i].target.name;[m
[32m +    target.appendChild(opt);[m
[32m +  }[m
[32m +}[m
[1mdiff --cc src/main/resources/templates/reservation/reservation.html[m
[1mindex 6666fe2,ddf22f5..0000000[m
[1m--- a/src/main/resources/templates/reservation/reservation.html[m
[1m+++ b/src/main/resources/templates/reservation/reservation.html[m
