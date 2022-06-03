package project.oecr.dto;

import lombok.Data;

@Data
public class ReservationDto {

  private Long rId;
  private String userId;
  private String statNm;
  private String resLocal;
  private String chgerId;
  private String resDate;
  private int tId;
  private String chgerType;
  private String manuFac;
  private String model;
  private String batCap;
  private String chgerCharge;
  private String outPut;
}
