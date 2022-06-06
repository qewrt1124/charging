package project.oecr.reservation.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.oecr.dto.CarInfoDto;
import project.oecr.dto.ReservationDto;
import project.oecr.reservation.dao.ReservationDao;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService {

  @Autowired
  private ReservationDao reservationDao;

  @Override
  public List getReservationList(ReservationDto reservationDto) {

    return reservationDao.getReservationList(reservationDto);
  }

  @Override
  public List getMenuFacList(CarInfoDto ManuFac) {
    System.out.println(ManuFac);

    List list = new ArrayList();

    return list;
//    return reservationDao.getManuFac("ManuFac");
  }

  @Override
  public List getModel(CarInfoDto Model) {
    List list = new ArrayList();

    return list;
//    return reservationDao.getModel("Model");
  }
}