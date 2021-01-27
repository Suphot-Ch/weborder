var media_width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var media_width_;

var IndexMain;

console.log(media_width);
const ttx = setInterval(function() {
    media_width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if(media_width_ != media_width){
        media_width_ = media_width;
        setTable(IndexMain);
    }
}, 500);

/*################## JavaScript ###################*/
function readTextFile() {
    var Obj, stObj;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", url, false);
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
    for (x in Objpoint) {
        htmx += "<tr>";
        htmx +="     <td id=\"b-model\">"+Objpoint[x].ORDER+"</td>";
        htmx +="     <td id=\"b-picture\" href=\"" + headWeb + "/" + Years + "/file/" + Objpoint[x].ORDER + ".pdf\"><img width=\"200\"";
        htmx +="             src=\"" + headWeb + "/" + Years + "/images/" + Objpoint[x].ORDER + ".png\"></td>";
        htmx +="     <td id=\"b-display\" >";
        if(Objpoint[x].DISPLAY.TYPE != null)
            htmx += Objpoint[x].DISPLAY.TYPE + "<br>";
        else
            htmx += Objpoint[x].DISPLAY + "<br>";
        if(Objpoint[x].SIZE != null)
            htmx += Objpoint[x].SIZE;
        else
            htmx += Objpoint[x].DISPLAY.SIZE + "<br>";
        if(Objpoint[x].DISPLAY.OTHOR != null)
            htmx += Objpoint[x].DISPLAY.OTHOR + "<br>";
        htmx +="</td>";
        
        if(media_width >= 600){
            console.log("media width : " + media_width);
            // Colunm Input
            htmx +="<td id=\"b-input\" >";
            if(Objpoint[x].INPUT.TYPE == "" || Objpoint[x].INPUT.TYPE == "-") {
                htmx +="-";
            }
            else {
                htmx += Objpoint[x].INPUT.TYPE + "<br>";
                if(Objpoint[x].INPUT.OTHER != null || Objpoint[x].INPUT.OTHER != "")
                    htmx += Objpoint[x].INPUT.OTHER + "<br>";
                if(Objpoint[x].INPUT.CH != null)
                    htmx += Objpoint[x].INPUT.CH +" ch";
                else
                    htmx += Objpoint[x].INPUT.CHANNEL +" ch";
            }
            htmx +="</td>";
            
            // Colunm Output
            htmx +="<td id=\"b-output\" >";
            if(Objpoint[x].OUTPUT.TYPE == "" || Objpoint[x].OUTPUT.TYPE == "-") {
                htmx +="-";
            }
            else {
                htmx += Objpoint[x].OUTPUT.TYPE + "<br>";
                if(Objpoint[x].OUTPUT.OTHER != null || Objpoint[x].OUTPUT.OTHER != "")
                    htmx += Objpoint[x].OUTPUT.OTHER + "<br>";
                if(Objpoint[x].OUTPUT.CH != null)
                    htmx += Objpoint[x].OUTPUT.CH +" ch";
                else
                    htmx += Objpoint[x].OUTPUT.CHANNEL +" ch";
            }
            htmx +="</td>";
        
            // Colunm COMMUNICATION
            htmx +="<td id=\"b-comm\" >";
            if(Objpoint[x].COMMUNICATION.TYPE == "" || Objpoint[x].COMMUNICATION.TYPE == "-") {
                htmx +="-";
            }
            else {
                htmx += Objpoint[x].COMMUNICATION.TYPE + "<br>";
                if(Objpoint[x].COMMUNICATION.OTHER != null || Objpoint[x].COMMUNICATION.OTHER != "")
                    htmx += Objpoint[x].COMMUNICATION.OTHER + "<br>";
                if(Objpoint[x].COMMUNICATION.CH != null)
                    htmx += Objpoint[x].COMMUNICATION.CH +" ch";
                else
                    htmx += Objpoint[x].COMMUNICATION.CHANNEL +" ch";
            }
            htmx +="</td>";
        }
        
        htmx +="     <td id=\"b-download\" ><a class=\"a-button\"";
        htmx +="             href=\"" + headWeb + "/" + Years + "/file/" + Objpoint[x].ORDER + ".pdf\">Download</a>";
        htmx +="     </td>";
        
        var detial = "";
        detial +="     <td id=\"b-detail\" >";
        for(y in Objpoint[x].FUNCTION){
            if(y == 4){
                // detial +="<div class=\"dot\" id=\"dots" + x + "\">...</div>";
                detial +="<div class=\"more\" id=\"more"+ Years +""+ x + "\">";
                detial +="<div>";
                detial += Objpoint[x].FUNCTION[y];
                detial +="</div>";
            }
            else if(y > 4 && y == Objpoint[x].FUNCTION.length - 1){
                detial +="<div>";
                detial += Objpoint[x].FUNCTION[y];
                detial +="</div>";
                detial +="</div>";
                detial +="<a href=\"#view\" onclick=\"readMore("+ Years + x + ",0);\" id=\"myBtn"+ Years + x + "\">read more...</a>";
            }
            else{
                detial +="<div>";
                detial += Objpoint[x].FUNCTION[y];
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
    if(media_width < 900){
        document.getElementById('selest-filter').style.display = "none";
        document.getElementById('search-table').style.display = "none";
    }else{
        document.getElementById('selest-filter').style.display = "initial";
        document.getElementById('search-table').style.display = "initial";
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
    rawFile.open("GET", url, false);
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
      rawFile.open(method, URLLoad, false);
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
    var data = getjsonformhost('get', '/read/login?user=Suphot&pass=00000000', status);
    console.log(data);
    if(data.sData.status == "true"){
        window.open(data.sData.path);
    }
  }