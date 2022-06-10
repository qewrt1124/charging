package project.oecr.member.service;

import org.springframework.stereotype.Service;
import project.oecr.dto.MemberDto;

import javax.servlet.http.HttpSession;

@Service
public interface MemberService {
  public int loginCheck(MemberDto memberDto, HttpSession session);

  public int insertJoin(MemberDto memberDto);
}
