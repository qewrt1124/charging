package project.oecr.main.map.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

  @GetMapping("/main")
  public String getMap() {

    return "/main/map/main";
  }
}
