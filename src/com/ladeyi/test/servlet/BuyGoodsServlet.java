package com.ladeyi.test.servlet;

import com.ladeyi.test.mapper.Query;
import com.ladeyi.test.service.Comment;
import com.ladeyi.test.service.Goods;
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
用户购买一件物品，并将该购买的行为插入bill表中。需要输入该用户的id，购买的物品的id以及购买物品的数量，
返回1时表示购买成功，返回0时表示购买失败
数据库中采用事务实现，具体的存储过程代码在goods文件中
*/
public class BuyGoodsServlet extends HttpServlet {
    public BuyGoodsServlet() {
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
        int goodsId = Integer.parseInt(request.getParameter("goodsId"));
        int userId = Integer.parseInt(request.getParameter("userId"));
        int amount = Integer.parseInt(request.getParameter("amount"));
        ret= Goods.buyGoods(goodsId,userId,amount);
        String output = "{\"ret\":\"" + ret + "\"}";
        printWriter.write(output);
    }

    public void init() throws ServletException {
        // Put your code here
    }
}
