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

  private String nameSpace = "mapper.reservation";

  public List getReservationList(ReservationDto reservationDto) {

    return sqlSession.selectList(nameSpace + ".getReservationList", reservationDto);
  }

<<<<<<< HEAD
  public List getCarManu(CarInfoDto carInfoDto) {

    return sqlSession.selectList(nameSpace + ".getCarData", carInfoDto);
  }

  public List getCarModel(CarInfoDto carInfoDto) {

    return sqlSession.selectList(nameSpace + ".getCarModel", carInfoDto);
  }

  public int insertReservation(ReservationDto reservationDto) {

    return sqlSession.insert(nameSpace + ".insertReservation", reservationDto);
  }
=======

  public List getManuFac(String ManuFac) {

    return sqlSession.selectList(nameSpace + ".carInfo", ManuFac);
  }


//  public List getModel(String Model) {
//
//    return sqlSession.selectList(nameSpace + ".carInfo", Model);
//  }
>>>>>>> 8b4cf511731e88aa8c33cad77e171eca67d4917b
}