package com.ladeyi.test;


import java.sql.ResultSet;
import java.sql.SQLException;

/*
返回1：处理成功；
返回0：处理失败；
返回-8：博客长度不合法；
返回-100：数据库处理错误；
*/
public class Blog {
    private static Query query = new Query(MyConnection.getConnection());
    private static Update update = new Update(MyConnection.getConnection());

    public static int createBlog(int userId, String blog) {
        if (validBlog(blog)) {
            return update.blogInsert(userId,blog);
        } else {
            return -8;
        }
    }

    public static int checkBlog(int id){
        try{
            String restrict="blogId="+id;
            ResultSet resultSet = query.select("blog","blog",restrict);
            if (resultSet.next()) {
                System.out.println(resultSet.getString(1));
                return 1;
            } else {
                return 0;
            }
        }catch(SQLException e){
            return -100;
        }
    }

    private static boolean validBlog(String blog) {
        if (blog.length() <= 10000) {
            return true;
        }
        return false;
    }
}
