let get_order           = document.querySelector('#ip-order');
let get_keyword         = document.querySelector('#ip-keyword');
let get_display_type    = document.querySelector('#ip-display-type');
let get_display_seg     = document.querySelector('#ip-display-seg-size');
let get_display_matric  = document.querySelector('#ip-display-matric-size');
let get_display_other   = document.querySelector('#ip-display-other');
let get_display_type_2  = document.querySelector('#ip-display-type-2');
let get_display_seg_2   = document.querySelector('#ip-display-seg-size-2');
let get_display_matric_2= document.querySelector('#ip-display-matric-size-2');
let get_display_other_2 = document.querySelector('#ip-display-other-2');
let get_input_type      = document.querySelector('#ip-input');
let get_input_other     = document.querySelector('#ip-input-other');
let get_input_ch        = document.querySelector('#ip-input-ch');
let get_output_type     = document.querySelector('#ip-output');
let get_output_other    = document.querySelector('#ip-output-other');
let get_output_ch       = document.querySelector('#ip-output-ch');
let get_comm_type       = document.querySelector('#ip-comm');
let get_comm_other      = document.querySelector('#ip-comm-other');
let get_comm_ch         = document.querySelector('#ip-comm-ch');
let get_supply_type     = document.querySelector('#ip-supply');
let get_supply_other    = document.querySelector('#ip-supply-other');
let get_source          = document.querySelector('#ip-source');
let get_source_other    = document.querySelector('#ip-source-other');
let get_function        = document.querySelector('#ip-function');
let get_date            = document.querySelector('#ip-date');
let border_error    = '3px solid red';

let div_order   = document.querySelector('#div-order');
let div_keyword   = document.querySelector('#div-keyword');
let div_display   = document.querySelector('#div-display');
let div_input   = document.querySelector('#div-input');
let div_output   = document.querySelector('#div-output');
let div_comm   = document.querySelector('#div-comm');
let div_supply   = document.querySelector('#div-supply');
let div_source   = document.querySelector('#div-source');
let div_function   = document.querySelector('#div-function');
let div_date   = document.querySelector('#div-date');
let div_size   = document.querySelector('#div-size');
let div_price   = document.querySelector('#div-price');
let div_sale   = document.querySelector('#div-sale');

const getData = () => {
    var lines = get_function.value.split("\n");
    var get_display_size;
    var display_type2 = "", display_size2 = "", display_other2 = "";
    if(get_display_type_2.value != "-"){
        display_type2 = " / " + get_display_type_2.value;
        if(get_display_type_2.value == '7 Segment')
            display_size2 =  " / " + get_display_seg_2.value;
        else
            display_size2 =  " / " + get_display_matric_2.value;
        display_other2 =  " / " + get_display_other_2.value;
    }
    if(get_display_type.value == '7 Segment')
        get_display_size = get_display_seg;
    else
        get_display_size = get_display_matric;
    
    var json = {
        ORDER : get_order.value,
        KEYWORD : get_keyword.value,
        DISPLAY : {
            TYPE : get_display_type.value + display_type2,
            SIZE : get_display_size.value + display_size2,
            OTHER : get_display_other.value + display_other2
        },
        INPUT : {
            TYPE : get_input_type.value,
            OTHER : get_input_other.value,
            CHANNEL : get_input_ch.value,
        },
        OUTPUT : {
            TYPE : get_output_type.value,
            OTHER : get_output_other.value,
            CHANNEL : get_output_ch.value,
        },
        COMMUNICATION : {
            TYPE : get_comm_type.value,
            OTHER : get_comm_other.value,
            CHANNEL : get_comm_ch.value,
        },
        SUPPLY : {
            TYPE : get_supply_type.value,
            OTHER : get_supply_other.value
        },
        SOURCES : {
            TYPE : get_source.value,
            OTHER : get_source_other.value
        },
        FUNCTION : lines,
        BODYSIZE : document.querySelector('#ip-size-w').value + "W x "
                +  document.querySelector('#ip-size-h').value + "H x "
                +  document.querySelector('#ip-size-d').value + "D",
        DATE : get_date.value,
        SALE : {
            NAME : document.querySelector('#ip-sale-name').value,
            BRANCH : document.querySelector('#ip-sale-branch').value,
            CALL : document.querySelector('#ip-sale-call').value,
            EMAIL : document.querySelector('#ip-sale-email').value,
            CUSTOMER : document.querySelector('#ip-sale-cumtomer').value
        }
    };
    return json;
}
const checkBlank = (id, text, out) => {
    if(id.value == text){
        out.style.border= border_error;
        return 1;
    }
}
document.querySelector('#btn-submit-add').addEventListener('click', function(){
    var error = 0;
    console.log('#btn-submit-add : ' + "click");
    error += checkBlank(get_order, "", div_order);
    error += checkBlank(get_keyword, "", div_keyword);
    error += checkBlank(get_display_type, "-", div_display);
    if(get_input_type.value != "-"){
        error += checkBlank(get_input_ch, "", div_input);
    }
    if(get_output_type.value != "-"){
        error += checkBlank(get_output_type, "", div_output);
    }
    if(get_comm_type.value != "-"){
        error += checkBlank(get_comm_ch, "", div_comm);
    }
    error += checkBlank(get_date, "", div_date);
    console.log(error);
    if(error > 0)
    {
    }
    else{
        var json = getData();
        console.log(json);
        var date = new Date(document.querySelector('#ip-date').value);
        console.log(date);
        var year = date.getFullYear();
        var html = '/add/save?json='  + JSON.stringify(json);
        html += '&year=' + year;
        var req = html2json('get', html);
        document.querySelector('#alarm').innerHTML = req.html;
    }
});

const html2json = (method, URLLoad, status) => {
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