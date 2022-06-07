package project.oecr.reservation.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.oecr.dto.CarInfoDto;
import project.oecr.dto.ReservationDto;
import project.oecr.reservation.dao.ReservationDao;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
  public int insertReservation(ReservationDto reservationDto) {

    reservationDto.setCouponNum(makeCoupon(reservationDto));
    List tidList = reservationDto.getTidList();
    int result = 0;

    for (int i = 0; i < tidList.size(); i++) {
      reservationDto.setTid((Integer) tidList.get(i));
      result = reservationDao.insertReservation(reservationDto);
      if (result == 0) {
        break;
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

    return resultTime;
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
