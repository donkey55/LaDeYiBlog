package com.ladeyi.test.service;

import com.ladeyi.test.mapper.Query;
import com.ladeyi.test.mapper.Update;
import com.mysql.cj.protocol.Resultset;
import com.sun.org.apache.regexp.internal.RE;

import java.sql.ResultSet;
import java.sql.SQLException;

/*
返回1：处理成功；
返回0：处理失败；
返回-3：自我介绍长度不合法；
返回-4：号码长度不合法；
返回-5：地址长度不合法；
返回-6：兴趣长度不合法
返回-7：性别不合法；
返回-100：数据库处理错误；
*/
public class User {

    public static int register(String userName, String password) {
        return Update.registerInsert(userName, password);
    }

    public static int login(String userName, String password) {
        try {
            ResultSet resultSet = Query.loginSelect(userName, password);
            if (resultSet.next()) {
                return 1;
            } else {
                return 0;
            }
        } catch (SQLException e) {
            return -100;
        }
    }

    public static int changePassword(String userName, String oldPassword, String newPassword) {
        if (login(userName, oldPassword) == 1) {
            return Update.userInfoUpdate("password", userName, newPassword);
        }
        return 0;
    }

    public static int deleteUser(int userId) {
        return Update.userDelete(userId);
    }

    public static ResultSet checkId(String userName) {
        try {
            String restrict = "userName=\"" + userName + "\"";
            ResultSet resultSet = Query.select("id", "user", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static ResultSet checkSex(String userName) {
        try {
            String restrict = "userName=\"" + userName + "\"";
            ResultSet resultSet = Query.select("sex", "user", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static ResultSet checkInterest(String userName) {
        try {
            String restrict = "userName=\"" + userName + "\"";
            ResultSet resultSet = Query.select("interest", "user", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static ResultSet checkAddress(String userName) {
        try {
            String restrict = "userName=\"" + userName + "\"";
            ResultSet resultSet = Query.select("address", "user", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static ResultSet checkPhone(String userName) {
        try {
            String restrict = "userName=\"" + userName + "\"";
            ResultSet resultSet = Query.select("phone", "user", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static ResultSet checkSelfIntroduction(String userName) {
        try {
            String restrict = "userName=\"" + userName + "\"";
            ResultSet resultSet = Query.select("selfIntroduction", "user", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static ResultSet checkPoint(String userName) {
        try {
            String restrict = "userName=\"" + userName + "\"";
            ResultSet resultSet = Query.select("point", "user", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static ResultSet checkRemind(String userName) {
        try {
            String restrict = "userName=\"" + userName + "\"";
            ResultSet resultSet = Query.select("remind", "user", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static ResultSet checkUserName(String id) {
        try {
            String restrict = "id=\"" + id + "\"";
            ResultSet resultSet = Query.select("userName", "user", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static int changeSelfIntroduction(String userName, String selfIntroduction) {
        return Update.userInfoUpdate("selfIntroduction",userName,selfIntroduction);
    }

    public static int changePhone(String userName, String phone) {
        return Update.userInfoUpdate("phone",userName,phone);
    }

    public static int changeAddress(String userName, String address) {
        return Update.userInfoUpdate("address",userName,address);
    }

    public static int changeInterest(String userName, String interest) {
        return Update.userInfoUpdate("interest",userName,interest);
    }

    public static int changeSex(String userName, String sex) {
        return Update.userInfoUpdate("sex",userName,sex);
    }

    public static int changeUserName(String userName,String newUserName){
        return Update.userInfoUpdate("userName",userName,newUserName);
    }

    private static boolean validSex(String sex) {
        if (sex.equals("男") || sex.equals("女")) {
            return true;
        }
        return false;
    }

    private static boolean validPhone(String phone) {
        if (phone.length() == 11) {
            return true;
        }
        return false;
    }

    private static boolean validSelfIntroduction(String selfIntroduction) {
        if (selfIntroduction.length() <= 256) {
            return true;
        }
        return false;
    }

    private static boolean validAddress(String address) {
        if (address.length() <= 256) {
            return true;
        }
        return false;
    }

    private static boolean validInterest(String interest) {
        if (interest.length() <= 128) {
            return true;
        }
        return false;
    }
}
