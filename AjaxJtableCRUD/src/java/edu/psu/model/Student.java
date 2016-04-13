package edu.psu.model;

public class Student {

private String LAST_NAME;
private String FIRST_NAME;
private String PSU_ID;
private int TEAM;

public String getPsuId() {
	return PSU_ID;
}

public String getFirstName() {
	return FIRST_NAME;
}

public String getLastName() {
	return LAST_NAME;
}

public int getTeam() {
	return TEAM;
}

public void setPsuId(String psuID) {
	this.PSU_ID = psuID;
}

public void setLastName(String lastName) {
	this.LAST_NAME = lastName;
}

public void setFirstName(String firstName) {
	this.FIRST_NAME = firstName;
}

public void setTeam(int team) {
	this.TEAM = team;
}
}