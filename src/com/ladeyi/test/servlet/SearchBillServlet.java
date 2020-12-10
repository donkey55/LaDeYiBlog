package com.ladeyi.test.servlet;

import com.ladeyi.test.service.Bill;
import com.ladeyi.test.service.Blog;
import com.ladeyi.test.service.Comment;
import com.ladeyi.test.service.Goods;
import com.ladeyi.test.service.Reply;
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
显示一个用户的所有账单，需要输入该用户的用户名，
返回该用户的所有账单所购买的商品id,商品的名称，购买的商品数量，以及账单号
*/
public class SearchBillServlet extends HttpServlet {
    public SearchBillServlet() {
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
        String userName = request.getParameter("userName");
        String keyword = request.getParameter("keyword");
        try {
            ResultSet userIdSet = User.checkId(userName);
            userIdSet.next();
            int userId = userIdSet.getInt(1);
            ResultSet billSet = Bill.searchBill(userId,keyword);
            while (billSet.next()) {
                ret = ret + "{\"goodsId\":\"" + billSet.getString(1) + "\",";
                ret = ret + "\"goodsName\":\"" + billSet.getString(4) + "\",";
                ret = ret + "\"amount\":\"" + billSet.getString(2) + "\",";
                ret = ret + "\"billId\":\"" + billSet.getString(3) + "\"},";
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
