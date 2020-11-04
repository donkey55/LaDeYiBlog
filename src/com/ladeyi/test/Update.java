package com.ladeyi.test;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class Update {
    Connection connection;

    public Update(Connection connection) {
        this.connection = connection;
    }

    public int insert(String table, String... para) {
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
        }
        return ret;
    }

    public int delete(String table, String restrict) {
        int ret = 0;
        String sql = "DELETE FROM " + table;
        if (restrict.equals("")){
            sql=sql+";";
        }else {
            sql=sql+ " WHERE " + restrict+";";
        }
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ret = preparedStatement.executeUpdate();
        } catch (SQLException e) {
        }
        return ret;
    }

    public int update(String table,String newData,String restrict) {
        int ret = 0;
        String sql = "UPDATE " + table+" SET "+newData;
        if (restrict.equals("")){
            sql=sql+";";
        }else {
            sql=sql+ " WHERE " + restrict+";";
        }
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ret = preparedStatement.executeUpdate();
        } catch (SQLException e) {
            return -100;
        }
        return ret;
    }

    public int registerInsert(String userName,String password){
        int ret=0;
        String sql="INSERT INTO user(userName,password) values (?,?)";
        try{
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1,userName);
            preparedStatement.setString(2,password);
            ret=preparedStatement.executeUpdate();
        }catch(SQLException e){
            return -100;
        }
        return ret;
    }

    public int blogInsert(int userId,String blog){
        int ret=0;
        String sql="INSERT INTO blog(userId,blog) values (?,?)";
        try{
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1,userId);
            preparedStatement.setString(2,blog);
            ret=preparedStatement.executeUpdate();
        }catch(SQLException e){
            return -100;
        }
        return ret;
    }
}
