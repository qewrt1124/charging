package project.oecr.dto;

import lombok.Data;

@Data
public class ReservationDto {

  private Long rId;
  private String userId;
  private String couponNum;
  private String statId;
  private String chgerId;
  private String resDate;
  private int tId;
  private String chgerCharge;
  private String startTime;
  private String endTime;
}
