package project.oecr.reservationView.service;

import project.oecr.dto.ReservationDto;

import java.util.List;

public interface ReservationViewService {

  public List<ReservationDto> getReservationList(ReservationDto reservationDto);

  public int reservationViewCount(ReservationDto reservationDto);

  public List<ReservationDto> getReservationNowPage(ReservationDto reservationDto);

  public void deleteReservation(ReservationDto reservationDto);

  public List<ReservationDto> modifyReservation(ReservationDto reservationDto);

  public List<ReservationDto> getSameCouponNumList(ReservationDto reservationDto);
}
