/**
 * Created by Amh on 2018-08-28.
 */
var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数
$send = $("#send");//发送验证码按钮
$input = $send.siblings('input');//验证码输入框
$check = $send.parent().parent().siblings(".info61").children('p').children('input');
$sub1 = $(".loginBtn");//注册按钮

var dengys = [false, false];//登录页信息-注册页验证信息

$(function () {
  $("input").bind('input propertychange', function () {
    //做一些事情
    var val = $(this).val().length;
    if ($(this).attr('id') === 'phone') {
      getPInput(val);
    } else if ($(this).attr('id') === 'yanz') {
      getYInput(val);
    } else if ($(this).attr('id') === 'pwd') {
      getMInput(val);
    } else if ($(this).attr('id') === 'phone2') {
      getPInput(val);
    }
  })
});
//能否点击注册
function enableSubmit(bool) {
  if (bool) {
    $sub1.removeAttr("disabled").css("opacity", 1);//启用按钮
  } else {
    $sub1.attr("disabled", "true").css("opacity", .5);
  }
}




/*监视输入框,手机号11验证*/
function getPInput(len) {
  if (len === 11) {//11位数字
    dengys[0] = true;
    $('#send').attr('disabled', false).css('opacity', '1');
  } else {
    dengys[0] = false;
    $('#send').attr('disabled', true).css('opacity', '.5');
  }
  v_shopsign();
  v_submitbutton();
}


/*监视输入框,验证码6位验证*/
function getYInput(len) {
  if (len === 6) {//验证码书入6位
    dengys[1] = true;
  } else {
    dengys[1] = false;
  }
  v_shopsign();
  v_submitbutton();
}

/*监视输入框,密码6位验证*/
function getMInput(len) {
  if (len >= 6) {//验证码书入6位
    dengys[1] = true;
  } else {
    dengys[1] = false;
  }
  v_shopsign();
  //v_submitbutton();
}
/*密码是否一致*/
function validate2() {
  var pwd1 = document.getElementById("password").value;
  var pwd2 = document.getElementById("password1").value;
  var tips = document.getElementById("tips");
  if (pwd1 === pwd2) {
    tips.innerHTML = "OK";
    tips.style.cssText = "color:#c39528";
    flags[2] = true;
  }
  else {
    tips.innerHTML = "* 两次密码不一致";
    tips.style.cssText = "color:#e61734";
    flags[2] = false
  }
  v_submitbutton();
}

/*发送验证码*/
function sendMessage() {
  curCount = count;
  //设置button效果，开始计时
  $send.attr("disabled", "true");
  $send.css("opacity", .5);
  $send.text(curCount + "S");
  InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次

  //请求后台发送验证码 TODO

}

/*验证码timer处理函数*/
function SetRemainTime() {
  if (curCount == 0) {
    window.clearInterval(InterValObj);//停止计时器
    $send.removeAttr("disabled");//启用按钮
    $send.text("重新发送");
    $send.css("opacity", 1);
  }
  else {
    curCount--;
    $send.text(curCount + "S");
  }
}


