package project.oecr.reservation.service;

import project.oecr.dto.CarInfoDto;
import project.oecr.dto.ReservationDto;

import java.util.List;

public interface ReservationService {

  public List getReservationList(ReservationDto reservationDto);


  public List getMenuFacList(CarInfoDto ManuFac);

  public List getModel(CarInfoDto Model);
}
