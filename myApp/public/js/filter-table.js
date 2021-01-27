function filterTable(event) {
    var filter = event.target.value.toUpperCase();
    var rows = document.querySelector("#myTable tbody").rows;
    var selectFilter = document.querySelector('#selest-filter').value;
    for (var i = 0; i < rows.length; i++) {
        var col0 = rows[i].cells[0].textContent.toUpperCase();
        var col2 = rows[i].cells[2].textContent.toUpperCase();
        var col3 = rows[i].cells[3].textContent.toUpperCase();
        var col4 = rows[i].cells[4].textContent.toUpperCase();
        var col5 = rows[i].cells[5].textContent.toUpperCase();
        var col7 = rows[i].cells[7].textContent.toUpperCase();
        if (col0.indexOf(filter) > -1 
         || (col2.indexOf(filter) > -1 && (selectFilter=="all" || selectFilter=="segment"))
         || (col3.indexOf(filter) > -1 && (selectFilter=="all" || selectFilter=="input"))
         || (col4.indexOf(filter) > -1 && (selectFilter=="all" || selectFilter=="output"))
         || (col5.indexOf(filter) > -1 && (selectFilter=="all" || selectFilter=="communicate"))
         || (col7.indexOf(filter) > -1 && (selectFilter=="all" || selectFilter=="detail"))
         ) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }      
    }
}
document.querySelector('#search-table').addEventListener('keyup', filterTable, false);

// Auto Hide
// var minimize_class = document.getElementById("minimize").style;
// console.log(minimize_class);
