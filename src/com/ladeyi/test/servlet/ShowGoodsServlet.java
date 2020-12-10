package com.ladeyi.test.servlet;


import com.ladeyi.test.mapper.Query;
import com.ladeyi.test.service.Blog;
import com.ladeyi.test.service.Goods;
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
在用户进入商店之后加载商店所有的商品，需要输入进入的商店的id，
返回所有商品的商品id、商品名、商品介绍、商品数量、商品价格
*/
public class ShowGoodsServlet extends HttpServlet {
    public ShowGoodsServlet() {
        super();
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doPost(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String ret = "";
        response.setCharacterEncoding("utf-8");
        response.setContentType("application/json");
        PrintWriter printWriter = response.getWriter();
        int goodsId = Integer.parseInt(request.getParameter("goodsId"));
        try {
            ResultSet resultSet = Goods.checkGoodsUseGoodsId(goodsId);
            while (resultSet.next()) {
                ret = ret + "{\"goodsId\":\"" + resultSet.getString(1) + "\",";
                ret = ret + "\"goodsName\":\"" + resultSet.getString(2) + "\",";
                ret = ret + "\"goodsIntroduction\":\"" + resultSet.getString(3) + "\",";
                ret = ret + "\"shopId\":\"" + resultSet.getString(4) + "\",";
                ret = ret + "\"goodsAmount\":\"" + resultSet.getString(5) + "\",";
                ret = ret + "\"goodsPrice\":\"" + resultSet.getString(6) + "\"},";
            }
        } catch (SQLException e) {
        }
        printWriter.write(ret);
    }

    public void init() throws ServletException {
        // Put your code here
    }
}
