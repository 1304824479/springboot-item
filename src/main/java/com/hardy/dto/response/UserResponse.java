package com.hardy.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;


@ApiModel(value="user对象",description="用户对象user")
public class UserResponse {

	@ApiModelProperty(value="id")
	private int id;
	@ApiModelProperty(value="姓名")
	private String name;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@ApiModelProperty(value="密码")
	private String password;
}
