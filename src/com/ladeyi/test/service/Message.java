package com.ladeyi.test.service;


import com.ladeyi.test.mapper.Query;
import com.ladeyi.test.mapper.Update;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Message {
    public static int insertMessage(int fromUserId, int toUserId, String message, int messageType) {
        return Update.messageInsert(fromUserId, toUserId, message, messageType);
    }

    public static ResultSet checkMessageUseFromUserId(int id) {
        try {
            String restrict = "fromUserId=" + id;
            ResultSet resultSet = Query.select("*", "message", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static ResultSet checkMessageUseToUserId(int id) {
        try {
            String restrict = "toUserId=" + id;
            ResultSet resultSet = Query.select("*", "message", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static int deleteMessage(int id) {
        String restrict = "messageId=" + id;
        return Update.delete("message", restrict);
    }
}
