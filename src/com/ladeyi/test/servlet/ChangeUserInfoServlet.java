package com.ladeyi.test.servlet;


import com.ladeyi.test.service.User;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class ChangeUserInfoServlet extends HttpServlet {
    public ChangeUserInfoServlet() {
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
        String attribute = request.getParameter("attribute");
        String content = request.getParameter("content");
        if (attribute.equals("selfIntroduction")) {
            ret = User.changeSelfIntroduction(userName, content);
        } else if (attribute.equals("phone")) {
            ret = User.changePhone(userName, content);
        } else if (attribute.equals("address")) {
            ret = User.changeAddress(userName, content);
        } else if (attribute.equals("sex")) {
            ret = User.changeSex(userName, content);
        } else if (attribute.equals("interest")) {
            ret = User.changeInterest(userName, content);
        } else if (attribute.equals("userName")) {
            ret = User.changeUserName(userName, content);
        }
        printWriter.write(ret);
    }

    public void init() throws ServletException {
        // Put your code here
    }
}
