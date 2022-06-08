package project.oecr.reservation.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.oecr.dto.CarInfoDto;
import project.oecr.dto.ReservationDto;
import project.oecr.reservation.dao.ReservationDao;
import project.oecr.vo.ResultVo;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService {

  @Autowired
  private ReservationDao reservationDao;

  @Override
  public List<ReservationDto> getReservationList(ReservationDto reservationDto) {

    return reservationDao.getReservationList(reservationDto);
  }

  @Override
  @Transactional
  public List<ResultVo> insertReservation(ReservationDto reservationDto) {

    List<Integer> resultImsi = new ArrayList<>();

    String couponCode = makeCoupon(reservationDto);
    List<ResultVo> resultList = null;
    reservationDto.setCouponNum(couponCode);
    List<Integer> tidList = reservationDto.getTidList();

    ResultVo result = new ResultVo();
    result.setResult(0);
    result.setCouponNum(couponCode);

    for (Integer integer : tidList) {
      reservationDto.setTid(integer);
      int res = reservationDao.insertReservation(reservationDto);
      result.setResult(res);
      resultImsi.add(res);
      if (result.getResult() == 0) {
        throw new RuntimeException();
      }
    }

    resultList = reservationDao.getReservationCoupon(couponCode);
//    for (int i = 0; i < (resultList != null ? resultList.size() : 0); i++) {
//      resultList.get(i).setResult(resultImsi.get(i));
//    }

    return resultList;
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
