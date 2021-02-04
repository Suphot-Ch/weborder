var public_ip;
var Now = new Date();
var NowTime = pad(Now.getHours()) +":"+ pad(Now.getMinutes()) +":"+ pad(Now.getSeconds());
var NowDate = pad(Now.getDate()) +"-"+ pad(Now.getMonth()) +"-"+ pad(Now.getFullYear());

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    }
    else {
        return valString;
    }
}
var get_ip = () => {
    var run = setInterval(function () {
        if(public_ip == null)
        {
            $.getJSON("https://api.ipify.org?format=json", function (data) {
                public_ip = data.ip;
                console.log("public_ip : " + public_ip);
            });
        }else{
            clearInterval(run);
        }
    }, 100);
}
get_ip();
console.log("NowTime : " + NowTime);
console.log("NowDate : " + NowDate);