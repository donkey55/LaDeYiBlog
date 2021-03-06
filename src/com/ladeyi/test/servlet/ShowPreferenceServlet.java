package com.ladeyi.test.servlet;

import com.ladeyi.test.service.Blog;
import com.ladeyi.test.service.Comment;
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
显示一个用户收藏的所有的博客，需要输入当前用户的姓名
返回用户收藏的所有博客的标题，博客的id以及该收藏所设置的标签
*/
public class ShowPreferenceServlet extends HttpServlet {
    public ShowPreferenceServlet() {
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
        try {
            ResultSet userIdSet = User.checkId(userName);
            userIdSet.next();
            int userId=userIdSet.getInt(1);
            ResultSet PreferenceSet = Preference.checkPreference(userId);
            while (PreferenceSet.next()) {
                ResultSet blogSet = Blog.checkTitle(Integer.parseInt(PreferenceSet.getString(2)));
                blogSet.next();
                ret = ret + "{\"title\":\"" + blogSet.getString(1) + "\",";
                ret = ret + "\"blogId\":\"" + PreferenceSet.getString(2) + "\",";
                ret = ret + "\"label\":\"" + PreferenceSet.getString(3) + "\"},";
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
