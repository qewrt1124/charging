package project.oecr.api.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Objects;

@Repository
public class ApiDao {

  @Autowired
  private SqlSessionTemplate sqlSession;

  private String nameSpace = "mapper.api";

  public void insertInfo(ArrayList electricInfo) {

    for (int i = 0; i < electricInfo.size(); i++) {
      HashMap<String, String> map1 = (HashMap<String, String>) electricInfo.get(i);
      if (i > electricInfo.size() - 1) {
        HashMap<String, String> map2 = (HashMap<String, String>) electricInfo.get(i+1);
        if (!(Objects.equals(map1.get("statId"), map2.get("statId")))) {
          sqlSession.insert(nameSpace + ".insertInfo", electricInfo.get(i));
        }
      } else if (i == electricInfo.size() - 1) {
        HashMap<String, String> map2 = (HashMap<String, String>) electricInfo.get(i-1);
        if (!(Objects.equals(map1.get("statId"), map2.get("statId")))) {
          sqlSession.insert(nameSpace + ".insertInfo", electricInfo.get(i));
        }
      }
    }
  }
}
