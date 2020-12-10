package com.ladeyi.test.mapper;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class Update {
    private static Connection connection = MyConnection.getConnection();

    public static int insert(String table, String... para) {
        int ret = 0;
        String sql = "INSERT INTO " + table + "(";
        for (int i = 0; i < para.length - 2; i = i + 2) {
            sql = sql + para[i] + ",";
        }
        sql = sql + para[para.length - 2] + ")" + " VALUES(";
        for (int i = 1; i < para.length - 1; i = i + 2) {
            sql = sql + para[i] + ",";
        }
        sql = sql + para[para.length - 1] + ");";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ret = preparedStatement.executeUpdate();
        } catch (SQLException e) {
            return -100;
        }
        return ret;
    }

    public static int delete(String table, String restrict) {
        int ret = 0;
        String sql = "DELETE FROM " + table;
        if (restrict.equals("")) {
            sql = sql + ";";
        } else {
            sql = sql + " WHERE " + restrict + ";";
        }
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ret = preparedStatement.executeUpdate();
        } catch (SQLException e) {
            return -100;
        }
        return ret;
    }

    public static int update(String table, String newData, String restrict) {
        int ret = 0;
        String sql = "UPDATE " + table + " SET " + newData;
        if (restrict.equals("")) {
            sql = sql + ";";
        } else {
            sql = sql + " WHERE " + restrict + ";";
        }
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ret = preparedStatement.executeUpdate();
        } catch (SQLException e) {
            return -100;
        }
        return ret;
    }

    public static int registerInsert(String userName, String password) {
        int ret = 0;
        String sql = "INSERT INTO user(userName,password) values (?,?)";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, userName);
            preparedStatement.setString(2, password);
            ret = preparedStatement.executeUpdate();
        } catch (SQLException e) {
            return -100;
        }
        return ret;
    }

    public static int blogInsert(int userId, String blog, String title) {
        int ret = 0;
        String sql = "INSERT INTO blog(userId,blog,title) values (?,?,?)";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, userId);
            preparedStatement.setString(2, blog);
            preparedStatement.setString(3, title);
            ret = preparedStatement.executeUpdate();
        } catch (SQLException e) {
            return -100;
        }
        return ret;
    }

    public static int commentInsert(int userId, int blogId, String comment) {
        int ret = 0;
        String sql = "INSERT INTO comment(userId,blogId,comment) values (?,?,?)";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, userId);
            preparedStatement.setInt(2, blogId);
            preparedStatement.setString(3, comment);
            ret = preparedStatement.executeUpdate();
        } catch (SQLException e) {
            return -100;
        }
        return ret;
    }

    public static int replyInsert(int userId, int commentId, String reply) {
        int ret = 0;
        String sql = "INSERT INTO reply(userId,commentId,reply) values (?,?,?)";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, userId);
            preparedStatement.setInt(2, commentId);
            preparedStatement.setString(3, reply);
            ret = preparedStatement.executeUpdate();
        } catch (SQLException e) {
            return -100;
        }
        return ret;
    }

    public static int preferenceInsert(int userId, int blogId, String label) {
        int ret = 0;
        String sql = "INSERT INTO preference(userId,blogId,label) values (?,?,?)";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, userId);
            preparedStatement.setInt(2, blogId);
            preparedStatement.setString(3, label);
            ret = preparedStatement.executeUpdate();
        } catch (SQLException e) {
            return -100;
        }
        return ret;
    }

    public static int messageInsert(int fromUserId, int toUserId, String message, int messageType) {
        int ret = 0;
        String sql = "INSERT INTO message(fromUserId,toUserId,message,messageType) values (?,?,?,?)";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, fromUserId);
            preparedStatement.setInt(2, toUserId);
            preparedStatement.setString(3, message);
            preparedStatement.setInt(4, messageType);
            ret = preparedStatement.executeUpdate();
        } catch (SQLException e) {
            return -100;
        }
        return ret;
    }

    public static int attentionInsert(int fromUserId, int toUserId) {
        int ret = 0;
        String sql = "INSERT INTO attention(fromUserId,toUserId) values (?,?)";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, fromUserId);
            preparedStatement.setInt(2, toUserId);
            ret = preparedStatement.executeUpdate();
        } catch (SQLException e) {
            return -100;
        }
        return ret;
    }

    public static int userInfoUpdate(String attribute, String userName, String content) {
        int ret = 0;
        String sql = "UPDATE user SET " + attribute + "=? WHERE userName=?";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, content);
            preparedStatement.setString(2, userName);
            ret = preparedStatement.executeUpdate();
        } catch (SQLException e) {
            return -100;
        }
        return ret;
    }

    public static int userDelete(int userId) {
        int ret = 1;
        String sql1 = "DELETE FROM user WHERE id=?";
        String sql2 = "DELETE FROM attention WHERE fromUserId=?";
        String sql3 = "DELETE FROM message WHERE fromUserId=?";
        try {
            PreparedStatement preparedStatement1 = connection.prepareStatement(sql1);
            preparedStatement1.setInt(1, userId);
            preparedStatement1.executeUpdate();
            PreparedStatement preparedStatement2 = connection.prepareStatement(sql2);
            preparedStatement2.setInt(1, userId);
            preparedStatement2.executeUpdate();
            PreparedStatement preparedStatement3 = connection.prepareStatement(sql3);
            preparedStatement3.setInt(1, userId);
            preparedStatement3.executeUpdate();
        } catch (SQLException e) {
            return -100;
        }
        return ret;
    }

    public static int blogUpdate(int blogId, String blog, String title) {
        int ret = 0;
        String sql1 = "UPDATE blog SET blog =? WHERE blogId=?";
        String sql2 = "UPDATE blog SET title =? WHERE blogId=?";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql1);
            preparedStatement.setString(1, blog);
            preparedStatement.setInt(2, blogId);
            ret += preparedStatement.executeUpdate();
            preparedStatement = connection.prepareStatement(sql2);
            preparedStatement.setString(1, title);
            preparedStatement.setInt(2, blogId);
            ret += preparedStatement.executeUpdate();
        } catch (SQLException e) {
            return -100;
        }
        return ret;
    }
}
