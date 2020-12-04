package com.ladeyi.test.servlet;

import com.ladeyi.test.service.Reply;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/*
删除一条评论下的回复，需要输入需要被删除的回复的id
返回1代表删除成功，返回0代表删除失败
*/
public class DeleteReplyServlet extends HttpServlet {
    public DeleteReplyServlet() {
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
        int replyId = Integer.parseInt(request.getParameter("replyId"));
        int ret = Reply.deleteReply(replyId);
        String output = "{\"ret\":\"" + ret + "\"}";
        printWriter.write(output);
    }

    public void init() throws ServletException {
        // Put your code here
    }
}
