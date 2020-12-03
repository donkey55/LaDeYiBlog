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

/*
根据关键字返回 标题 和 内容 中带有关键字的博客，需要输入搜索的关键字，
返回所有符合要求的博客的博客id、写这篇博客的用户名、博客的内容以及博客的标题
*/
public class SearchBlogServlet extends HttpServlet {
    public SearchBlogServlet() {
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
        String keyword = request.getParameter("keyword");
        try {
            ResultSet blogSet = Blog.searchBlog(keyword);
            while (blogSet.next()) {
                ResultSet userSet = User.checkUserName(blogSet.getString(2));
                userSet.next();
                ret = ret + "{\"blogId\":\"" + blogSet.getString(1) + "\",";
                ret = ret + "\"userName\":\"" + userSet.getString(1) + "\",";
                ret = ret + "\"blog\":\"" + blogSet.getString(3) + "\",";
                ret = ret + "\"title\":\"" + blogSet.getString(4) + "\"},";
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
