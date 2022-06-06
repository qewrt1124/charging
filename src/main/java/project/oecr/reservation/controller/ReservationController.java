package project.oecr.reservation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.oecr.dto.CarInfoDto;
import project.oecr.dto.ReservationDto;
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

    return list;
  }
}