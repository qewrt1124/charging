package project.oecr.reservation.controller;

import org.springframework.beans.factory.annotation.Autowired;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
=======
import org.springframework.web.bind.annotation.*;
>>>>>>> 8b4cf511731e88aa8c33cad77e171eca67d4917b
import project.oecr.dto.CarInfoDto;
import project.oecr.dto.ReservationDto;
import project.oecr.dto.TimeDto;
import project.oecr.reservation.service.ReservationService;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ReservationController {

  @Autowired
  private ReservationService reservationService;

  @PostMapping("/getReservationList")
  public List getReservationList(@RequestBody ReservationDto reservationDto) {

    List list = reservationService.getReservationList(reservationDto);

    return list;
  }

<<<<<<< HEAD
  @PostMapping("/insertReservation")
  public int insertReservation(@RequestBody ReservationDto reservationDto) {

    int result = reservationService.insertReservation(reservationDto);

    return 1;
  }

  @PostMapping("/getCarData")
  public List getCarData(@RequestBody CarInfoDto carInfoDto) {

    List list = reservationService.getCarData(carInfoDto);
=======
  @PostMapping("/getManuFac")
  public List getManuFac(CarInfoDto carInfoDto) {
    List list = reservationService.getMenuFacList(carInfoDto);

    System.out.println(carInfoDto);
    return list;
  }


  @PostMapping("/getModel")
  public List getModel(CarInfoDto carInfoDto) {

    List list = reservationService.getModel(carInfoDto);

    System.out.println("차 모델+++++++++++");
>>>>>>> 8b4cf511731e88aa8c33cad77e171eca67d4917b

    return list;
  }
}