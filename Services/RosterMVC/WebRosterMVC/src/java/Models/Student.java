package Models;

import java.io.Serializable;

public class Student implements Serializable {
    private String firstName, lastName, studentID;
    private int team;
    
    public Student()
    {}

    public void setFirstName(String firstName) {
	this.firstName = firstName;
    }
    
    public String getFirstName() {
	return this.firstName;
    }
    
    public void setLastName(String lastName) {
	this.lastName = lastName;
    }
    
    public String getLastName() {
	return this.lastName;
    }
    
    public void setStudentID(String studentID) {
	this.firstName = studentID;
    }
    
    public String getStudentID() {
	return this.studentID;
    }
    
    public void setTeam(int team) {
	this.team = team;
    }
    
    public int getTeam() {
	return this.team;
    }
}