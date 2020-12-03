package com.ladeyi.test.servlet;

import com.ladeyi.test.service.Attention;
import com.ladeyi.test.service.User;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class DeleteAttentionServlet extends HttpServlet {
    public DeleteAttentionServlet() {
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
        String fromUserName = request.getParameter("fromUserName");
        String toUserName = request.getParameter("toUserName");
        try {
            ResultSet fromUserIdSet = User.checkId(fromUserName);
            fromUserIdSet.next();
            int fromUserId = Integer.parseInt(fromUserIdSet.getString(1));
            ResultSet toUserIdSet = User.checkId(toUserName);
            toUserIdSet.next();
            int toUserId = Integer.parseInt(toUserIdSet.getString(1));
            ret = Attention.deleteAttention(fromUserId, toUserId);
        } catch (SQLException e) {
        }
        String output = "{\"ret\":\"" + ret + "\"}";
        printWriter.write(output);
    }

    public void init() throws ServletException {
        // Put your code here
    }
}
