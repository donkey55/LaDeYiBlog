package com.ladeyi.test.servlet;

import com.ladeyi.test.service.Blog;
import com.ladeyi.test.service.Comment;
import com.ladeyi.test.service.Preference;
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
返回所有博客，信息包括标题，摘要，id
*/
public class ShowAllBlogServlet extends HttpServlet {
    public ShowAllBlogServlet() {
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
        try {
            ResultSet allBlogSet = Blog.getAllBlog();
            while (allBlogSet.next()) {
                ret = ret + "{\"blogId\":\"" + allBlogSet.getString(1) + "\",";
                ret = ret + "\"title\":\"" + allBlogSet.getString(3) + "\",";
                ret = ret + "\"summary\":\"" + allBlogSet.getString(4) + "\",";
                ret = ret + "\"preferenceCount\":\"" + Preference.checkPreferenceCount(allBlogSet.getInt(1)) + "\",";
                ret = ret + "\"commentCount\":\"" + Comment.checkCommentCount(allBlogSet.getInt(1)) + "\",";
                ret = ret + "\"time\":\"" + allBlogSet.getString(5) + "\",";
                ResultSet userNameSet = User.checkUserName(allBlogSet.getString(2));
                userNameSet.next();
                ret = ret + "\"userName\":\"" + userNameSet.getString(1) + "\"},";
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

