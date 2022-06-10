package project.oecr.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import project.oecr.dto.MemberDto;
import project.oecr.member.service.MemberService;

import java.util.ArrayList;
import java.util.List;

@RestController
public class MemberController {

  @Autowired
  MemberService memberService;

  @PostMapping("/login")
  public List<Integer> login(@RequestBody MemberDto memberDto) {

    System.out.println(memberDto);

    List<Integer> list = new ArrayList<>();
    list.add(1);

    return list;
  }
}