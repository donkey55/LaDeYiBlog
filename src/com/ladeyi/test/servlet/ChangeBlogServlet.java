package com.ladeyi.test.servlet;

import com.ladeyi.test.mapper.Query;
import com.ladeyi.test.service.Blog;
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
修改一篇博客的内容，需要输入博客的id、修改后博客的内容以及修改后博客的标题，
返回值大于0时修改成功，范围值为0时修改失败
*/
public class ChangeBlogServlet extends HttpServlet {
    public ChangeBlogServlet() {
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
        int blogId = Integer.parseInt(request.getParameter("blogId"));
        String blog = request.getParameter("blog");
        String title = request.getParameter("title");
        String summary = request.getParameter("summary");
        String label = request.getParameter("label");
        ret = Blog.updateBlog(blogId, blog, title, summary, label);
        String output = "{\"ret\":\"" + ret + "\"}";
        printWriter.write(output);
    }

    public void init() throws ServletException {
        // Put your code here
    }
}
