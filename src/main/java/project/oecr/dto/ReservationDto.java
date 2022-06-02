package project.oecr.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Data
public class ReservationDto {

  private String rId;
  private String userId;
  private String date;
  private String startTime;
  private String endTime;
  private String chargerId;
  private String statId;
  private String coupon;
}
