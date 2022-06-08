package project.oecr.reservation.service;

import project.oecr.dto.CarInfoDto;
import project.oecr.dto.ReservationDto;
import project.oecr.vo.ResultVo;

import java.util.List;

public interface ReservationService {

  public List<ReservationDto> getReservationList(ReservationDto reservationDto);

  public List<ResultVo> insertReservation(ReservationDto reservationDto);

  public List<CarInfoDto> getCarData(CarInfoDto ManuFac);
}
