package project.oecr.reservation.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.oecr.dto.ReservationDto;
import project.oecr.reservation.dao.ReservationDao;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
  public int insertReservation(ReservationDto reservationDto) {

    System.out.println("serviceImpl : " + reservationDto);
    reservationDto.setCouponNum(makeCoupon(reservationDto));
    System.out.println("afterCoupon : " + reservationDto);

    return 0;
  }

  public String makeCoupon(ReservationDto reservationDto) {

    StringBuffer result = new StringBuffer();

    String statId = reservationDto.getStatId();
    String date = getDate();
    String time = getMillisecond();

    result.append(statId);
    result.append(date);
    result.append(time);

    String stResult = result.toString();

    return stResult;
  }

  public String getMillisecond() {
    Long millis = System.currentTimeMillis();

    String strTime = millis.toString();
    String resultTime = strTime.substring(0, 7);

    return resultTime;
  }

  public String getDate() {
    LocalDate now = LocalDate.now();
    String nowDate = now.format(DateTimeFormatter.ofPattern("yyddMM"));

    System.out.println("nowDate : " + nowDate);

    String[] splitedDate = nowDate.split("-");

    return nowDate;
  }
}
