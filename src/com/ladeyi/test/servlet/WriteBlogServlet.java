package com.ladeyi.test.servlet;

import com.ladeyi.test.mapper.Query;
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
为用户新建一条博客，需要输入新建博客的用户的用户名，博客的内容和博客的标题
返回1则新建成功，返回新建失败
*/
public class WriteBlogServlet extends HttpServlet {
    public WriteBlogServlet() {
        super();
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doPost(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        int ret = 0;
        response.setCharacterEncoding("utf-8");
        response.setContentType("application/json");
        PrintWriter printWriter = response.getWriter();
        String userName = request.getParameter("userName");
        String blog = request.getParameter("blog");
        String title = request.getParameter("title");
        try {
            ResultSet userIdSet = User.checkId(userName);
            ;
            userIdSet.next();
            int userId=userIdSet.getInt(1);
            ret = Blog.insertBlog(userId, blog, title);
        } catch (SQLException e) {
        }
        String output = "{\"ret\":\"" + ret + "\"}";
        printWriter.write(output);
    }

    public void init() throws ServletException {
        // Put your code here
    }
}
