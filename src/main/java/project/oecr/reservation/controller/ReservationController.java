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
  public List<ReservationDto> getReservationList(@RequestBody ReservationDto reservationDto) {

    return reservationService.getReservationList(reservationDto);
  }

  @PostMapping("/insertReservation")
  public ResultVo insertReservation(@RequestBody ReservationDto reservationDto) {

    return reservationService.insertReservation(reservationDto);
  }

  @PostMapping("/getCarData")
  public List<CarInfoDto> getCarData(@RequestBody CarInfoDto carInfoDto) {

    return  reservationService.getCarData(carInfoDto);
  }

  @PostMapping("/getReservationStatIdInfo")
  public ReservationDto getReservationStatIdInfo(@RequestBody ReservationDto reservationDto) {

    return reservationService.getReservationStatIdInfo(reservationDto);
  }
}