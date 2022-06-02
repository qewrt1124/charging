package project.oecr.dto;

import lombok.Data;

@Data
public class ChargingInfoDto {

  private int cId;
  private String statNm;
  private String statId;
  private String chgerId;
  private String chgerType;
  private String addr;
  private String location;
  private Float lat;
  private Float lng;
  private String useTime;
  private String busiId;
  private String bnm;
  private String busiNm;
  private String busiCall;
  private String stat;
  private String statUpdDt;
  private String lastTsdt;
  private String lastTedt;
  private String nowTsdt;
  private String powerType;
  private String output;
  private String method;
  private String zcode;
  private String parkingFree;
  private String note;
  private String limitYn;
  private String limitDetail;
  private String delYn;
  private String delDetail;
  private Float centerLat;
  private Float centerLng;
  private int level;
  private String distance;
}
