package project.oecr.main.map.service;

import project.oecr.dto.ChargingInfoDto;

import java.util.List;

public interface MapService {

  public List getChargingInfo(String statId);

  public List getRangeList(ChargingInfoDto chargingInfoDto);
}