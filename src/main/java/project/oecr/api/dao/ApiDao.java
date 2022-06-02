package project.oecr.api.dao;

import java.util.ArrayList;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ApiDao {

  @Autowired
  private SqlSessionTemplate sqlSession;

  private String nameSpace = "mapper.api";

  public void insertInfo(ArrayList electricInfo) {
    for (int i = 0; i < electricInfo.size(); i++) {
      sqlSession.insert(nameSpace + ".insertInfo", electricInfo.get(i));
    }
  }
}
