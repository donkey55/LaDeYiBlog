package com.ladeyi.test;
import java.sql.ResultSet;
import java.sql.SQLException;

/*
返回1：处理成功；
返回0：处理失败；
返回-1：用户名长度不合法；
返回-2：密码不符合大于6位，小于64位且同时包含数字和字母；
返回-3：自我介绍长度不合法；
返回-4：号码长度不合法；
返回-5：地址长度不合法；
返回-6：兴趣长度不合法
返回-7：性别不合法；
返回-100：数据库处理错误；
*/
public class User {
    private static Query query = new Query(MyConnection.getConnection());
    private static Update update = new Update(MyConnection.getConnection());


    public static int register(String userName, String password) {
        if (validUserName(userName)) {
            if (validPassword(password)) {
                return update.registerInsert(userName, password);
            } else {
                return -2;
            }
        } else {
            return -1;
        }
    }

    public static int login(String userName, String password) {
        if (validUserName(userName)) {
            if (validPassword(password)) {
                try {
                    ResultSet resultSet = query.loginSelect(userName, password);
                    if (resultSet.next()) {
                        return 1;
                    } else {
                        return 0;
                    }
                } catch (SQLException e) {
                    return -100;
                }
            } else {
                return -2;
            }
        } else {
            return -1;
        }
    }

    public static int checkSex(int id){
        try{
            String restrict="id="+id;
            ResultSet resultSet = query.select("sex","user",restrict);
            if (resultSet.next()) {
                System.out.println(resultSet.getString(1));
                return 1;
            } else {
                return 0;
            }
        }catch(SQLException e){
            return -100;
        }
    }

    public static int checkInterest(int id){
        try{
            String restrict="id="+id;
            ResultSet resultSet = query.select("interest","user",restrict);
            if (resultSet.next()) {
                System.out.println(resultSet.getString(1));
                return 1;
            } else {
                return 0;
            }
        }catch(SQLException e){
            return -100;
        }
    }

    public static int checkAddress(int id){
        try{
            String restrict="id="+id;
            ResultSet resultSet = query.select("address","user",restrict);
            if (resultSet.next()) {
                System.out.println(resultSet.getString(1));
                return 1;
            } else {
                return 0;
            }
        }catch(SQLException e){
            return -100;
        }
    }

    public static int checkPhone(int id){
        try{
            String restrict="id="+id;
            ResultSet resultSet = query.select("phone","user",restrict);
            if (resultSet.next()) {
                System.out.println(resultSet.getString(1));
                return 1;
            } else {
                return 0;
            }
        }catch(SQLException e){
            return -100;
        }
    }

    public static int checkSelfIntroduction(int id){
        try{
            String restrict="id="+id;
            ResultSet resultSet = query.select("selfIntroduction","user",restrict);
            if (resultSet.next()) {
                System.out.println(resultSet.getString(1));
                return 1;
            } else {
                return 0;
            }
        }catch(SQLException e){
            return -100;
        }
    }

    public static int changeSelfIntroduction(int id, String selfIntroduction) {
        if (validSelfIntroduction(selfIntroduction)) {
            String newData = "selfIntroduction=\"" + selfIntroduction+"\"";
            String restrict = "id=" + id;
            return update.update("user", newData, restrict);
        } else {
            return -3;
        }
    }

    public static int changePhone(int id, String phone) {
        if (validPhone(phone)) {
            String newData = "phone=\"" + phone+"\"";
            String restrict = "id=" + id;
            return update.update("user", newData, restrict);
        } else {
            return -4;
        }
    }

    public static int changeAddress(int id, String address) {
        if (validAddress(address)) {
            String newData = "address=\"" + address+"\"";
            String restrict = "id=" + id;
            return update.update("user", newData, restrict);
        } else {
            return -5;
        }
    }

    public static int changeInterest(int id, String interest) {
        if (validInterest(interest)) {
            String newData = "interest=\"" + interest+"\"";
            String restrict = "id=" + id;
            return update.update("user", newData, restrict);
        } else {
            return -6;
        }
    }

    public static int changeSex(int id, String sex) {
        if (validSex(sex)) {
            String newData = "sex=\"" + sex+"\"";
            String restrict = "id=" + id;
            return update.update("user", newData, restrict);
        } else {
            return -7;
        }
    }

    private static boolean validPassword(String password) {
        boolean number = false, letter = false, length;
        length = (password.length() >= 6) & (password.length() <= 64);
        for (int i = 0; i < password.length(); i++) {
            char temp = password.charAt(i);
            if (Character.isDigit(temp)) {
                number = true;
            } else if (Character.isLetter(temp)) {
                letter = true;
            }
        }
        return number & letter & length;
    }

    private static boolean validUserName(String userName) {
        if (userName != null && userName.length() <= 64) {
            return true;
        }
        return false;
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
