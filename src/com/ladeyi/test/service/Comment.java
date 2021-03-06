package com.ladeyi.test.service;


import com.ladeyi.test.mapper.Query;
import com.ladeyi.test.mapper.Update;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Comment {
    public static int insertComment(int userId, int blogId, String comment) {
        return Update.commentInsert(userId, blogId, comment);
    }

    public static ResultSet checkComment(int id) {
        try {
            String restrict = "commentId=" + id;
            ResultSet resultSet = Query.select("*", "comment", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static ResultSet checkCommentUseBlogId(int id) {
        try {
            String restrict = "blogId=" + id;
            ResultSet resultSet = Query.select("*", "comment", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static int checkCommentCount(int id){
        try {
            String restrict = "blogId=" + id;
            ResultSet resultSet = Query.select("COUNT(*)", "comment", restrict);
            resultSet.next();
            return resultSet.getInt(1);
        } catch (SQLException e) {
            return 0;
        }
    }

    public static ResultSet checkCommentUseUserId(int id) {
        try {
            String restrict = "userId=" + id;
            ResultSet resultSet = Query.select("*", "comment", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static int deleteComment(int id) {
        String restrict = "commentId=" + id;
        return Update.delete("comment", restrict);
    }
}
