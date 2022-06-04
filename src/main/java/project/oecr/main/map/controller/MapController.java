package project.oecr.main.map.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import project.oecr.dto.ChargingInfoDto;
import project.oecr.main.map.service.MapService;

import java.util.List;

@RestController
public class MapController {

  @Autowired
  private MapService mapService;

  @PostMapping("/rangeList")
  public List getRangeList(@RequestBody ChargingInfoDto chargingInfoDto) {

    List list = mapService.getRangeList(chargingInfoDto);

    return list;
  }

  @GetMapping("/chargingInfo")
  public List getChargingInfo(@RequestParam("statId") String statId) {

    List list = mapService.getChargingInfo(statId);

    return list;
  }
}
