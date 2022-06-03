package project.oecr.dto;

import lombok.Data;

@Data
public class ReservationInfoDto {

  private int rId;
  private String userId;
  private String statNm;
  private String resLoca;
  private String resDate;
  private String resTime;
  private String chgerType;
  private String manuFac;
  private String model;
  private String batCap;
  private String chgerCharge;
  private String outPut;
}
