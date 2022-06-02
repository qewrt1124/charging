package project.oecr.reservation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import project.oecr.dto.ReservationDto;
import project.oecr.reservation.service.ReservationService;

@Controller
public class ReservationController {
  
  @Autowired
  private ReservationService reservationService;

  @GetMapping("/reservation")
  public String getReservation() {
    
    return "/reservation/reservation";
  }

  @GetMapping("/reservation1")
  public String getReservation(Model model) {

    return "/reservation/reservation1";
  }
 
   @PostMapping("/reservation")
   public String postReservation(ReservationDto reservationDto, Model model) {
 
     int result = reservationService.reservation(reservationDto, model);
 
     if (result != 1) {
 
       return "redirect:/#";
     }
 
     return "redirect:/";
   }
}
