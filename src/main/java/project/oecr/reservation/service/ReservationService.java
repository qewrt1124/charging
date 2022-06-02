package project.oecr.reservation.service;

import org.springframework.ui.Model;

import project.oecr.dto.ReservationDto;

public interface ReservationService {

  public int reservation(ReservationDto reservationDto, Model model);
}
