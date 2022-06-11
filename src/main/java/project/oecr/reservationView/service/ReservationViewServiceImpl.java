package project.oecr.reservationView.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.oecr.dto.ReservationDto;
import project.oecr.reservationView.dao.ReservationViewDao;

import java.util.List;

@Service
public class ReservationViewServiceImpl implements ReservationViewService {

  @Autowired
  private ReservationViewDao reservationViewDao;

  @Override
  public List<ReservationDto> getReservationList(ReservationDto reservationDto) {

//    System.out.println("ServiceImpl : " + reservationDto);

    return reservationViewDao.getReservationList(reservationDto);
  }
}
