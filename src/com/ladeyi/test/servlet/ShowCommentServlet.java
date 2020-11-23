package com.ladeyi.test.servlet;

import com.ladeyi.test.service.Blog;
import com.ladeyi.test.service.Comment;
import com.ladeyi.test.service.User;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ShowCommentServlet extends HttpServlet {
    public ShowCommentServlet() {
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
        int blogId = Integer.parseInt(request.getParameter("blogId"));
        ResultSet commentSet = Comment.checkCommentUseBlogId(blogId);
        try {
            while (commentSet.next()) {
                ResultSet userSet = User.checkUserName(commentSet.getString(2));
                userSet.next();
                ret = ret + "{\"commendId\":\"" + commentSet.getString(1) + "\",";
                ret = ret + "\"userName\":\"" + userSet.getString(1) + "\",";
                ret = ret + "\"comment\":\"" + commentSet.getString(4) + "\"},";
            }
        } catch (SQLException e) {
        }
        ret = ret.substring(0, ret.length() - 1);
        ret = ret + "]";
        printWriter.write(ret);
    }

    public void init() throws ServletException {
        // Put your code here
    }
}
