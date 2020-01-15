package com.hardy.controller;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hardy.dto.request.IdRequest;
import com.hardy.dto.request.UserRequest;
import com.hardy.dto.response.UserResponse;
import com.hardy.entity.User;
import com.hardy.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api("用户管理")
@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
	@ApiOperation(value="创建用户", notes="根据User对象创建用户")
	@RequestMapping(value="/insertUser",method=RequestMethod.POST)
	public Integer insertUser(@RequestBody UserRequest request){
		String name=request.getName();
		String password=request.getPassword();
		return userService.insertUser(name, password);
	}
	
	@ApiOperation(value="查询用户列表", notes="查询用户列表")
	@RequestMapping(value="/getUserList",method=RequestMethod.POST)
	public List<UserResponse> getUserList(){
		List<User> userList=this.userService.getList();
		List<UserResponse> respList=new ArrayList<UserResponse>();
		if(userList!=null&&userList.size()>0){
			for(User u:userList){
				UserResponse resp=new UserResponse();
				resp.setPassword(u.getPassword());
				resp.setId(u.getId());
				resp.setName(u.getName());
				respList.add(resp);
			}
		}
		return respList;
	}
	
	@ApiOperation(value="获取用户", notes="根据ID获取用户")
	@RequestMapping(value="/getUser",method=RequestMethod.POST)
	public UserResponse getUser(@RequestBody IdRequest request){
		int id=request.getId();
		User u=this.userService.getUserById(id);
		if(u!=null){
			UserResponse resp=new UserResponse();

			resp.setPassword(u.getPassword());
			resp.setId(u.getId());
			resp.setName(u.getName());
			return resp;
		}else{
			return null;
		}
	}
}
