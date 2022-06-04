package project.oecr.main.map.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import project.oecr.main.map.service.MapService;

@Controller
public class GetMainController {

  @GetMapping("/map")
  public String getMap() {

    return "/main/map/map";
  }
}
