/*################## JavaScript ###################*/
function readTextFile() {
    var Obj, stObj;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", host+url, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                row_main = this.responseText;
                Obj = JSON.parse(row_main);
                stObj = JSON.stringify(Obj);
                if (DebugLog)
                    console.log(Obj);
            }
        }
    }
    rawFile.send("x=" + stObj);
}
function setTable(json){
    var htmx = '';
    var Objpoint;
    var Years = document.querySelector('#selest-year').value;
    document.getElementById("counter").innerHTML = json.counter;
    Objpoint = json.sData.DATA;
    if (DebugLog)
        console.log(json.sData.DATA);
    htmx = "";
    htmx += "<tbody>";
    htmx += "<div>";
    var x_max = Objpoint.length;
    console.log(x_max);
    for (x in Objpoint) {
        var xx = (x_max - x)-1;
        htmx += "<tr>";
        htmx +="     <td id=\"b-model\">"+Objpoint[xx].ORDER+"</td>";
        htmx +="     <td id=\"b-picture\" href=\"" + headWeb + "/" + Years + "/file/" + Objpoint[xx].ORDER + ".pdf\"><img width=\"200\"";
        htmx +="             src=\"" + headWeb + "/" + Years + "/images/" + Objpoint[xx].ORDER + ".png\"></td>";
        htmx +="     <td id=\"b-display\" >";
        if(Objpoint[xx].DISPLAY.TYPE != null)
            htmx += Objpoint[xx].DISPLAY.TYPE + "<br>";
        else
            htmx += Objpoint[xx].DISPLAY + "<br>";
        if(Objpoint[xx].SIZE != null)
            htmx += Objpoint[xx].SIZE;
        else
            htmx += Objpoint[xx].DISPLAY.SIZE + "<br>";
        if(Objpoint[xx].DISPLAY.OTHOR != null)
            htmx += Objpoint[xx].DISPLAY.OTHOR + "<br>";
        htmx +="</td>";
        
        if(media_width >= 600){
            console.log("media width : " + media_width);
            // Colunm Input
            htmx +="<td id=\"b-input\" >";
            if(Objpoint[xx].INPUT.TYPE == "" || Objpoint[xx].INPUT.TYPE == "-") {
                htmx +="-";
            }
            else {
                htmx += Objpoint[xx].INPUT.TYPE + "<br>";
                if(Objpoint[xx].INPUT.OTHER != null || Objpoint[xx].INPUT.OTHER != "")
                    htmx += Objpoint[xx].INPUT.OTHER + "<br>";
                if(Objpoint[xx].INPUT.CH != null)
                    htmx += Objpoint[xx].INPUT.CH +" ch";
                else
                    htmx += Objpoint[xx].INPUT.CHANNEL +" ch";
            }
            htmx +="</td>";
            
            // Colunm Output
            htmx +="<td id=\"b-output\" >";
            if(Objpoint[xx].OUTPUT.TYPE == "" || Objpoint[xx].OUTPUT.TYPE == "-") {
                htmx +="-";
            }
            else {
                htmx += Objpoint[xx].OUTPUT.TYPE + "<br>";
                if(Objpoint[xx].OUTPUT.OTHER != null || Objpoint[xx].OUTPUT.OTHER != "")
                    htmx += Objpoint[xx].OUTPUT.OTHER + "<br>";
                if(Objpoint[xx].OUTPUT.CH != null)
                    htmx += Objpoint[xx].OUTPUT.CH +" ch";
                else
                    htmx += Objpoint[xx].OUTPUT.CHANNEL +" ch";
            }
            htmx +="</td>";
        
            // Colunm COMMUNICATION
            htmx +="<td id=\"b-comm\" >";
            if(Objpoint[xx].COMMUNICATION.TYPE == "" || Objpoint[xx].COMMUNICATION.TYPE == "-") {
                htmx +="-";
            }
            else {
                htmx += Objpoint[xx].COMMUNICATION.TYPE + "<br>";
                if(Objpoint[xx].COMMUNICATION.OTHER != null || Objpoint[xx].COMMUNICATION.OTHER != "")
                    htmx += Objpoint[xx].COMMUNICATION.OTHER + "<br>";
                if(Objpoint[xx].COMMUNICATION.CH != null)
                    htmx += Objpoint[xx].COMMUNICATION.CH +" ch";
                else
                    htmx += Objpoint[xx].COMMUNICATION.CHANNEL +" ch";
            }
            htmx +="</td>";
        }
        
        htmx +="     <td id=\"b-download\" ><a class=\"a-button\"";
        htmx +="             href=\"" + headWeb + "/" + Years + "/file/" + Objpoint[xx].ORDER + ".pdf\">Download</a>";
        htmx +="     </td>";
        
        var detial = "";
        detial +="     <td id=\"b-detail\" >";
        for(y in Objpoint[xx].FUNCTION){
            if(y == 4){
                // detial +="<div class=\"dot\" id=\"dots" + x + "\">...</div>";
                detial +="<div class=\"more\" id=\"more"+ Years +""+ xx + "\">";
                detial +="<div>";
                detial += Objpoint[xx].FUNCTION[y];
                detial +="</div>";
            }
            else if(y > 4 && y == Objpoint[xx].FUNCTION.length - 1){
                detial +="<div>";
                detial += Objpoint[xx].FUNCTION[y];
                detial +="</div>";
                detial +="</div>";
                detial +="<a href=\"#view\" onclick=\"readMore("+ Years + xx + ",0);\" id=\"myBtn"+ Years + xx + "\">read more...</a>";
            }
            else{
                detial +="<div>";
                detial += Objpoint[xx].FUNCTION[y];
                detial +="</div>";
            }
        }
        detial +="     </td>";

        if(media_width >= 900)
            htmx += detial;
        // console.log(detial);
        htmx +=" </tr>";
    }
    htmx += "</div>";
    htmx += "</tbody>";
    document.getElementById("loadTable").innerHTML = htmx;
    
    if(media_width < 600){
        document.getElementById('th-input').style.display = 'none';
        document.getElementById('th-output').style.display = 'none';
        document.getElementById('th-comm').style.display = 'none';
        document.getElementById('th-detail').style.display = 'none';
        // document.getElementById('b-input').style.display = 'none';
        // document.getElementById('b-output').style.display = 'none';
        // document.getElementById('b-comm').style.display = 'none';
        // document.getElementById('b-detail').style.display = 'none';
    }
    else if(media_width < 900){
        document.getElementById('th-input').style.display = 'table-cell';
        document.getElementById('th-output').style.display = 'table-cell';
        document.getElementById('th-comm').style.display = 'table-cell';
        document.getElementById('th-detail').style.display = 'none';
        // document.getElementById('b-input').style.display = 'table-cell';
        // document.getElementById('b-output').style.display = 'table-cell';
        // document.getElementById('b-comm').style.display = 'table-cell';
        // document.getElementById('b-detail').style.display = 'none';
    }
    else{
        document.getElementById('th-input').style.display = 'table-cell';
        document.getElementById('th-output').style.display = 'table-cell';
        document.getElementById('th-comm').style.display = 'table-cell';
        document.getElementById('th-detail').style.display = 'table-cell';
        // document.getElementById('b-input').style.display = 'table-cell';
        // document.getElementById('b-output').style.display = 'table-cell';
        // document.getElementById('b-comm').style.display = 'table-cell';
        // document.getElementById('b-detail').style.display = 'table-cell';
        for (x in Objpoint) {
            readMore(Years +""+ x, 1);
        }
    }
    if(media_width < 600){
        // document.getElementById('selest-filter').style.display = "none";
        // document.getElementById('search-table').style.display = "none";
    }else{
        // document.getElementById('selest-filter').style.display = "initial";
        // document.getElementById('search-table').style.display = "initial";
    }
    set_sort(404, 1);
}
function loadtable(){
    var htmx = '';
    var url;
    var Obj, stObj;
    var Objpoint;
    var Years = document.querySelector('#selest-year').value;
    url = "/read?YEAR=" + Years;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", host+url, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                row_main = this.responseText;
                Obj = JSON.parse(row_main);
                stObj = JSON.stringify(Obj);
                if (DebugLog)
                    console.log(Obj);
                IndexMain = Obj;
                setTable(Obj);
            }
        }
    }
    rawFile.send("x=" + stObj);
}
document.querySelector('#btn-apply').addEventListener('click', loadtable, false);

function readMore(order, sett) {
    // console.log(order);
    // var dots = document.getElementById("dots" + order).style;
    try{
        var moreText = document.getElementById("more" + order).style;
        var btnText = document.getElementById("myBtn" + order);
        if (moreText.display != "none" || sett == 1) {
        //   dots.display = "inline";
        btnText.innerHTML = "read more..."; 
        moreText.display = "none";
        } else {
        //   dots.display = "none";
        btnText.innerHTML = "hide"; 
        moreText.display = "inline";
        }
    }catch{
        console.log("style : null");}
  }
  const getjsonformhost = (method, URLLoad, status) => {
      let Obj, stObj;
      let rawFile = new XMLHttpRequest();
      rawFile.open(method, host+URLLoad, false);
      rawFile.onreadystatechange = function () {
          status = rawFile.status;
          if (rawFile.readyState === 4) {
              if (rawFile.status === 200 || rawFile.status == 0) {
                  Obj = JSON.parse(this.responseText);
                  stObj = JSON.stringify(Obj);
                  if (DebugLog)
                      console.log(Obj);
              }
          }
      }
      rawFile.send("x=" + stObj);
      return Obj;
  };
  function addfile() {
    let status;
    let user = document.getElementById('uname').value;
    let pass = document.getElementById('psw').value;
    var data = getjsonformhost('get', '/read/login?user=' + user + '&pass=' + pass, status);
    user = "";
    pass = "";
    document.getElementById('uname').value = "";
    document.getElementById('psw').value = "";
    console.log(data);
    if(data.sData.status == "true")
    {
        document.getElementById('login').style.display='none';
        window.open(data.sData.path);
    }
    else
    {
        var htm ="<center>"+data.sData.status+"</center>"
        document.getElementById('al_error').innerHTML = htm;
    }
  }