package edu.psu.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import edu.psu.dao.CrudDao;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import edu.psu.model.Student;

public class Controller extends HttpServlet {

    private static final long serialVersionUID = 1L;
    private CrudDao dao;

    public Controller() {
        dao = new CrudDao();
    }

    protected void doGet(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }

    protected void doPost(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        List<Student> studentList = new ArrayList<Student>();
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        response.setContentType("application/json");
        

        if (action != null) {
            if (action.equals("list")) {
                try {
                    int sindex = Integer.parseInt(request.getParameter("jtStartIndex"));
                    int size = Integer.parseInt(request.getParameter("jtPageSize"));
                    String orderby = request.getParameter("jtSorting");
                    System.out.println("$: "+sindex+" #: "+size+" O: "+orderby);
                    // Fetch Data from Student Table
                    //studentList = dao.getAllStudents();
                    studentList = dao.getStudents(sindex, size, orderby);
                    // Convert Java Object to Json
                    String jsonArray = gson.toJson(studentList);
                    int TotalRecordCount = dao.getTotalRecordCount();
                    // Return Json in the format required by jTable plugin
                    jsonArray = "{\"Result\":\"OK\",\"Records\":" + jsonArray + 
                            ",\"TotalRecordCount\":"+TotalRecordCount+"}";
                    //jsonArray = "{\"Result\":\"OK\",\"Records\":" + jsonArray + "}";
                    response.getWriter().print(jsonArray);
                } catch (Exception e) {
                    String error = "{\"Result\":\"ERROR\",\"Message\":" + e.getMessage() + "}";
                    response.getWriter().print(error);
                    System.err.println(e.getMessage());
                }
            } else if (action.equals("create") || action.equals("update")) {
                Student student = new Student();
                if (request.getParameter("TEAM") != null) {
                    int team = Integer.parseInt(request.getParameter("TEAM"));
                    student.setTeam(team);
                }

                if (request.getParameter("LAST_NAME") != null) {
                    String lastName = request.getParameter("LAST_NAME");
                    student.setLastName(lastName);
                }

                if (request.getParameter("FIRST_NAME") != null) {
                    String firstName = request.getParameter("FIRST_NAME");
                    student.setFirstName(firstName);
                }

                if (request.getParameter("PSU_ID") != null) {
                    String psuID = request.getParameter("PSU_ID");
                    student.setPsuId(psuID);
                }

                try {
                    if (action.equals("create")) {
                        // Create new record
                        dao.addStudent(student);
                        // Convert Java Object to Json
                        String json = gson.toJson(student);
                        // Return Json in the format required by jTable plugin
                        String jsonData = "{\"Result\":\"OK\",\"Record\":" + json + "}";
                        response.getWriter().print(jsonData);
                    } else if (action.equals("update")) {
                        // Update existing record
                        dao.updateStudent(student);
                        // Convert Java Object to Json
                        String json = gson.toJson(student);
                        String jsonData = "{\"Result\":\"OK\",\"Record\":" + json + "}";
                        response.getWriter().print(jsonData);
                    }
                } catch (Exception e) {
                    String error = "{\"Result\":\"ERROR\",\"Message\":" + e.getMessage() + "}";
                    response.getWriter().print(error);
                }

            } else if (action.equals("delete")) {
                try {
                    // Delete record
                    if (request.getParameter("PSU_ID") != null) {
                        String studentId = request.getParameter("PSU_ID");
                        dao.deleteStudent(studentId);
                        String jsonData = "{\"Result\":\"OK\"}";
                        response.getWriter().print(jsonData);
                    }
                } catch (Exception e) {
                    String error = "{\"Result\":\"ERROR\",\"Message\":" + e.getMessage() + "}";
                    response.getWriter().print(error);
                }
            }
        }
    }
}
