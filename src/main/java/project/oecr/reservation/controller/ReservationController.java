package project.oecr.reservation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import project.oecr.reservation.service.ReservationService;

@Controller
public class ReservationController {
  
  @Autowired
  private ReservationService reservationService;

}
