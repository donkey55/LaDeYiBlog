package com.ladeyi.test.servlet;

import com.ladeyi.test.service.Blog;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ShowBlogServlet extends HttpServlet {
    public ShowBlogServlet() {
        super();
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doPost(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String ret="";
        response.setCharacterEncoding("utf-8");
        response.setContentType("application/json");
        PrintWriter printWriter=response.getWriter();
        int blogId=Integer.parseInt(request.getParameter("blogId"));
        ResultSet blogSet= Blog.checkBlog(blogId);
        try {
            blogSet.next();
            ret=blogSet.getString(1);
        }catch (SQLException e){
        }
        String output="{\"ret\":\""+ret+"\"}";
        printWriter.write(output);
    }

    public void init() throws ServletException {
        // Put your code here
    }
}
