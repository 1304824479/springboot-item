package com.hardy.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(value="user对象",description="用户对象user")
public class UserResponse {

	@ApiModelProperty(value="id")
	private int id;
	@ApiModelProperty(value="姓名")
	private String name;
	@ApiModelProperty(value="年龄")
	private int age;
}
