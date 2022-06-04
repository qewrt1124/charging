package project.oecr.reservation.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
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
}