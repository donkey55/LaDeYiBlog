package com.ladeyi.test.servlet;

import com.ladeyi.test.service.Blog;
import com.ladeyi.test.service.Comment;
import com.ladeyi.test.service.Reply;
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
展示一篇评论的所有回复，需要输入当前评论的id，
返回该评论下所有的回复的id、回复者的用户名以及回复的内容
*/
public class ShowCommentReplyServlet extends HttpServlet {
    public ShowCommentReplyServlet() {
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
        int commentId = Integer.parseInt(request.getParameter("commentId"));
        ResultSet replySet = Reply.checkReplyUseCommentId(commentId);
        try {
            while (replySet.next()) {
                ResultSet userSet = User.checkUserName(replySet.getString(2));
                userSet.next();
                ret = ret + "{\"replyId\":\"" + replySet.getString(1) + "\",";
                ret = ret + "\"userName\":\"" + userSet.getString(1) + "\",";
                ret = ret + "\"reply\":\"" + replySet.getString(4) + "\",";
                ret = ret + "\"time\":\"" + replySet.getString(5) + "\"},";
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
