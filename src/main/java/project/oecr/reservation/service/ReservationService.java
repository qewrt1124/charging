package project.oecr.reservation.service;

import project.oecr.dto.CarInfoDto;
import project.oecr.dto.ReservationDto;

import java.util.List;

public interface ReservationService {

  public List getReservationList(ReservationDto reservationDto);

<<<<<<< HEAD
  public int insertReservation(ReservationDto reservationDto);

  public List getCarData(CarInfoDto ManuFac);
=======

  public List getMenuFacList(CarInfoDto ManuFac);

  public List getModel(CarInfoDto Model);
>>>>>>> 8b4cf511731e88aa8c33cad77e171eca67d4917b
}
