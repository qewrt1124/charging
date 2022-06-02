package project.oecr.main.map.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.oecr.dto.ChargingInfoDto;
import project.oecr.main.map.dao.MapDao;

import java.util.ArrayList;
import java.util.List;

@Service
public class MapServiceImpl implements MapService {

  @Autowired
  private MapDao mapDao;

  @Override
  public List getChargingInfo(String statId) {

    List list = new ArrayList();
//    mapDao.getChargingInfo(cId)
    return mapDao.getChargingInfo(statId);
  }

  @Override
  public List getRangeList(ChargingInfoDto chargingInfoDto) {

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
}
