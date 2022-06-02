package project.oecr.main.header.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HeaderController {

  @GetMapping("/header")
  public String getHeader() {
    return "/main/header/header";
  }

}