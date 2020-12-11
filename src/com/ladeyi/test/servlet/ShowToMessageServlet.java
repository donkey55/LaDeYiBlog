package com.ladeyi.test.servlet;

import com.ladeyi.test.service.Blog;
import com.ladeyi.test.service.Comment;
import com.ladeyi.test.service.Message;
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
显示一个用户接受到的所有的信息，即收件箱，需要输入该用户的用户名
返回接收到的所有信息的id、发送信息的用户名以及信息的具体内容
*/
public class ShowToMessageServlet extends HttpServlet {
    public ShowToMessageServlet() {
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
        String toUserName = request.getParameter("toUserName");
        try {
            ResultSet toUserIdSet = User.checkId(toUserName);
            toUserIdSet.next();
            int toUserId=toUserIdSet.getInt(1);
            ResultSet messageSet = Message.checkMessageUseToUserId(toUserId);
            while (messageSet.next()) {
                ResultSet userSet = User.checkUserName(messageSet.getString(2));
                userSet.next();
                ret = ret + "{\"messageId\":\"" + messageSet.getString(1) + "\",";
                ret = ret + "\"userName\":\"" + userSet.getString(1) + "\",";
                ret = ret + "\"message\":\"" + messageSet.getString(4) + "\",";
                ret = ret + "\"messageType\":\"" + messageSet.getString(5) + "\",";
                ret = ret + "\"time\":\"" + messageSet.getString(6) + "\"},";
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
