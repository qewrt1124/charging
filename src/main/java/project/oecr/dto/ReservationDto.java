package project.oecr.dto;

import lombok.Data;

import java.util.List;

@Data
public class ReservationDto {

  private Long rId;
  private String userId;
  private String couponNum;
  private String statId;
  private String chgerId;
  private String resDate;
  private int tid;
  private int chgerCharge;
  private String startTime;
  private String endTime;
  private List<Integer> tidList;
  private String statNm;
}
