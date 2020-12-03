package com.ladeyi.test.servlet;


import com.ladeyi.test.service.User;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/*
修改用户的个人信息，需要输入用户名，attribute，修改后的内容，
通过设定输入的attribute值来指定修改某一类个人信息，
attribute可为phone,address,sex,interest,userName,
返回1表示修改成功，返回0表示修改失败
*/
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
