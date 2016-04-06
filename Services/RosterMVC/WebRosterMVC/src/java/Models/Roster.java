package Models;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.beans.XMLEncoder; // simple and effective
import javax.servlet.ServletContext;

public class Roster {
    private int n = 32;
    private Student[] students;
    private ServletContext sctx;

    public Roster() { }

    // The ServletContext is required to read the data from
    // a text file packaged inside the WAR file
    public void setServletContext(ServletContext sctx) {
      this.sctx = sctx;
    }
    public ServletContext getServletContext() { return this.sctx; }
    
    public String getStudents() {
      // Has the ServletContext been set?
      if (getServletContext() == null) 
          return null;      

      // Have the data been read already?
      if (students == null) 
          populate(); 

      // Convert the Predictions array into an XML document
      return toXML();
    }

    //** utilities
    private void populate() {
      String filename = "Roster.txt";
      InputStream in = sctx.getResourceAsStream(filename);

      if (in != null) {
          try {
            InputStreamReader isr = new InputStreamReader(in);
            BufferedReader reader = new BufferedReader(isr);

            students = new Student[n];
            int i = 0;
                int j = 0;
            String record = null;
                Student s = null;
            while ((record = reader.readLine()) != null) {
                switch(j)
                    {
                        case 0:
                            s = new Student();
                            s.setLastName(record);
                            break;
                        case 1:
                            s.setFirstName(record);
                            break;
                        case 2:
                            s.setStudentID(record);
                            break;
                        case 3:
                            s.setTeam(Integer.parseInt(record));
                            students[i++] = s;
                            break;
                    }
                    if(j < 4)
                        j++;
                    else
                        j = 0;
                    }
                }
          catch (IOException e) { }
        }
    }

    private String toXML() {
      String xml = null;
      try {
          ByteArrayOutputStream out = new ByteArrayOutputStream();
          XMLEncoder encoder = new XMLEncoder(out);
          encoder.writeObject(students); // serialize to XML
          encoder.close();
          xml = out.toString(); // stringify
      }
      catch(Exception e) { }
        //System.out.println(xml.trim());
      return xml;
    }
}
