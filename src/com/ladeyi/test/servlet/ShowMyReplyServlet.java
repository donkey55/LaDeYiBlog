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
显示一个用户发表的所有回复，需要输入该用户的用户名，
返回该用户发表的所有回复的id、发表的回复所属的博客id、发表的回复所属的评论的内容以及回复的具体内容
*/
public class ShowMyReplyServlet extends HttpServlet {
    public ShowMyReplyServlet() {
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
            ResultSet replySet = Reply.checkReplyUseUserId(userId);
            while (replySet.next()) {
                ResultSet commentSet = Comment.checkComment(Integer.parseInt(replySet.getString(3)));
                commentSet.next();
                ret = ret + "{\"replyId\":\"" + replySet.getString(1) + "\",";
                ret = ret + "\"comment\":\"" + commentSet.getString(4) + "\",";
                ret = ret + "\"blogId\":\"" + commentSet.getString(3) + "\",";
                ret = ret + "\"reply\":\"" + replySet.getString(4) + "\"},";
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
