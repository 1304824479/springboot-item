package com.hardy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.hardy.entity.User;

public interface UserMapper {

	@Select("select * from USERS WHERE id = #{id}")
	public User getUserById(@Param("id") Integer id);
	
	@Select("select * from USERS WHERE NAME = #{name}")
	User findByName(@Param("name") String name,@Param("password") Integer password);
	
	@Insert("insert into users(name,password) values(#{name},#{password})")
	int insert(@Param("name") String name,@Param("password") String password);
	
	@Select("select * from USERS ")
	public List<User> getList();
}
