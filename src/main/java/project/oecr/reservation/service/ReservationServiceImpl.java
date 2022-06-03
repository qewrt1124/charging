package project.oecr.reservation.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.oecr.dto.ReservationDto;
import project.oecr.reservation.dao.ReservationDao;

import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService {

  @Autowired
  private ReservationDao reservationDao;

  @Override
  public List getReservationList(ReservationDto reservationDto) {

    reservationDao.getReservationList(reservationDto);

    return null;
  }
}
