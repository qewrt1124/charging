package project.oecr.reservation.service;

import project.oecr.dto.ReservationDto;

import java.util.List;

public interface ReservationService {

  public List getReservationList(ReservationDto reservationDto);

  public int insertReservation(ReservationDto reservationDto);
}
