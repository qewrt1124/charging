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
  public List<FavoriteDto> getFavoriteList(@RequestBody FavoriteDto favoriteDto) {

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

    System.out.println("즐겨찾기 controller : " + mapService.getFavoriteCheck(favoriteDto));

    return mapService.getFavoriteCheck(favoriteDto);
  }

  @GetMapping("/searchForStation")
  public List<ChargingInfoDto> searchForStation(
      @RequestParam(value = "statNm", required = false) String statNm,
      @RequestParam(value = "addr", required = false) String addr) {

    return mapService.searchForStation(statNm, addr);
  }
}
