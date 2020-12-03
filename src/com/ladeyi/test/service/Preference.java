package com.ladeyi.test.service;


import com.ladeyi.test.mapper.Query;
import com.ladeyi.test.mapper.Update;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Preference {
    public static int insertPreference(int userId, int blogId, String label) {
        return Update.preferenceInsert(userId, blogId, label);
    }

    public static ResultSet checkPreference(int id) {
        try {
            String restrict = "userId=" + id;
            ResultSet resultSet = Query.select("*", "preference", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static int deletePreference(int userId, int blogId) {
        String restrict = "userId=" + userId + " AND blogId=" + blogId;
        return Update.delete("preference", restrict);
    }
}
