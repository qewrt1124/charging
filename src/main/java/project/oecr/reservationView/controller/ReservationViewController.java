package project.oecr.reservationView.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import project.oecr.dto.ReservationDto;
import project.oecr.reservation.service.ReservationService;
import project.oecr.reservationView.service.ReservationViewService;
import project.oecr.vo.ResultVo;

import java.util.List;

@RestController
public class ReservationViewController {

  @Autowired
  private ReservationViewService reservationViewService;

  @Autowired
  private ReservationService reservationService;

  @PostMapping("/reservationView")
  public List<ReservationDto> getReservationList(@RequestBody ReservationDto reservationDto) {

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

  @DeleteMapping("/deleteReservation")
  public void deleteReservation(@RequestBody ReservationDto reservationDto) {

    System.out.println("deleteReservation : " + reservationDto);

    reservationViewService.deleteReservation(reservationDto);
  }

  @PostMapping("/modifyReservation")
  public ResultVo modifyReservation(@RequestBody ReservationDto reservationDto) {

//    reservationViewService.deleteReservation(reservationDto);
//    reservationService.insertReservation(reservationDto);

    return reservationService.insertReservation(reservationDto);
  }

  @PostMapping("/getSameCouponNumList")
  public List<ReservationDto> getSameCouponNumList(@RequestBody ReservationDto reservationDto) {

    System.out.println("getSameCouponNumList : " + reservationDto);

    return reservationViewService.getSameCouponNumList(reservationDto);
  }
}
