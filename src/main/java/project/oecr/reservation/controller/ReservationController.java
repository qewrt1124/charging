package project.oecr.reservation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import project.oecr.dto.CarInfoDto;
import project.oecr.dto.ReservationDto;
import project.oecr.reservation.service.ReservationService;
import project.oecr.vo.ResultVo;

import java.util.List;

@RestController
public class ReservationController {

  @Autowired
  private ReservationService reservationService;

  @PostMapping("/getReservationList")
  public List getReservationList(@RequestBody ReservationDto reservationDto) {

    System.out.println("getReservationList : " + reservationDto);

    List list = reservationService.getReservationList(reservationDto);

    return list;
  }

  @PostMapping("/insertReservation")
  public List<ResultVo> insertReservation(@RequestBody ReservationDto reservationDto) {

    return reservationService.insertReservation(reservationDto);
  }

  @PostMapping("/getCarData")
  public List getCarData(@RequestBody CarInfoDto carInfoDto) {

    List list = reservationService.getCarData(carInfoDto);

    return list;
  }
}