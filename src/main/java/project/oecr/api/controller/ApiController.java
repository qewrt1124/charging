
package project.oecr.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.xml.sax.SAXException;
import project.oecr.api.service.ApiService;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;

@Controller
public class ApiController {

   @Autowired
   private ApiService apiService;

   @GetMapping("/api")
   public void getMypageList() throws ParserConfigurationException, IOException, SAXException {

       apiService.inputData();
   }
}