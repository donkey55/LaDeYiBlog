package com.ladeyi.test.servlet;


import com.ladeyi.test.mapper.Query;
import com.ladeyi.test.service.Blog;
import com.ladeyi.test.service.User;
import com.mysql.cj.xdevapi.JsonArray;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/*
在登录进入主界面之后，在主界面上加载该用户发表的所有博客，需要输入该用户的用户名，
返回该用户发表的所有博客的id以及博客标题
*/
public class ShowMyBlogInfoServlet extends HttpServlet {
    public ShowMyBlogInfoServlet() {
        super();
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doPost(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String ret = "[";
        response.setCharacterEncoding("utf-8");
        response.setContentType("application/json");
        PrintWriter printWriter = response.getWriter();
        String userName = request.getParameter("userName");
        try {
            ResultSet userIdSet = User.checkId(userName);
            userIdSet.next();
            int userId=userIdSet.getInt(1);
            ResultSet blogIdSet = Blog.checkBlogId(userId);
            while (blogIdSet.next()) {
                ResultSet blogTitle = Blog.checkTitle(Integer.parseInt(blogIdSet.getString(1)));
                ret = ret + "{\"blogId\":\"" + blogIdSet.getString(1) + "\",";
                while (blogTitle.next()) {
                    ret = ret + "\"title\":\"" + blogTitle.getString(1) + "\"},";
                }
            }
        } catch (SQLException e) {
        }
        if (ret.charAt(ret.length() - 1) == ',') {
            ret = ret.substring(0, ret.length() - 1);
        }
        ret = ret + "]";
        printWriter.write(ret);
    }

    public void init() throws ServletException {
        // Put your code here
    }
}
