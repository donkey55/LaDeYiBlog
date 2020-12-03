package com.ladeyi.test;

import com.ladeyi.test.mapper.MyConnection;
import com.ladeyi.test.service.Attention;
import com.ladeyi.test.service.Blog;
import com.ladeyi.test.service.Comment;
import com.ladeyi.test.service.Message;
import com.ladeyi.test.service.Preference;
import com.ladeyi.test.service.User;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Main {
    private static Connection connection = MyConnection.getConnection();

    public static void main(String[] args) throws SQLException {
        String ret = "[";
        String userName = "user12";
        try {
            ResultSet userIdSet = User.checkId(userName);
            userIdSet.next();
            int userId = Integer.parseInt(userIdSet.getString(1));
            ResultSet attentionSet = Attention.checkAttentionUseToUserId(userId);
            while (attentionSet.next()) {
                ResultSet userNameSet = User.checkUserName(attentionSet.getString(1));
                userNameSet.next();
                ret = ret + "{\"userName\":\"" + userNameSet.getString(1) + "\"},";
            }
        } catch (SQLException e) {
        }
        if (ret.charAt(ret.length() - 1) == ',') {
            ret = ret.substring(0, ret.length() - 1);
        }
        ret = ret + "]";
        System.out.println(ret);
        //Query query = new Query(myConnection.getConnection());
        //Update update = new Update(myConnection.getConnection());
        //Call call=new Call(myConnection.getConnection());
        //ResultSet resultSet = null;
        //System.out.println(ShowBlogInfoServlet.doPost());
    }
}





/*        resultSet = query.select("*", "students","");
        try {
            while (resultSet.next()) {
                System.out.println(resultSet.getString(1));
                System.out.println(resultSet.getString(2));
                System.out.println(resultSet.getString(3));
                System.out.println(resultSet.getString(4));
                System.out.println(resultSet.getString(5));
            }
        } catch (SQLException e) {
        }
        call.procedure("change_score","6","88");
        update.insert("students","name","\"刘翔\"","score","97","phone","13242535423","class","5");
        update.update("students","score=76","name=\"静香\"");
        update.delete("students","name= \"刘翔翔\"");
        myConnection.closeConnection();*/