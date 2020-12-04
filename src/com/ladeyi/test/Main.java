package com.ladeyi.test;

import com.ladeyi.test.mapper.MyConnection;
import com.ladeyi.test.service.Attention;
import com.ladeyi.test.service.Blog;
import com.ladeyi.test.service.Comment;
import com.ladeyi.test.service.Goods;
import com.ladeyi.test.service.Message;
import com.ladeyi.test.service.Preference;
import com.ladeyi.test.service.Reply;
import com.ladeyi.test.service.Shop;
import com.ladeyi.test.service.User;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Main {
    private static Connection connection = MyConnection.getConnection();

    public static void main(String[] args) throws SQLException {
        int ret =0;
        int goodsId = 1;
        int userId = 1;
        int amount = 1;
        ret= Goods.buyGoods(goodsId,userId,amount);
        String output = "{\"ret\":\"" + ret + "\"}";
        System.out.println(ret);
        //Query query = new Query(myConnection.getConnection());
        //Update update = new Update(myConnection.getConnection());
        //Call call=new Call(myConnection.getConnection());
        //ResultSet resultSet = null;
        //System.out.println(ShowMyBlogInfoServlet.doPost());
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
        myConnection.closeConnection();

        CREATE PROCEDURE buy(IN g_id INT,IN u_id INT,IN am INT)
    BEGIN
    DECLARE t_error INTEGER DEFAULT 1;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET t_error=-1;

        START TRANSACTION;
            UPDATE goods SET goodsAmount=(SELECT goodsAmount FROM goods WHERE goodsId=g_id)-am WHERE goodsId=g_id;
            INSERT INTO bill(userId,goodsId,amount) VALUES(u_id,g_id,am);

        IF (SELECT goodsAmount FROM goods WHERE goodsId=g_id)<0 THEN
            ROLLBACK;
            SELECT 0;
        ELSE
            COMMIT;
            SELECT 1;
        END;
END



        */