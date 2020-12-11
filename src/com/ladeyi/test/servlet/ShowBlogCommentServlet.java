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

/*
展示一篇博客的所有评论，需要输入当前博客的id，
返回该博客下所有的评论的id、评论者的用户名以及评论的内容
*/
public class ShowBlogCommentServlet extends HttpServlet {
    public ShowBlogCommentServlet() {
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
                ret = ret + "{\"commentId\":\"" + commentSet.getString(1) + "\",";
                ret = ret + "\"userName\":\"" + userSet.getString(1) + "\",";
                ret = ret + "\"comment\":\"" + commentSet.getString(4) + "\",";
                ret = ret + "\"time\":\"" + commentSet.getString(5) + "\"},";
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
