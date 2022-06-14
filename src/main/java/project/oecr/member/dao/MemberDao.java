package project.oecr.member.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import project.oecr.dto.MemberDto;

import java.util.List;

@Repository
public class MemberDao {

  @Autowired
  private SqlSessionTemplate sqlSession;

  private static String nameSpace = "mapper.member";

  public MemberDto loginCheck(MemberDto memberDto) {
    
    return sqlSession.selectOne(nameSpace + ".loginCheck", memberDto);
  }

  public int insertJoin(MemberDto memberDto) {

    return sqlSession.insert(nameSpace + ".insertJoin", memberDto);
  }

  public int deleteMember(MemberDto memberDto) {

    return sqlSession.delete(nameSpace + ".deleteMember", memberDto);
  }

  public List<MemberDto> duplicateCheck(MemberDto memberDto) {

    return sqlSession.selectOne(nameSpace + ".duplicateCheck", memberDto);
  }
}
