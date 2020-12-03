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
显示一个用户发表的所有的评论，需要输入该用户的用户名，
返回该用户发表的所有评论的id、发表的评论所述的博客标题以及评论的具体内容
*/
public class ShowMyCommentServlet extends HttpServlet {
    public ShowMyCommentServlet() {
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
            ResultSet commentSet = Comment.checkCommentUseUserId(userId);
            while (commentSet.next()) {
                ResultSet blogSet = Blog.checkTitle(Integer.parseInt(commentSet.getString(3)));
                blogSet.next();
                ret = ret + "{\"commendId\":\"" + commentSet.getString(1) + "\",";
                ret = ret + "\"title\":\"" + blogSet.getString(1) + "\",";
                ret = ret + "\"comment\":\"" + commentSet.getString(4) + "\"},";
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
