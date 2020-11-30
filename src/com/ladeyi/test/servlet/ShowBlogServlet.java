package com.ladeyi.test.servlet;

import com.ladeyi.test.service.Blog;
import com.ladeyi.test.service.User;

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
        String ret = "";
        response.setCharacterEncoding("utf-8");
        response.setContentType("application/json");
        PrintWriter printWriter = response.getWriter();
        int blogId = Integer.parseInt(request.getParameter("blogId"));
        try {
            ResultSet blogSet = Blog.checkBlog(blogId);
            ResultSet userIdSet = Blog.checkUserId(blogId);
            userIdSet.next();
            ResultSet userNameSet = User.checkUserName(userIdSet.getString(1));
            ResultSet titleSet = Blog.checkTitle(blogId);
            blogSet.next();
            userNameSet.next();
            titleSet.next();
            ret = ret + "{\"userName\":\"" + userNameSet.getString(1) + "\",";
            ret = ret + "\"blog\":\"" + blogSet.getString(1) + "\",";
            ret = ret + "\"title\":\"" + titleSet.getString(1) + "\"}";
        } catch (SQLException e) {
        }
        printWriter.write(ret);
    }

    public void init() throws ServletException {
        // Put your code here
    }
}
