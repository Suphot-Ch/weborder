
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc"; 
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount ++;      
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
  var dSort = [0,0,0,0,0];
  var dimg = ['a-model','a-segment','a-input','a-output','a-comm'];
  var img_dw = `<img src="./images/2x/round_arrow_drop_down_white_18dp.png">`;
  var img_up = `<img src="./images/2x/round_arrow_drop_up_white_18dp.png">`;
  const set_sort = (sort, data) => {
    //   console.log("sort : " + sort + ", data : " + data);
      for(x in dSort){
          if(sort != x){
              dSort[x] = 0;
              document.getElementById(dimg[x]).innerHTML = "";
          }
          else {
              dSort[x] = data;
              if(data == 1)
                  document.getElementById(dimg[x]).innerHTML = img_dw;
              else
                  document.getElementById(dimg[x]).innerHTML = img_up;
          }
      }
  }
  const get_sort = (sort) => {
      return dSort[sort];
  }
  document.querySelector('#th-model').addEventListener('click', function(){
      if(get_sort(0) != 1) {
          set_sort(0, 1);
      }
      else {
          set_sort(0, 2);
      }
  }, false);
  document.querySelector('#th-segment').addEventListener('click', function(){
      if(get_sort(1) != 1) {
          set_sort(1, 1);
      }
      else {
          set_sort(1, 2);
      }
  }, false);
  document.querySelector('#th-input').addEventListener('click', function(){
      if(get_sort(2) != 1) {
          set_sort(2, 1);
      }
      else {
          set_sort(2, 2);
      }
  }, false);
  document.querySelector('#th-output').addEventListener('click', function(){
      if(get_sort(3) != 1) {
          set_sort(3, 1);
      }
      else {
          set_sort(3, 2);
      }
  }, false);
  document.querySelector('#th-comm').addEventListener('click', function(){
      if(get_sort(4) != 1) {
          set_sort(4, 1);
      }
      else {
          set_sort(4, 2);
      }
  }, false);