package com.ladeyi.test.servlet;

import com.ladeyi.test.mapper.Query;
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
用户为一个博客撰写一条评论，需要输入撰写评论的用户的用户名、被插入评论的博客id以及评论的具体内容，
返回1则添加成功，返回0添加失败
*/
public class WriteCommentServlet extends HttpServlet {
    public WriteCommentServlet() {
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
        int blogId = Integer.parseInt(request.getParameter("blogId"));
        String comment = request.getParameter("comment");
        try {
            ResultSet userIdSet = User.checkId(userName);
            userIdSet.next();
            int userId=userIdSet.getInt(1);
            ret = Comment.insertComment(userId, blogId, comment);
        } catch (SQLException e) {
        }
        String output = "{\"ret\":\"" + ret + "\"}";
        printWriter.write(output);
    }

    public void init() throws ServletException {
        // Put your code here
    }
}
