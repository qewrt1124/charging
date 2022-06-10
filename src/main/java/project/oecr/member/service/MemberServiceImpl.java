package project.oecr.member.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.oecr.dto.MemberDto;
import project.oecr.member.dao.MemberDao;

import javax.servlet.http.HttpSession;

@Service
public class MemberServiceImpl implements MemberService {

  @Autowired
  private MemberDao memberDao;

  @Override
  public int loginCheck(MemberDto memberDto, HttpSession session) {

    MemberDto check = memberDao.loginCheck(memberDto);

    int result = 0;

    if (check != null) {
      result = 1;
      session.setAttribute("userId", check.getUserId());
    }

    return result;
  }

  @Override
  @Transactional
  public int insertJoin(MemberDto memberDto) {

    return memberDao.insertJoin(memberDto);
  }
}
