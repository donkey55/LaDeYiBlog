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

    public static int checkPreferenceCount(int id){
        try {
            String restrict = "blogId=" + id;
            ResultSet resultSet = Query.select("COUNT(*)", "preference", restrict);
            resultSet.next();
            return resultSet.getInt(1);
        } catch (SQLException e) {
            return 0;
        }
    }

    public static int deletePreference(int userId, int blogId) {
        String restrict = "userId=" + userId + " AND blogId=" + blogId;
        return Update.delete("preference", restrict);
    }

    public static int checkSingleBlogPreference(int userId,int blogId){
        try {
            String restrict = "userId=" + userId+" AND blogId="+blogId;
            ResultSet resultSet = Query.select("*", "preference", restrict);
            if (resultSet.next()){
                return 1;
            }else {
                return 0;
            }
        } catch (SQLException e) {
            return 0;
        }
    }
}
