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

  public int getEndTime(int i, List<ReservationDto> list) {

    return list.get(i).getEndTime();
  }

  @Override
  public List<ReservationDto> getReservationList(ReservationDto reservationDto) {

    List<ReservationDto> duplicateList = reservationViewDao.getDuplicateReservationList(reservationDto);

    if (duplicateList.size() != 0) {
      for (int i = 0; i < duplicateList.size(); i++) {
        duplicateList.get(i).setStartTime(getEndTime(i, duplicateList) - 1);
        List<Integer> list = reservationViewDao.getSameCouponNum(duplicateList.get(i).getCouponNum());
        if (list.contains(1) && list.contains(24)) {
          int max = list.get(list.size() - 1);
          for (int k = 1; k < list.size(); k++) {
            if (list.get(k) < 10) {
              if (max < list.get(k)) {
                duplicateList.get(i).setEndTime(list.get(k));
                max = list.get(k);
              }
            } else {
              duplicateList.get(i).setStartTime(list.get(k) - 1);
            }
          }
        } else {
          duplicateList.get(i).setStartTime(list.get(0) - 1);
          for (int j = 0; j < list.size(); j++) {
            duplicateList.get(i).setEndTime(list.get(j));
          }
        }
      }
    }


    return duplicateList;
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
