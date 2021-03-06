package com.ladeyi.test.service;


import com.ladeyi.test.mapper.Query;
import com.ladeyi.test.mapper.Update;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Attention {
    public static int insertAttention(int fromUserId, int toUserId) {
        return Update.attentionInsert(fromUserId, toUserId);
    }

    public static ResultSet checkAttentionUseFromUserId(int id) {
        try {
            String restrict = "fromUserId=" + id;
            ResultSet resultSet = Query.select("*", "attention", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static ResultSet checkAttentionUseToUserId(int id) {
        try {
            String restrict = "toUserId=" + id;
            ResultSet resultSet = Query.select("*", "attention", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static int deleteAttention(int fromUserId, int toUserId) {
        String restrict = "fromUserId=" + fromUserId + " AND toUserId=" + toUserId;
        ;
        return Update.delete("attention", restrict);
    }

    public static int checkFromAttentionCount(int toUserId){
        try {
            String restrict = "toUserId=" + toUserId;
            ResultSet resultSet = Query.select("COUNT(*)", "attention", restrict);
            resultSet.next();
            return resultSet.getInt(1);
        } catch (SQLException e) {
            return 0;
        }
    }

    public static int checkToAttentionCount(int fromUserId){
        try {
            String restrict = "fromUserId=" + fromUserId;
            ResultSet resultSet = Query.select("COUNT(*)", "attention", restrict);
            resultSet.next();
            return resultSet.getInt(1);
        } catch (SQLException e) {
            return 0;
        }
    }

    public static ResultSet searchAttention(int fromUserId,String keyword) {
        try {
            return Query.attentionSearchSelect(fromUserId,keyword);
        } catch (SQLException e) {
            return null;
        }
    }
}
