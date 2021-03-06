package com.ladeyi.test.servlet;


import com.ladeyi.test.service.Message;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/*
删除一条用户发送的消息，需要输入需要被删除的信息的id
返回1代表删除成功，返回0代表删除失败
*/
public class DeleteMessageServlet extends HttpServlet {
    public DeleteMessageServlet() {
        super();
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doPost(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setCharacterEncoding("utf-8");
        response.setContentType("application/json");
        PrintWriter printWriter = response.getWriter();
        int messageId = Integer.parseInt(request.getParameter("messageId"));
        int ret = Message.deleteMessage(messageId);
        String output = "{\"ret\":\"" + ret + "\"}";
        printWriter.write(output);
    }

    public void init() throws ServletException {
        // Put your code here
    }
}
