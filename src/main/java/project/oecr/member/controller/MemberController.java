package project.oecr.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import project.oecr.dto.MemberDto;
import project.oecr.member.service.MemberService;

import javax.servlet.http.HttpSession;

@RestController
public class MemberController {

  @Autowired
  private MemberService memberService;

  @PostMapping("/login")
  public int login(@RequestBody MemberDto memberDto, HttpSession session) {

    System.out.println(memberDto);

    int result = memberService.loginCheck(memberDto, session);

    return result;
  }

  @PostMapping("/join")
  public int join(@RequestBody MemberDto memberDto) {

    return memberService.insertJoin(memberDto);
  }

  @PostMapping("/logout")
  public void logout(HttpSession session) {

    memberService.logout(session);
  }

  @DeleteMapping("/deleteMember")
  public int deleteMember(@RequestBody MemberDto memberDto, HttpSession session) {

    return memberService.deleteMember(memberDto, session);
  }

  @PostMapping("/idDuplicateCheck")
  public int duplicateCheck(@RequestBody MemberDto memberDto) {

    int result = 1;

    if (memberService.duplicateCheck(memberDto) != null) {
      result = 0;
    }

    System.out.println(result);

    return result;
  }
}