package project.oecr.reservation.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import project.oecr.dto.CarInfoDto;
import project.oecr.dto.ReservationDto;
import project.oecr.vo.ResultVo;

import java.util.List;

@Repository
public class ReservationDao {

  @Autowired
  private SqlSessionTemplate sqlSession;

  private final String nameSpace = "mapper.reservation";

  public List<ReservationDto> getReservationList(ReservationDto reservationDto) {

    System.out.println("reservationDao : " + reservationDto);

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

  public List<ResultVo> getReservationCoupon(String couponCode) {

    return sqlSession.selectList(nameSpace + ".getReservationCoupon", couponCode);
  }
}