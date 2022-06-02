
package project.oecr.api.controller;

import java.io.IOException;

import javax.xml.parsers.ParserConfigurationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.xml.sax.SAXException;

import project.oecr.api.service.ApiService;

@Controller
public class ApiController {

   @Autowired
   private ApiService apiService;

   @GetMapping("/api")
   public String getMypageList() throws ParserConfigurationException, IOException, SAXException {

       apiService.inputData();
 
       return "/mypage/mypageList";
   }
}