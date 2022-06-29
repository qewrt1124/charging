package project.oecr.main.map.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import project.oecr.dto.ChargingInfoDto;
import project.oecr.dto.FavoriteDto;

import java.util.List;

@Repository
public class MapDao {

  @Autowired
  private SqlSessionTemplate sqlSession;

  private String nameSpace = "mapper.map";

  public List<ChargingInfoDto> getChargingInfo(String statId) {

    return sqlSession.selectList(nameSpace + ".chargingInfo", statId);
  }

  public List<ChargingInfoDto> rangeLevel(ChargingInfoDto chargingInfoDto) {

    return sqlSession.selectList(nameSpace + ".rangeLevel", chargingInfoDto);
  }

  public List<FavoriteDto> getFavoriteList(FavoriteDto favoriteDto) {

    return sqlSession.selectList(nameSpace + ".getFavoriteList", favoriteDto);
  }

  public void addFavorite(FavoriteDto favoriteDto) {
    sqlSession.insert(nameSpace + ".addFavorite", favoriteDto);
  }

  public void deleteFavorite(FavoriteDto favoriteDto) {
    sqlSession.delete(nameSpace + ".deleteFavorite", favoriteDto);
  }

  public List<FavoriteDto> getFavoriteCheck(FavoriteDto favoriteDto) {

    return sqlSession.selectList(nameSpace + ".getFavoriteCheck", favoriteDto);
  }

  public List<ChargingInfoDto> searchForAddr(String addr) {

    return sqlSession.selectList(nameSpace + ".searchForAddr", addr);
  }

  public List<ChargingInfoDto> searchForStatNm(String statNm) {

    return sqlSession.selectList(nameSpace + ".searchForStatNm", statNm);
  }
}
