package com.ladeyi.test.service;


import com.ladeyi.test.mapper.Query;
import com.ladeyi.test.mapper.Update;

import java.sql.ResultSet;
import java.sql.SQLException;

/*
返回1：处理成功；
返回0：处理失败；
返回-8：博客长度不合法；
返回-100：数据库处理错误；
*/
public class Blog {
    public static int insertBlog(int userId, String blog, String title, String summary, String label) {
        return Update.blogInsert(userId, blog, title, summary, label);
    }

    public static int updateBlog(int blogId, String blog, String title,String summary,String label) {
        return Update.blogUpdate(blogId, blog, title, summary, label);
    }

    public static ResultSet checkBlog(int id) {
        try {
            String restrict = "blogId=" + id;
            ResultSet resultSet = Query.select("blog", "blog", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static ResultSet checkTitle(int id) {
        try {
            String restrict = "blogId=" + id;
            ResultSet resultSet = Query.select("title", "blog", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static ResultSet checkSummary(int id) {
        try {
            String restrict = "blogId=" + id;
            ResultSet resultSet = Query.select("summary", "blog", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static ResultSet checkLabel(int id) {
        try {
            String restrict = "blogId=" + id;
            ResultSet resultSet = Query.select("label", "blog", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static ResultSet checkAll(int id) {
        try {
            String restrict = "blogId=" + id;
            ResultSet resultSet = Query.select("*", "blog", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static ResultSet checkUserId(int id) {
        try {
            String restrict = "blogId=" + id;
            ResultSet resultSet = Query.select("userId", "blog", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static ResultSet checkBlogId(int id) {
        try {
            String restrict = "userId=" + id;
            ResultSet resultSet = Query.select("blogId", "blog", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static int deleteBlog(int id) {
        String restrict = "blogId=" + id;
        return Update.delete("blog", restrict);
    }

    public static ResultSet searchBlog(String keyword) {
        try {
            return Query.blogSearchSelect(keyword);
        } catch (SQLException e) {
            return null;
        }
    }

    public static ResultSet getAllBlog() {
        try {
            return Query.select("blogId, title, summary, time", "blog", "");
        } catch (SQLException e) {
            return null;
        }
    }
}
