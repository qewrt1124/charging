package project.oecr.reservationView.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import project.oecr.dto.ReservationDto;
import project.oecr.reservation.service.ReservationService;
import project.oecr.reservationView.service.ReservationViewService;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ReservationViewController {

  @Autowired
  private ReservationViewService reservationViewService;

  @PostMapping("/reservationView")
  public List<ReservationDto> getReservationList(@RequestBody ReservationDto reservationDto) {

    System.out.println("reservationView : " + reservationDto);

    return reservationViewService.getReservationList(reservationDto);
  }
}
