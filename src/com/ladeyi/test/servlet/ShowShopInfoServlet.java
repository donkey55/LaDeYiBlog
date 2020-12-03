package com.ladeyi.test.servlet;


import com.ladeyi.test.mapper.Query;
import com.ladeyi.test.service.Blog;
import com.ladeyi.test.service.Shop;
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

/*
在用户打开商店界面的时候显示所有商店的信息，不需要任何输入，
返回所有商店的商店id，商店名字，商店介绍以及商店星级
*/
public class ShowShopInfoServlet extends HttpServlet {
    public ShowShopInfoServlet() {
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
        try {
            ResultSet resultSet = Shop.checkShopAttribute();
            while (resultSet.next()) {
                ret = ret + "{\"shopId\":\"" + resultSet.getString(1) + "\",";
                ret = ret + "\"shopName\":\"" + resultSet.getString(2) + "\",";
                ret = ret + "\"shopIntroduction\":\"" + resultSet.getString(3) + "\",";
                ret = ret + "\"shopStar\":\"" + resultSet.getString(4) + "\"},";
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
