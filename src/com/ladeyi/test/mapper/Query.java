package com.ladeyi.test.mapper;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Query {
    private static Connection connection = MyConnection.getConnection();

    public static ResultSet select(String column, String table, String restrict) throws SQLException {
        ResultSet resultSet = null;
        String sql = "SELECT " + column + " FROM " + table;
        if (restrict.equals("")) {
            sql = sql + ";";
        } else {
            sql = sql + " WHERE " + restrict + ";";
        }
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        resultSet = preparedStatement.executeQuery();
        return resultSet;
    }

    public static ResultSet loginSelect(String userName, String password) throws SQLException {
        ResultSet resultSet = null;
        String sql = "SELECT * FROM user WHERE userName=? AND password=?";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setString(1, userName);
        preparedStatement.setString(2, password);
        resultSet = preparedStatement.executeQuery();
        return resultSet;
    }

    public static ResultSet blogSearchSelect(String keyword) throws SQLException {
        ResultSet resultSet = null;
        String sql = "SELECT * FROM blog WHERE blog LIKE ? OR title LIKE ?";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setString(1, "%" + keyword + "%");
        preparedStatement.setString(2, "%" + keyword + "%");
        resultSet = preparedStatement.executeQuery();
        return resultSet;
    }

    public static ResultSet attentionSearchSelect(int fromUserId,String keyword) throws SQLException {
        ResultSet resultSet = null;
        String sql = "SELECT user.userName FROM attention,user WHERE attention.toUserId=user.id AND user.userName LIKE ? AND attention.fromUserId=?";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setString(1, "%" + keyword + "%");
        preparedStatement.setInt(2, fromUserId);
        resultSet = preparedStatement.executeQuery();
        return resultSet;
    }

    public static ResultSet preferenceSearchSelect(int userId,String keyword) throws SQLException {
        ResultSet resultSet = null;
        String sql = "SELECT blog.title,preference.blogId,preference.label FROM preference,blog WHERE preference.blogId=blog.blogId AND (blog.blog LIKE ? OR blog.title LIKE ? OR preference.label LIKE ?) AND preference.userId=?";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setString(1, "%" + keyword + "%");
        preparedStatement.setString(2, "%" + keyword + "%");
        preparedStatement.setString(3, "%" + keyword + "%");
        preparedStatement.setInt(4, userId);
        resultSet = preparedStatement.executeQuery();
        return resultSet;
    }

    public static ResultSet billSearchSelect(int userId,String keyword) throws SQLException {
        ResultSet resultSet = null;
        String sql = "SELECT bill.goodsId,bill.num,bill.billId,goods.goodsName FROM bill,goods WHERE goods.goodsId=bill.goodsId AND (goods.goodsName LIKE ? OR goods.goodsIntroduction LIKE ? OR bill.billId LIKE ?) AND bill.userId=?";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setString(1, "%" + keyword + "%");
        preparedStatement.setString(2, "%" + keyword + "%");
        preparedStatement.setString(3, "%" + keyword + "%");
        preparedStatement.setInt(4, userId);
        resultSet = preparedStatement.executeQuery();
        return resultSet;
    }
}
