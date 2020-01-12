package com.hardy;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages={"com.hardy.mapper"})
public class ItemApp {


	public static void main(String[] args) {
		SpringApplication.run(ItemApp.class, args);
	}

}
