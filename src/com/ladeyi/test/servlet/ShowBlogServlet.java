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

/*
在点击一篇博客之后显示该博客内容，需要输入该博客的id，
返回写这篇博客的作者的用户名、博客的内容和博客的标题
*/
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
            ResultSet blogAllSet = Blog.checkAll(blogId);
            blogAllSet.next();
            ResultSet userNameSet = User.checkUserName(blogAllSet.getString(2));
            userNameSet.next();
            ret = ret + "{\"userName\":\"" + userNameSet.getString(1) + "\",";
            ret = ret + "\"blog\":\"" + blogAllSet.getString(3) + "\",";
            ret = ret + "\"title\":\"" + blogAllSet.getString(4) + "\",";
            ret = ret + "\"summary\":\"" + blogAllSet.getString(5) + "\",";
            ret = ret + "\"time\":\"" + blogAllSet.getString(6) + "\",";
            ret = ret + "\"label\":\"" + blogAllSet.getString(7) + "\"}";
        } catch (SQLException e) {
        }
        printWriter.write(ret);
    }

    public void init() throws ServletException {
        // Put your code here
    }
}
