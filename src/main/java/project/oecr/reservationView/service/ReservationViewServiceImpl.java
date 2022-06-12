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

    System.out.println(reservationDto);
    int pageNumber = reservationDto.getPageNumber();
    int startPage = 0;

    if (pageNumber > 0) {
      startPage = (pageNumber - 1) * 10;
    }

    reservationDto.setPageNumber(startPage);

    return reservationViewDao.getReservationList(reservationDto);
  }

  @Override
  public int reservationViewCount(ReservationDto reservationDto) {

    return reservationViewDao.getReservationCount(reservationDto);
  }

  @Override
  public List<ReservationDto> getReservationNowPage(ReservationDto reservationDto) {

    return reservationViewDao.getReservationList(reservationDto);
  }
}
