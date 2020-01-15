package com.hardy.entity;

import lombok.Getter;
import lombok.Setter;


public class User {

<<<<<<< HEAD
	private int id;
=======
	private Integer id;
	private String password;
>>>>>>> branch 'dev' of https://github.com/1304824479/springboot-item
	private String name;
<<<<<<< HEAD
	private String password;
	private int rid;
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
	public int getRid() {
		return rid;
	}
	public void setRid(int rid) {
		this.rid = rid;
=======
	private int rid;
	public int getRid() {
		return rid;
	}
	public void setRid(int rid) {
		this.rid = rid;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
>>>>>>> branch 'dev' of https://github.com/1304824479/springboot-item
	}
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
