package com.ladeyi.test;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Optional;

public class LoginServlet extends HttpServlet {

    public LoginServlet() {
        super();
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doPost(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setCharacterEncoding("utf-8");
        response.setContentType("application/json");
        PrintWriter printWriter=response.getWriter();
        String userName=request.getParameter("userName");
        String password=request.getParameter("password");
        int ret = 0;
        String output="{\"ret\":\""+ret+"\"}";
        printWriter.write(output);
    }

    public void init() throws ServletException {
        // Put your code here
    }

}