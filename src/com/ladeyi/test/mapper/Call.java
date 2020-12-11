package com.ladeyi.test.mapper;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;

public class Call {

    private static Connection connection = MyConnection.getConnection();

    public static void procedure(String... para) {
        String sql = "{CALL " + para[0] + "(";
        for (int i = 1; i < para.length - 1; i++) {
            sql = sql + para[i] + ",";
        }
        sql = sql + para[para.length - 1] + ")};";
        try {
            CallableStatement callableStatement = connection.prepareCall(sql);
            callableStatement.execute();
        } catch (SQLException e) {
        }
    }

    public static int buyProcedure(int goodsId, int userId, int amount) {
        String sql = "{CALL buy(?,?,?,?)}";
        try {
            CallableStatement callableStatement = connection.prepareCall(sql);
            callableStatement.setInt(1, goodsId);
            callableStatement.setInt(2, userId);
            callableStatement.setInt(3, amount);
            callableStatement.registerOutParameter(4, Types.INTEGER);
            callableStatement.execute();
            return callableStatement.getInt(4);
        } catch (SQLException e) {
            return -1;
        }
    }
}
