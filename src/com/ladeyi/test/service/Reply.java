package com.ladeyi.test.service;


import com.ladeyi.test.mapper.Query;
import com.ladeyi.test.mapper.Update;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Reply {
    public static int insertReply(int userId, int commentId, String reply) {
        return Update.replyInsert(userId, commentId, reply);
    }

    public static ResultSet checkReplyUseUserId(int id) {
        try {
            String restrict = "userId=" + id;
            ResultSet resultSet = Query.select("*", "reply", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static ResultSet checkReplyUseCommentId(int id) {
        try {
            String restrict = "commentId=" + id;
            ResultSet resultSet = Query.select("*", "reply", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static int deleteReply(int id) {
        String restrict = "replyId=" + id;
        return Update.delete("reply", restrict);
    }
}
