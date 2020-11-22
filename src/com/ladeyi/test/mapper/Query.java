package com.ladeyi.test.mapper;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Query {
    private static Connection connection=MyConnection.getConnection();

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

    public static ResultSet blogSearchSelect(String keyword) throws  SQLException{
        ResultSet resultSet = null;
        String sql = "SELECT * FROM blog WHERE blog LIKE ? OR title LIKE ?";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setString(1, "%"+keyword+"%");
        preparedStatement.setString(2, "%"+keyword+"%");
        resultSet = preparedStatement.executeQuery();
        return resultSet;
    }
}
