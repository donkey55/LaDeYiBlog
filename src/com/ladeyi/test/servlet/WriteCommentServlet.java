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
        int ret=0;
        response.setCharacterEncoding("utf-8");
        response.setContentType("application/json");
        PrintWriter printWriter=response.getWriter();
        String userName=request.getParameter("userName");
        int blogId= Integer.parseInt(request.getParameter("blogId"));
        String comment=request.getParameter("comment");
        try{
            ResultSet userIdSet = User.checkId(userName);
            userIdSet.next();
            int userId=Integer.parseInt(userIdSet.getString(1));
            ret= Comment.insertComment(userId,blogId,comment);
        }catch(SQLException e){
        }
        String output="{\"ret\":\""+ret+"\"}";
        printWriter.write(output);
    }

    public void init() throws ServletException {
        // Put your code here
    }
}