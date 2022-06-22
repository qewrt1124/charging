package project.oecr.dto;

import lombok.Data;

import java.util.List;

@Data
public class ReservationDto {

  private Long rId;
  private int mid;
  private String couponNum;
  private String statId;
  private String chgerId;
  private String resDate;
  private int tid;
  private int chgerCharge;
  private int startTime;
  private int endTime;
  private List<Integer> tidList;
  private String statNm;
  private int pageNumber;
  private int totalPageCount;
}
