package project.oecr.mypage.boardList.controller;

import java.io.IOException;

import javax.xml.parsers.ParserConfigurationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.xml.sax.SAXException;

import project.oecr.api.service.ApiService;

@Controller
public class BoardListController {

  @Autowired
  private ApiService boardListService;

  @GetMapping("/mypageList")
  public String getMypageList() throws ParserConfigurationException, IOException, SAXException {

    // boardListService.jsonTest();
    boardListService.inputData();

    return "/mypage/mypageList";
  }
}
