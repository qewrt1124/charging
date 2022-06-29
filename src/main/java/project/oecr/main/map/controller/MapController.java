package project.oecr.main.map.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.oecr.dto.ChargingInfoDto;
import project.oecr.dto.FavoriteDto;
import project.oecr.main.map.service.MapService;

import java.util.List;

@RestController
public class MapController {

  @Autowired
  private MapService mapService;

  @PostMapping("/rangeList")
  public List<ChargingInfoDto> getRangeList(@RequestBody ChargingInfoDto chargingInfoDto) {

    List<ChargingInfoDto> list = mapService.getRangeList(chargingInfoDto);
//    List<ChargingInfoDto> resultList = mapService.getFavoriteList(list);

    return list;
  }

  @GetMapping("/chargingInfo")
  public List<ChargingInfoDto> getChargingInfo(@RequestParam("statId") String statId) {

    return mapService.getChargingInfo(statId);
  }

  @PostMapping("/getFavoriteList")
  public List<ChargingInfoDto> getFavoriteList(@RequestBody FavoriteDto favoriteDto) {

    return mapService.getFavoriteList(favoriteDto);
  }

  @PostMapping("/addFavorite")
  public void addFavorite(@RequestBody FavoriteDto favoriteDto) {
    mapService.addFavorite(favoriteDto);
  }

  @DeleteMapping("/deleteFavorite")
  public void deleteFavorite(@RequestBody FavoriteDto favoriteDto) {
    mapService.deleteFavorite(favoriteDto);
  }

  @PostMapping("/getFavoriteCheck")
  public List<FavoriteDto> getFavoriteCheck(@RequestBody FavoriteDto favoriteDto) {

    return mapService.getFavoriteCheck(favoriteDto);
  }

  @PostMapping("/searchForStation")
  public List<ChargingInfoDto> searchForStation(@RequestBody ChargingInfoDto chargingInfoDto) {

    System.out.println("검색 확인 statNm : " + chargingInfoDto.getStatNm());
    System.out.println("검색 확인 addr : " + chargingInfoDto.getAddr());

    return mapService.searchForStation(chargingInfoDto);
  }

  @PostMapping("/favoriteCount")
  public int favoriteCount(@RequestBody FavoriteDto favoriteDto) {

    return mapService.favoriteCount(favoriteDto);
  }
}
