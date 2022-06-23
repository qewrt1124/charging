package project.oecr.reservationView.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import project.oecr.dto.ReservationDto;
import project.oecr.reservationView.service.ReservationViewService;

import java.util.List;

@RestController
public class ReservationViewController {

  @Autowired
  private ReservationViewService reservationViewService;

  @PostMapping("/reservationView")
  public List<ReservationDto> getReservationList(@RequestBody ReservationDto reservationDto) {

    System.out.println("reservationDto : " + reservationDto);

    return reservationViewService.getReservationList(reservationDto);
  }

  @PostMapping("/reservationViewCount")
  public int reservationViewCount(@RequestBody ReservationDto reservationDto) {

    return reservationViewService.reservationViewCount(reservationDto);
  }

  @PostMapping("/reservationNowPage")
  public List<ReservationDto> getReservationNowPage(@RequestBody ReservationDto reservationDto) {

    return reservationViewService.getReservationNowPage(reservationDto);
  }
}
