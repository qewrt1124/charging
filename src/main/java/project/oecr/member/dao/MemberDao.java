package project.oecr.member.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import project.oecr.dto.MemberDto;

@Repository
public class MemberDao {

  @Autowired
  private SqlSessionTemplate sqlSession;

  private static String nameSpace = "mapper.member";

  public int join(MemberDto memberDto) {

    return sqlSession.insert(nameSpace + ".join", memberDto);
  }

  public MemberDto select(MemberDto memberDto) {

    return sqlSession.selectOne(nameSpace + ".login", memberDto);
  }
}
