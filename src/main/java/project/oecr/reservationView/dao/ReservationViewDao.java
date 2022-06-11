package project.oecr.reservationView.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import project.oecr.dto.ReservationDto;

import java.util.List;

@Repository
public class ReservationViewDao {

  @Autowired
  private SqlSessionTemplate sqlSession;

  private String nameSpace = "mapper.reservationView";

  public List<ReservationDto> getReservationList(ReservationDto reservationDto) {

    System.out.println("Dao , Dao : " + reservationDto);

    return sqlSession.selectList(nameSpace + ".getReservationViewList", reservationDto);
  }
}
