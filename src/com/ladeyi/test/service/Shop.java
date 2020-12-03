package com.ladeyi.test.service;

import com.ladeyi.test.mapper.Query;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Shop {
    public static ResultSet checkShopAttribute(){
        try {
            ResultSet resultSet=Query.select("*", "shop", "");
            return resultSet;
        }catch(SQLException e){
            return null;
        }
    }
}
