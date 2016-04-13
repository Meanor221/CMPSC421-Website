package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class index_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;

    try {
      response.setContentType("text/html");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;
      _jspx_resourceInjector = (org.glassfish.jsp.api.ResourceInjector) application.getAttribute("com.sun.appserv.jsp.resource.injector");

      out.write("<!DOCTYPE html>\r\n");
      out.write("<head>\r\n");
      out.write("    <title>CRUD operations using jTable</title>\r\n");
      out.write("    <!-- Include one of jTable styles. -->\r\n");
      out.write("    <link href=\"css/lightcolor/blue/jtable.css\" rel=\"stylesheet\" type=\"text/css\" />\r\n");
      out.write("    <link href=\"css/jquery-ui.css\" rel=\"stylesheet\" type=\"text/css\" />\r\n");
      out.write("    <script src=\"js/jquery-2.1.3.js\" type=\"text/javascript\"></script>\r\n");
      out.write("    <script src=\"js/jquery-ui.js\" type=\"text/javascript\"></script>\r\n");
      out.write("    <!-- Include jTable script file. -->\r\n");
      out.write("    <script src=\"js/jquery.jtable.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\r\n");
      out.write("    <script type=\"text/javascript\">\r\n");
      out.write("        $(document).ready(function () {\r\n");
      out.write("            $('#StudentTableContainer').jtable({\r\n");
      out.write("                title: 'Students List',\r\n");
      out.write("                saveUserPreferences: false, //disable cookie saving\r\n");
      out.write("                paging: true, //Enable paging\r\n");
      out.write("                pageSize: 8, //Set page size (default: 10)\r\n");
      out.write("                sorting: true, //Enable sorting\r\n");
      out.write("                defaultSorting: 'name ASC', //Set default sorting\r\n");
      out.write("                actions: {\r\n");
      out.write("                    listAction: 'Controller?action=list',\r\n");
      out.write("                    createAction: 'Controller?action=create',\r\n");
      out.write("                    updateAction: 'Controller?action=update',\r\n");
      out.write("                    deleteAction: 'Controller?action=delete'\r\n");
      out.write("                },\r\n");
      out.write("                toolbar: {\r\n");
      out.write("                    items: [{\r\n");
      out.write("                        tooltip: 'Click here to export this table to excel',\r\n");
      out.write("                        icon: 'css/lightcolor/excel.png',\r\n");
      out.write("                        text: 'Export to Excel',\r\n");
      out.write("                        click: function () {\r\n");
      out.write("                            alert('This item is just a demonstration for new toolbar feature. You can add your custom toolbar items here. Then, for example, you can download excel file from server when user clicks this item. See toolbar in API reference documentation for usage.');\r\n");
      out.write("                        }\r\n");
      out.write("                    }]\r\n");
      out.write("                },\r\n");
      out.write("                fields: {\r\n");
      out.write("                    studentId: {\r\n");
      out.write("                        title: 'Student Id',\r\n");
      out.write("                        width: '20%',\r\n");
      out.write("                        key: true,\r\n");
      out.write("                        list: true,\r\n");
      out.write("                        edit: false,\r\n");
      out.write("                        create: true\r\n");
      out.write("                    },\r\n");
      out.write("                    name: {\r\n");
      out.write("                        title: 'Name',\r\n");
      out.write("                        width: '30%',\r\n");
      out.write("                        edit: true\r\n");
      out.write("                    },\r\n");
      out.write("                    department: {\r\n");
      out.write("                        title: 'Department',\r\n");
      out.write("                        width: '20%',\r\n");
      out.write("                        edit: true\r\n");
      out.write("                    },\r\n");
      out.write("                    emailId: {\r\n");
      out.write("                        title: 'Email',\r\n");
      out.write("                        width: '30%',\r\n");
      out.write("                        edit: true,\r\n");
      out.write("                        sorting: false //This column is not sortable!\r\n");
      out.write("                    }\r\n");
      out.write("                }\r\n");
      out.write("            });\r\n");
      out.write("            $('#StudentTableContainer').jtable('load');\r\n");
      out.write("        });\r\n");
      out.write("    </script>\r\n");
      out.write("\r\n");
      out.write("</head>\r\n");
      out.write("<body>\r\n");
      out.write("    <div style=\"width: 80%; margin-right: 10%; margin-left: 10%; text-align: center;\">\r\n");
      out.write("\r\n");
      out.write("        <h4>AJAX based CRUD operations using jQuery.jTable</h4>\r\n");
      out.write("        <div id=\"StudentTableContainer\"></div>\r\n");
      out.write("    </div>\r\n");
      out.write("</body>\r\n");
      out.write("</html>");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
