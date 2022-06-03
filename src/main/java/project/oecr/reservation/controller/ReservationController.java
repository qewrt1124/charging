package project.oecr.reservation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import project.oecr.dto.ReservationDto;
import project.oecr.reservation.service.ReservationService;

import java.util.ArrayList;
import java.util.List;

@Controller
public class ReservationController {
  
  @Autowired
  private ReservationService reservationService;

  @PostMapping("/reservationList")
  @ResponseBody
  public List getReservationList(@RequestBody ReservationDto reservationDto) {

    reservationService.getReservationList(reservationDto);

    List list = new ArrayList();

    return list;
  }
}
