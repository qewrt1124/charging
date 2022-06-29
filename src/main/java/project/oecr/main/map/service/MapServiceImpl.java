package project.oecr.main.map.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.oecr.dto.ChargingInfoDto;
import project.oecr.dto.FavoriteDto;
import project.oecr.main.map.dao.MapDao;

import java.util.ArrayList;
import java.util.List;

@Service
public class MapServiceImpl implements MapService {

  @Autowired
  private MapDao mapDao;

  @Override
  public List<ChargingInfoDto> getChargingInfo(String statId) {

    return mapDao.getChargingInfo(statId);
  }

  @Override
  public List<ChargingInfoDto> getRangeList(ChargingInfoDto chargingInfoDto) {

    switch (chargingInfoDto.getLevel()) {
      case 1:
        chargingInfoDto.setDistance("0.1");
        break;
      case 2:
        chargingInfoDto.setDistance("0.3");
        break;
      case 3:
        chargingInfoDto.setDistance("0.5");
        break;
      case 4:
        chargingInfoDto.setDistance("0.8");
        break;
      case 5:
        chargingInfoDto.setDistance("1");
        break;
      case 6:
        chargingInfoDto.setDistance("1.5");
        break;
      case 7:
        chargingInfoDto.setDistance("2");
        break;
      case 8:
        chargingInfoDto.setDistance("5");
        break;
    }

    return mapDao.rangeLevel(chargingInfoDto);
  }

  @Override
  public List<ChargingInfoDto> getFavoriteList(FavoriteDto favoriteDto) {

    return mapDao.getFavoriteList(favoriteDto);
  }

  @Override
  @Transactional
  public void addFavorite(FavoriteDto favoriteDto) {
    mapDao.addFavorite(favoriteDto);
  }

  @Override
  @Transactional
  public void deleteFavorite(FavoriteDto favoriteDto) {
    mapDao.deleteFavorite(favoriteDto);
  }

  @Override
  public List<FavoriteDto> getFavoriteCheck(FavoriteDto favoriteDto) {

    return mapDao.getFavoriteCheck(favoriteDto);
  }

  @Override
  public List<ChargingInfoDto> searchForStation(ChargingInfoDto chargingInfoDto) {
    List<ChargingInfoDto> result = new ArrayList<ChargingInfoDto>();

    if (chargingInfoDto.getStatNm() == null) {
      result = mapDao.searchForAddr(chargingInfoDto.getAddr());
    } else {
      result = mapDao.searchForStatNm(chargingInfoDto.getStatNm());
    }

    return result;
  }

  @Override
  public int favoriteCount(FavoriteDto favoriteDto) {

    return mapDao.favoriteCount(favoriteDto);
  }
}
