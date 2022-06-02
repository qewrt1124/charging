package project.oecr.main.map.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import project.oecr.dto.ChargingInfoDto;

import java.util.List;

@Repository
public class MapDao {

  @Autowired
  private SqlSessionTemplate sqlSession;

  private String nameSpace = "mapper.map";

  public List getChargingInfo(String statId) {

    return sqlSession.selectList(nameSpace + ".chargingInfo", statId);
  }

  public List rangeLevel(ChargingInfoDto chargingInfoDto) {

    return sqlSession.selectList(nameSpace + ".rangeLevel", chargingInfoDto);
  }
}
