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

    int startPage = startPageNumber(reservationDto.getPageNumber());

    reservationDto.setPageNumber(startPage);
    List<ReservationDto> duplicateList = reservationViewDao.getDuplicateReservationList(reservationDto);
    reservationTime(duplicateList);

    return duplicateList;
  }

  // 시간 맞게 띄우게
  public void reservationTime(List<ReservationDto> duplicateList) {
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
  }

  public int startPageNumber(int pageNumber) {
    int startPage;

    if (pageNumber == 0) {
      startPage = pageNumber;
    } else {
      startPage = (pageNumber - 1) * 10;
    }

    return startPage;
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
