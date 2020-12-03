package com.ladeyi.test.servlet;


import com.ladeyi.test.service.Preference;
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
删除一个用户收藏的博客，需要输入当前执行删除操作的用户名和收藏的博客的id
返回1代表删除成功，返回0代表删除失败
*/
public class DeletePreferenceServlet extends HttpServlet {
    public DeletePreferenceServlet() {
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
        int blogId = Integer.parseInt(request.getParameter("blogId"));
        try {
            ResultSet userIdSet = User.checkId(userName);
            userIdSet.next();
            int userId=userIdSet.getInt(1);
            ret = Preference.deletePreference(userId, blogId);
        } catch (SQLException e) {
        }
        String output = "{\"ret\":\"" + ret + "\"}";
        printWriter.write(output);
    }

    public void init() throws ServletException {
        // Put your code here
    }
}
