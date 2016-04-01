package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import java.io.*;
import java.util.*;

public final class Roster_jsp extends org.apache.jasper.runtime.HttpJspBase
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
      response.setContentType("text/html;charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;
      _jspx_resourceInjector = (org.glassfish.jsp.api.ResourceInjector) application.getAttribute("com.sun.appserv.jsp.resource.injector");

      out.write("\n");
      out.write("<!DOCTYPE html>\n");
      out.write("\n");
      out.write("<html>\n");
      out.write("    <head>\n");
      out.write("        <title>Predictions Web Services</title>\n");
      out.write("    <script src=\"http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js\"></script>\n");
      out.write("    <script type=\"text/javascript\">\n");
      out.write("            var content;\n");
      out.write("            \n");
      out.write("            /**\n");
      out.write("            * Sorts all of the elements using the sorting function and returns a\n");
      out.write("            * regular array of the sorted elements.\n");
      out.write("            * \n");
      out.write("            * @param {type} sortFunction the function to use to sort the elements.\n");
      out.write("            * @returns {Array} an array of the sorted elements. Not a jQuery object.\n");
      out.write("            */\n");
      out.write("           $.prototype.sortElements = function(sortFunction) {\n");
      out.write("               // Sort the array using the given function.\n");
      out.write("               return $.makeArray(this).sort(sortFunction);\n");
      out.write("           }\n");
      out.write("    \n");
      out.write("            window.onload = function(){\n");
      out.write("                //JSP compiler adds an empty line before the xml content.\n");
      out.write("                //we manually remove it.\n");
      out.write("\t        content = $.trim($('#rosterDiv').html());\n");
      out.write("                //now remove the div element that is no longer needed\n");
      out.write("                $('#rosterDiv').remove();\n");
      out.write("                // parse the xml\n");
      out.write("                content = $.parseXML(content);\n");
      out.write("\n");
      out.write("                DrawTable(0);\n");
      out.write("            };\n");
      out.write("        \n");
      out.write("        function DrawTable(sortIndex) {\n");
      out.write("            // Clear the table's current contents.\n");
      out.write("            $(\"#rosterTable\").html(\"\");\n");
      out.write("            \n");
      out.write("            // Add all of the table's headers.\n");
      out.write("            $(content).find('objects').slice(0, 1).each(function(index, element) {\n");
      out.write("                // Add a row to the table.\n");
      out.write("                var row = document.createElement('TR');\n");
      out.write("                $(\"#rosterTable\").append(row);\n");
      out.write("                \n");
      out.write("                console.log(\"hello\");\n");
      out.write("                \n");
      out.write("                // Iterate through each element in the object.\n");
      out.write("                $(element).find('string').each(function(index, element) {\n");
      out.write("                    // Add a header to the row.\n");
      out.write("                    var header = document.createElement('TH');\n");
      out.write("                    header.innerHTML = $(element).text();\n");
      out.write("                    row.appendChild(header);\n");
      out.write("                });\n");
      out.write("            });\n");
      out.write("            \n");
      out.write("            // Add all of the students to the table.\n");
      out.write("            $(content).find('object').slice(1)\n");
      out.write("              // Sort all of the objects.\n");
      out.write("              .sortElements(function(a, b) { \n");
      out.write("                  // Retrieve each of the elements' strings corresponding to\n");
      out.write("                  // the passed index.\n");
      out.write("                  var valueA = $($(a).find('string')[sortIndex]).text();\n");
      out.write("                  var valueB = $($(b).find('string')[sortIndex]).text();\n");
      out.write("                  \n");
      out.write("                  return valueA > valueB ? 1 : -1;\n");
      out.write("              })\n");
      out.write("              // now we can play with each <object>\n");
      out.write("              .forEach(function(element, index){\n");
      out.write("                // Add a row or header to the table.\n");
      out.write("                var row = document.createElement('TR');\n");
      out.write("                $(\"#rosterTable\").append(row);\n");
      out.write("\n");
      out.write("                // Iterate through each string in the student object..\n");
      out.write("                $(element)\n");
      out.write("                    .find('string')\n");
      out.write("                    .each(function(index, element) {\n");
      out.write("                        // Add a column to the table row.\n");
      out.write("                        var column = document.createElement('TD');\n");
      out.write("                        column.innerHTML = $(element).text();\n");
      out.write("                        row.appendChild(column);                 \n");
      out.write("                    });\n");
      out.write("            });\n");
      out.write("            \n");
      out.write("            // Add listeners for each of the headers.\n");
      out.write("            $('TH').each(function(index, element) {\n");
      out.write("               element.style.cursor = \"pointer\";\n");
      out.write("               element.onclick = function() {\n");
      out.write("                   // Sort the table by the clicked header.\n");
      out.write("                   DrawTable(index);\n");
      out.write("               };\n");
      out.write("            });\n");
      out.write("        }\n");
      out.write("            </script>\n");
      out.write("            <style>\n");
      out.write("                table {\n");
      out.write("                    border-collapse: collapse;\n");
      out.write("                    border: solid 2px black;\n");
      out.write("                    text-align: center;\n");
      out.write("                    margin-left: auto;\n");
      out.write("                    margin-right: auto;\n");
      out.write("                }\n");
      out.write("\n");
      out.write("                td {\n");
      out.write("                    border: solid 2px black\n");
      out.write("                }\n");
      out.write("\n");
      out.write("                th {\n");
      out.write("                    font-style: italic;\n");
      out.write("                    background-color: #FF5722;\n");
      out.write("                    color: white;\n");
      out.write("                }\n");
      out.write("            </style>\n");
      out.write("    </head>\n");
      out.write("    <body>\n");
      out.write("        <div id=\"rosterDiv\">\n");
      out.write("            ");
      roster.Roster roster = null;
      synchronized (_jspx_page_context) {
        roster = (roster.Roster) _jspx_page_context.getAttribute("roster", PageContext.PAGE_SCOPE);
        if (roster == null){
          roster = new roster.Roster();
          _jspx_page_context.setAttribute("roster", roster, PageContext.PAGE_SCOPE);
          out.write(" \n");
          out.write("            ");
        }
      }
      out.write("  \n");
      out.write("              ");
 
                 String verb = request.getMethod();

                 if (!verb.equalsIgnoreCase("GET")) {
                   response.sendError(response.SC_METHOD_NOT_ALLOWED,
                                      "GET requests only are allowed.");
                 }
                 // If it's a GET request, return the predictions.
                 else {
                   // Object reference application has the value 
                   // pageContext.getServletContext()
                   roster.loadData(application, "/WEB-INF/data/Roster.txt");
                   out.println(roster.getStudents());
                 }
              
      out.write("\n");
      out.write("        </div>\n");
      out.write("        <table id=\"rosterTable\">\n");
      out.write("        </table>\n");
      out.write("    </body>\n");
      out.write("</html>\n");
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
