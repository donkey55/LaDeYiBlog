package com.ladeyi.test.service;

import com.ladeyi.test.mapper.Query;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Bill {
    public static ResultSet checkBill(int userId) {
        try {
            String restrict = "userId=" + userId;
            ResultSet resultSet = Query.select("*", "bill", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }
}
