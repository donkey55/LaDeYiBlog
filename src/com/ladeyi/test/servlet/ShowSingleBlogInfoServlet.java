package com.ladeyi.test.servlet;


import com.ladeyi.test.mapper.Query;
import com.ladeyi.test.service.Blog;
import com.ladeyi.test.service.Comment;
import com.ladeyi.test.service.Preference;
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

public class ShowSingleBlogInfoServlet extends HttpServlet {
    public ShowSingleBlogInfoServlet() {
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
        String userName = request.getParameter("userName");
        int blogId = Integer.parseInt(request.getParameter("blogId"));
        try {
            ResultSet userIdSet = User.checkId(userName);
            userIdSet.next();
            int userId = userIdSet.getInt(1);
            ret = ret + "{\"concerned\":\"" + Preference.checkSingleBlogPreference(userId, blogId) + "\",";
            ret = ret + "\"preferenceCount\":\"" + Preference.checkPreferenceCount(blogId) + "\",";
            ret = ret + "\"commentCount\":\"" + Comment.checkCommentCount(blogId) + "\"}";
        } catch (SQLException e) {
        }
        printWriter.write(ret);
    }

    public void init() throws ServletException {
        // Put your code here
    }
}
