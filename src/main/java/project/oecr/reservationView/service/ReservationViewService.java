package project.oecr.reservationView.service;

import project.oecr.dto.ReservationDto;

import java.util.List;

public interface ReservationViewService {

  public List<ReservationDto> getReservationList(ReservationDto reservationDto);
}
