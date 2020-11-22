package com.ladeyi.test.servlet;


import com.ladeyi.test.mapper.Query;
import com.ladeyi.test.service.Blog;
import com.ladeyi.test.service.User;
import com.mysql.cj.xdevapi.JsonArray;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class LoadUserInfoServlet extends HttpServlet {
    public LoadUserInfoServlet() {
        super();
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doPost(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String ret="";
        response.setCharacterEncoding("utf-8");
        response.setContentType("application/json");
        PrintWriter printWriter = response.getWriter();
        String userName=request.getParameter("userName");
        try {
            ResultSet resultSet = User.checkSex(userName);
            resultSet.next();
            ret=ret+"{\"sex\":\""+resultSet.getString(1)+"\",";
            resultSet = User.checkInterest(userName);
            resultSet.next();
            ret=ret+"\"interest\":\""+resultSet.getString(1)+"\",";
            resultSet = User.checkPhone(userName);
            resultSet.next();
            ret=ret+"\"phone\":\""+resultSet.getString(1)+"\",";
            resultSet = User.checkAddress(userName);
            resultSet.next();
            ret=ret+"\"address\":\""+resultSet.getString(1)+"\",";
            resultSet = User.checkSelfIntroduction(userName);
            resultSet.next();
            ret=ret+"\"selfIntroduction\":\""+resultSet.getString(1)+"\",";
            resultSet = User.checkPoint(userName);
            resultSet.next();
            ret=ret+"\"point\":\""+resultSet.getString(1)+"\"}";
        } catch (SQLException e) {
        }
        printWriter.write(ret);
    }

    public void init() throws ServletException {
        // Put your code here
    }
}
