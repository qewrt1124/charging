package project.oecr.reservation.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import project.oecr.dto.CarInfoDto;
import project.oecr.dto.ReservationDto;

import java.util.List;

@Repository
public class ReservationDao {

  @Autowired
  private SqlSessionTemplate sqlSession;

  private final String nameSpace = "mapper.reservation";

  public List<ReservationDto> getReservationList(ReservationDto reservationDto) {

    return sqlSession.selectList(nameSpace + ".getReservationList", reservationDto);
  }

  public List<CarInfoDto> getCarManu(CarInfoDto carInfoDto) {

    return sqlSession.selectList(nameSpace + ".getCarData", carInfoDto);
  }

  public List<CarInfoDto> getCarModel(CarInfoDto carInfoDto) {

    return sqlSession.selectList(nameSpace + ".getCarModel", carInfoDto);
  }

  public List<CarInfoDto> getCarBatCap(CarInfoDto carInfoDto) {

    return sqlSession.selectList(nameSpace + ".getCarBatCap", carInfoDto);
  }

  public int insertReservation(ReservationDto reservationDto) {

    return sqlSession.insert(nameSpace + ".insertReservation", reservationDto);
  }

  public ReservationDto getReservationCoupon(String couponCode) {

    return sqlSession.selectOne(nameSpace + ".getReservationCoupon", couponCode);
  }

  public List<Integer> getSameCouponNum(String couponCode) {

    return sqlSession.selectList(nameSpace + ".getSameCouponNum", couponCode);
  }

  public ReservationDto getReservationStatIdInfo(ReservationDto reservationDto) {

    return sqlSession.selectOne(nameSpace + ".getReservationStatIdInfo", reservationDto);
  }
}