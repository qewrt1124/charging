package project.oecr.reservation.service;

import project.oecr.dto.CarInfoDto;
import project.oecr.dto.ReservationDto;

import java.util.List;

public interface ReservationService {

  public List<ReservationDto> getReservationList(ReservationDto reservationDto);

  public ReservationDto insertReservation(ReservationDto reservationDto);

  public List<CarInfoDto> getCarData(CarInfoDto ManuFac);

  public ReservationDto getReservationStatIdInfo(ReservationDto reservationDto);
}
