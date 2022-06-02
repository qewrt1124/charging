package project.oecr.mypage.personalInformation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PersonalInformationController {

  @GetMapping("/mypage/persionalInformation")
  public String getPersonalInformation() {
    return "/mypage/personalInformation/personalInfomation";
  }

  @GetMapping("/mypage/persionalInformationToModify")
  public String getPersonalInfrmationToModify() {
    return "/mypage/personalInformation/personalInformationToModify";
  }
}
