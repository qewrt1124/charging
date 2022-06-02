package project.oecr.mypage.mycar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyCarController {

  @GetMapping("/mypage/mycar")
  public String getMyCar() {
    return "/mypage/mycar/mycar";
  }

  @GetMapping("/mypage/mycarRegistration")
  public String getMyCarRegistration() {
    return "/mypage/mycar/mycarRegistration";
  }
}
