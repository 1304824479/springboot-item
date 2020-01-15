package com.hardy.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(value="user对象",description="用户对象user")
public class UserResponse {

	@ApiModelProperty(value="id")
	private int id;
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
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	@ApiModelProperty(value="姓名")
	private String name;
	@ApiModelProperty(value="年龄")
	private int age;
}
