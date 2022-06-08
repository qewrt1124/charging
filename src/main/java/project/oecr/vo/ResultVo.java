package project.oecr.vo;

import lombok.Data;

@Data
public class ResultVo {
  private String couponNum;
  private int result;
  private String resDate;
  private int startTime;
  private int endTime;
  private String chgerCharge;
  private String statNm;
  private String chgerId;
}
