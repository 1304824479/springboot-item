package com.hardy.dto.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(value="id对象")
public class IdRequest {

	@ApiModelProperty(value="id")
	private int id;
}
