package project.oecr.main.map.service;

import project.oecr.dto.ChargingInfoDto;
import project.oecr.dto.FavoriteDto;

import java.util.List;

public interface MapService {

  public List<ChargingInfoDto> getChargingInfo(String statId);

  public List<ChargingInfoDto> getRangeList(ChargingInfoDto chargingInfoDto);

  public List<ChargingInfoDto> getFavoriteList(FavoriteDto favoriteDto);

  public void addFavorite(FavoriteDto favoriteDto);

  public void deleteFavorite(FavoriteDto favoriteDto);

  public List<FavoriteDto> getFavoriteCheck(FavoriteDto favoriteDto);

  public List<ChargingInfoDto> searchForStation(ChargingInfoDto chargingInfoDto);

  public int favoriteCount(FavoriteDto favoriteDto);
}