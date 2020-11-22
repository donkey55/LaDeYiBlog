package com.ladeyi.test.mapper;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class MyConnection {
    private static String driverClassName = "com.mysql.cj.jdbc.Driver";
    private static String url = "jdbc:mysql://localhost/blog?serverTimezone=UTC&useSLL = false";
    private static String username = "user1";
    private static String password = "123456";
    public static Connection connection = null;

    public static void closeConnection() {
        try {
            connection.close();
        } catch (SQLException e) {
        }
    }

    public static Connection getConnection() {
        if (connection == null) {
            try {
                Class.forName(driverClassName);
                connection = DriverManager.getConnection(url, username, password);

            } catch (ClassNotFoundException | SQLException e) {
            }
        }
        return connection;
    }
}
