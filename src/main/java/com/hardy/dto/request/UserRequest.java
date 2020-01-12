package com.hardy.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(value="user请求对象",description="用户对象user")
public class UserRequest {
	
	@ApiModelProperty(value="姓名")
	private String name;
	@ApiModelProperty(value="年龄")
	private int age;
}
