package com.ladeyi.test.mapper;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;

public class Call {

    Connection connection;
    public Call(Connection connection){
        this.connection=connection;
    }

    public void procedure(String... para){
        String sql="{CALL "+para[0]+"(";
        for(int i=1;i<para.length-1;i++){
            sql=sql+para[i]+",";
        }
        sql=sql+para[para.length-1]+")};";
        try{
            CallableStatement callableStatement=connection.prepareCall(sql);
            callableStatement.execute();
        }catch (SQLException e){}
    }
}
