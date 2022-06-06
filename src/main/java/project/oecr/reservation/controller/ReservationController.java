package project.oecr.reservation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import project.oecr.dto.ReservationDto;
import project.oecr.dto.TimeDto;
import project.oecr.reservation.service.ReservationService;

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

  @PostMapping("/insertReservation")
  public int insertReservation(@RequestBody ReservationDto reservationDto) {

    int result = reservationService.insertReservation(reservationDto);

    return 1;
  }
}