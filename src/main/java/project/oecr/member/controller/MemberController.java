package project.oecr.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import project.oecr.dto.MemberDto;
import project.oecr.member.service.MemberService;

@Controller
public class MemberController {

  @Autowired
  MemberService memberService;

  //회원가입
  @GetMapping("/join")
  public String getJoin() {
    return "/member/join";
  }

  @PostMapping("/join")
  public String postJoin(MemberDto memberDto, Model model) {

    int result = memberService.join(memberDto, model);

    if (result != 1) {

      return "redirect:/login";
    }

    return "redirect:/";
  }

  //로그인
  @GetMapping("/login")
  public String getLogin() {

    return "/member/login";
  }

  // 로그인 체크
//  @PostMapping("/loginCheck")
//  @ResponseBody
//  public String loginCheck(@RequestBody MemberDto memberDto, HttpSession session) {
//
//    String result = memberService.loginCheck(memberDto, session);
//
//    return result;
//  }

  //로그아웃
//  @GetMapping("/logout")
//  public String logOut(HttpSession session, HttpServletRequest request){
//
//    String page = memberService.logOut(session, request);
//
//    return page;
//  }
}