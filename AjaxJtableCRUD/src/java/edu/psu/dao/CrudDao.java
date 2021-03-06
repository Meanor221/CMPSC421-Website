package edu.psu.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import edu.psu.jdbc.DBUtility;
import edu.psu.model.Student;

public class CrudDao {

    private Connection dbConnection;
    private PreparedStatement pStmt;

    public CrudDao() {
        dbConnection = DBUtility.getConnection();
    }

    public void addStudent(Student student) {
        String insertQuery = "INSERT INTO STUDENT(LAST_NAME, FIRST_NAME, "
                + "PSU_ID, TEAM) VALUES (?,?,?,?)";
        try {
            pStmt = dbConnection.prepareStatement(insertQuery);
            pStmt.setString(1, student.getLastName());
            pStmt.setString(2, student.getFirstName());
            pStmt.setString(3, student.getPsuId());
            pStmt.setInt(4, student.getTeam());
            pStmt.executeUpdate();
        } catch (SQLException e) {
            System.err.println(e.getMessage());
        }
    }

    public void deleteStudent(String userId) {
        String deleteQuery = "DELETE FROM STUDENT WHERE PSU_ID = ?";
        try {
            pStmt = dbConnection.prepareStatement(deleteQuery);
            pStmt.setString(1, userId);
            pStmt.executeUpdate();
        } catch (SQLException e) {
            System.err.println(e.getMessage());
            System.err.println("failed here");
        }
    }

    public void updateStudent(Student student) {
        String updateQuery = "UPDATE STUDENT SET LAST_NAME = ?, "
                + "FIRST_NAME = ?, TEAM = ? WHERE PSU_ID = ?";
        try {
            pStmt = dbConnection.prepareStatement(updateQuery);
            pStmt.setString(1, student.getLastName());
            pStmt.setString(2, student.getFirstName());
            pStmt.setInt(3, student.getTeam());
            pStmt.setString(4, student.getPsuId());
            pStmt.executeUpdate();

        } catch (SQLException e) {
            System.err.println(e.getMessage());
            
        }
    }

    public List<Student> getAllStudents() {
        List<Student> students = new ArrayList<Student>();

        String query = "SELECT * FROM STUDENT ORDER BY PSU_ID";
        try {
            Statement stmt = dbConnection.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            while (rs.next()) {
                Student student = new Student();

                student.setLastName(rs.getString("LAST_NAME"));
                student.setFirstName(rs.getString("FIRST_NAME"));
                student.setPsuId(rs.getString("PSU_ID"));
                student.setTeam(rs.getInt("TEAM"));
                students.add(student);
            }
        } catch (SQLException e) {
            System.err.println(e.getMessage());
        }
        return students;
    }
    
    public List<Student> getStudents(int sindex, int size, String sorting) {
        List<Student> students = new ArrayList<Student>();
        if (sorting==null) sorting = "LAST_NAME ASC";
        //String query = "SELECT * FROM STUDENT ORDER BY "+ sorting;
        String query = "SELECT * FROM ("+ 
            "SELECT ROW_NUMBER() OVER() AS rownum, STUDENT.* "+ 
            "FROM STUDENT ORDER BY "+ sorting+
            ") AS tmp "+ 
            "WHERE rownum >"+ sindex+" AND rownum <= "+(sindex+size); 
            //System.out.println(query);
        try {
            Statement stmt = dbConnection.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            while (rs.next()) {
                Student student = new Student();

                student.setLastName(rs.getString("LAST_NAME"));
                student.setFirstName(rs.getString("FIRST_NAME"));
                student.setPsuId(rs.getString("PSU_ID"));
                student.setTeam(rs.getInt("TEAM"));
                students.add(student);
            }
        } catch (SQLException e) {
            System.err.println(e.getMessage());
        }
        return students;
    }    
    public int getTotalRecordCount() {
        int rowCount=0;
        // get the number of rows from the result set
        String query = "SELECT COUNT(*) FROM STUDENT";
        try {
            Statement stmt = dbConnection.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            rs.next();
            rowCount = rs.getInt(1);
        } catch (SQLException e) {
            System.err.println(e.getMessage());
        }
        return rowCount;
    }    
}
