let userInfo;

$(function () {
    let userName = $.cookie("account");
    setHtml("userName", userName);
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/ShowUserInfoServlet",
        data: {
            "userName": userName
        },
        dataType: "json",
        success: function (data) {
            userInfo = data;
            setHtml("account", userName);
            setHtml("sex", data.sex);
            setHtml("phone", data.phone);
            setHtml("interest", data.interest);
            setHtml("address", data.address);
            setHtml("selfIntroduction", data.selfIntroduction);
            setHtml("fans", data.fansCount);
            setHtml("attention", data.attentionCount);

            setSex(data.sex);
            setValue("inputUserName", userName);
            setValue("inputInterest", data.interest);
            setValue("inputPhone", data.phone);
            setValue("inputAddress", data.address);
            setValue("inputSelfIntroduction", data.selfIntroduction);
        }, error() {
            alert("error");
        }
    });
});

function changeUserInfo() {
    let inputUserName = getValue("inputUserName");
    let inputSex = $('input:radio[name="sex"]:checked').val();
    let inputInterest = getValue("inputInterest");
    let inputPhone = getValue("inputPhone");
    let inputAddress = getValue("inputAddress");
    let inputSelfIntroduction = getValue("inputSelfIntroduction");
    let isChange = false;
    let isRight = false;
    if (inputUserName !== userInfo.userName) {
        if (isRightUserName(inputUserName)) {
            changeUserInfoAjax("userName", inputUserName);
            isChange = true;
            isRight = true;
        }
    }
    if (inputSex !== undefined && getValue("sex") !== inputSex) {
        changeUserInfoAjax("sex", inputSex);
        isChange = true;
    }
    if (inputInterest !== userInfo.interest ) {
        changeUserInfoAjax("interest", inputInterest);
        isChange = true;
    }
    if (inputPhone !== userInfo.phone) {
        changeUserInfoAjax("phone", inputPhone);
        isChange = true;
    }
    if (inputAddress !== userInfo.address) {
        changeUserInfoAjax("address", inputAddress);
        isChange = true;
    }
    if (inputSelfIntroduction !== userInfo.selfIntroduction) {
        changeUserInfoAjax("selfIntroduction");
        isChange = true;
    }
    if (isRight && isChange) {
        alert("修改成功");
    } else if (isChange){
        alert("用户名格式不正确");
    }

}

function isRightUserName(inputUserName) {
    return inputUserName.length < 64;
}

function setHtml(id, value) {
    $("#"+id).html(value);
}

function setValue(id, value) {
    $("#"+id).val(value);
}

function setSex(content) {
    $('input:radio[value="+content+" ]').attr('checked','true');
}

function getValue(id) {
    return $("#"+id).val();
}

function changeUserInfoAjax(attribute, content, servlet) {
    $.ajax({
        type: "post",
        url: "../com/ladeyi/test/" + servlet,
        dataType: "json",
        data: {
            userName: $.cookie("account"),
            attribute: attribute,
            content: content
        },
        success:function() {
            if (attribute === "sex") {
                setSex(content);
            } else {
                setHtml(attribute, content);
            }
        }
    });
}

function changePassword() {
        if ($("#inputNewPassword").val() !== $("#inputConfirmPassword").val()) {
            alert("两次输入的密码需要一致");
        } else if ($("#inputNewPassword").val().length < 6 || $("#inputNewPassword").val().length > 64) {
            alert("您的新密码长度需要在6-64个字符之间");
        } else {
            $.ajax({
                type: "post",
                url: "../com/ladeyi/test/ChangePasswordServlet",
                data: {
                    "userName": $.cookie("account"),
                    "oldPassword": $("#inputOldPassword").val(),
                    "newPassword": $("#inputNewPassword").val()
                },
                success: function (data) {
                    if (data.ret === "1") {
                        alert("更改成功");
                    } else {
                        alert("您的旧密码有误，请重试");
                    }
                }
            });
        }

}

