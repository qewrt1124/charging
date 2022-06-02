package project.oecr.member.service;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import project.oecr.dto.MemberDto;

@Service
public interface MemberService {

  public int join(MemberDto memberDto, Model model);


//  public String loginCheck(MemberDto memberDto, HttpSession httpSession);
//
//  public String logOut(HttpSession session, HttpServletRequest request);


}
