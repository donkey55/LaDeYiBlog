package com.ladeyi.test.service;

import com.ladeyi.test.mapper.Call;
import com.ladeyi.test.mapper.MyConnection;
import com.ladeyi.test.mapper.Query;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Goods {

    public static ResultSet checkGoods(int shopId) {
        try {
            String restrict = "shopId=" + shopId;
            ResultSet resultSet = Query.select("*", "goods", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static ResultSet checkGoodsUseGoodsId(int goodsId) {
        try {
            String restrict = "goodsId=" + goodsId;
            ResultSet resultSet = Query.select("goodsName", "goods", restrict);
            return resultSet;
        } catch (SQLException e) {
            return null;
        }
    }

    public static int buyGoods(int goodsId, int userId, int amount) {
        return Call.buyProcedure(goodsId,userId,amount);
    }
}


/*
create
    definer = user1@localhost procedure buy(IN g_id int, IN u_id int, IN am int)
BEGIN
    DECLARE nowAmount INTEGER DEFAULT 1;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET t_error=-1;

    START TRANSACTION;
    SET nowAmount=(SELECT goodsAmount FROM goods WHERE goodsId=g_id);
    UPDATE goods SET goodsAmount=nowAmount-am WHERE goodsId=g_id;
    INSERT INTO bill(userId,goodsId,amount) VALUES(u_id,g_id,am);

    IF (SELECT goodsAmount FROM goods WHERE goodsId=g_id)<0 THEN
        ROLLBACK;
        SELECT 0;
    ELSE
        COMMIT;
        SELECT 1;
    END IF;
END;
*/
