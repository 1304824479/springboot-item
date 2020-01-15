package com.hardy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hardy.entity.User;
import com.hardy.mapper.UserMapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserService {

	@Autowired
	private UserMapper userMapper;
	
	@Transactional
	public int insertUser(String name,String age){
		int result=userMapper.insert(name, age);
		/*int i=1/age;
		System.out.println(i);
		log.info("#####result="+result);*/
		return result;
	}
	
	public User getUserById(int id){
//		log.info(id+"");
		return this.userMapper.getUserById(id);
	}
	
	public List<User> getList(){
		return this.userMapper.getList();
	}
	
}
