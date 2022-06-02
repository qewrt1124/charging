package project.oecr.reservation.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import project.oecr.dto.ReservationDto;
import project.oecr.reservation.dao.ReservationDao;

@Service
public class ReservationServiceImpl implements ReservationService {

  @Autowired
  private ReservationDao reservationDao;

  @Override
  public int reservation(ReservationDto reservationDto, Model model) {
    
    int result = reservationDao.enroll(reservationDto);

    return 1;
  }
}
