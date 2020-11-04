package com.ladeyi.test;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) {
        //Query query = new Query(myConnection.getConnection());
       //Update update = new Update(myConnection.getConnection());
        //Call call=new Call(myConnection.getConnection());
        //ResultSet resultSet = null;
        System.out.println(User.login("user1","123456qwerty"));
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