package project.oecr.reservation.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.oecr.dto.CarInfoDto;
import project.oecr.dto.ReservationDto;
import project.oecr.reservation.dao.ReservationDao;
import project.oecr.reservationView.dao.ReservationViewDao;
import project.oecr.vo.ResultVo;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService {

  @Autowired
  private ReservationDao reservationDao;

  @Autowired
  private ReservationViewDao reservationViewDao;

  @Override
  public List<ReservationDto> getReservationList(ReservationDto reservationDto) {

    return reservationDao.getReservationList(reservationDto);
  }

  @Override
  @Transactional
  public ResultVo insertReservation(ReservationDto reservationDto) {

    String couponCode = makeCoupon(reservationDto);
    reservationDto.setCouponNum(couponCode);
    List<Integer> tidList = reservationDto.getTidList();

    for (Integer integer : tidList) {
      reservationDto.setTid(integer);
      reservationDao.insertReservation(reservationDto);
    }

    ResultVo result = reservationDao.getReservationCoupon(couponCode);

    List<Integer> endTimeList = reservationDao.getSameCouponNum(couponCode);

    if (result != null) {
      if (endTimeList.contains(1) && endTimeList.contains(24)) {
        int max = endTimeList.get(endTimeList.size() - 1);
        for (int k = 1; k < endTimeList.size(); k++) {
          if (endTimeList.get(k) < 10) {
            if (max < endTimeList.get(k)) {
              result.setEndTime(endTimeList.get(k));
              max = endTimeList.get(k);
            }
          } else {
            result.setStartTime(endTimeList.get(k) - 1);
          }
        }
      } else {
        result.setStartTime(endTimeList.get(0) - 1);
        for (int j = 0; j < endTimeList.size(); j++) {
          result.setEndTime(endTimeList.get(j));
        }
      }
    }

    return result;
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

    return strTime;
  }

  public String getDate() {
    LocalDate now = LocalDate.now();
    String nowDate = now.format(DateTimeFormatter.ofPattern("yyddMM"));

    System.out.println("nowDate : " + nowDate);

    String[] splitedDate = nowDate.split("-");

    return nowDate;
  }

  @Override
  public List<CarInfoDto> getCarData(CarInfoDto carInfoDto) {

    List<CarInfoDto> result = reservationDao.getCarManu(carInfoDto);

    if (!(carInfoDto.getManufac() == null)) {
      result = reservationDao.getCarModel(carInfoDto);
    } else if (!(carInfoDto.getModel() == null)) {
      result = reservationDao.getCarBatCap(carInfoDto);
    } else if (!(carInfoDto.getBatCap() == null)) {
      result = new ArrayList<>();

      CarInfoDto carInfoDto1 = new CarInfoDto();
      carInfoDto1.setOutPut("dddd");
      result.add(carInfoDto1);
    }

    return result;
  }
}
