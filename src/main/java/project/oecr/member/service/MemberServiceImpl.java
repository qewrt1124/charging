package project.oecr.member.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import project.oecr.dto.MemberDto;
import project.oecr.member.dao.MemberDao;

@Service
public class MemberServiceImpl implements MemberService {

  @Autowired
  MemberDao memberDao;

}
