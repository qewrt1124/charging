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

  public List getReservationList(ReservationDto reservationDto) {

    return sqlSession.selectList(nameSpace + ".getReservationList", reservationDto);
  }

  public List getCarManu(CarInfoDto carInfoDto) {

    return sqlSession.selectList(nameSpace + ".getCarData", carInfoDto);
  }

  public List getCarModel(CarInfoDto carInfoDto) {

    return sqlSession.selectList(nameSpace + ".getCarModel", carInfoDto);
  }

  public int insertReservation(ReservationDto reservationDto) {

    return sqlSession.insert(nameSpace + ".insertReservation", reservationDto);
  }
}