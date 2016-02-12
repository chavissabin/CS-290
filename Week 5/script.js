function makeTable (row, col){	
	/*Create Table, Header, and Body*/
  var newTable = document.createElement("table");
	var newHeader = document.createElement("thead");
	var newBody = document.createElement("tBody");
  /*add rows and columns*/
  for(var i = 0; i < row; i++){
  	var newRow = document.createElement("tr");
    for(var j = 1; j < col+1; j++){
    	var newColumn = document.createElement("td");
      if(i==0){
      	newColumn.textContent = "Header " + j;
      }
      else{
      	newColumn.textContent = j + "," + i;
      }
      newRow.appendChild(newColumn);
    }
    /*Header row add "Header"*/
  	if(i==0){
    	newHeader.appendChild(newRow);
      var child = newHeader.children;
    }
    else{
    	newBody.appendChild(newRow);
      var child = newBody.children;
    }
  }
	/*Add Header and Body*/
	newTable.appendChild(newHeader);
	newTable.appendChild(newBody);
  return newTable;
}

function upClick(event){
    	console.log("clicked Up!");
      var row = markedCell.parentNode.rowIndex;
      var col = markedCell.cellIndex;
      console.log(row);
      if(row != 1)//last row
      {      
				markedCell.style.border = "";
      	markedCell = Table.rows[row-1].cells[col];
				markedCell.style.border = "solid";
      }
    
}

function downClick(event){
    	console.log("clicked Down!");
      var row = markedCell.parentNode.rowIndex;
      var col = markedCell.cellIndex;
      console.log(row);
      if(row != 3)//last row
      {      
				markedCell.style.border = "";
      	markedCell = Table.rows[row+1].cells[col];
				markedCell.style.border = "solid";
      }
}
function leftClick(event){
    	console.log("clicked Left!");
      if(markedCell.previousElementSibling != null){
				markedCell.style.border = "";
      	markedCell = markedCell.previousElementSibling;
				markedCell.style.border = "solid";
      }
    
}
function rightClick(event){
    	console.log("clicked Right!");
      if(markedCell.nextElementSibling != null){
				markedCell.style.border = "";
      	markedCell = markedCell.nextElementSibling;
				markedCell.style.border = "solid";
      }
    	//event.preventDefault();
    
}

function markCell(event){
    	console.log("Cell Marked!");
      markedCell.style.backgroundColor = "yellow";
    
}
/*Create Buttons*/
var ButtonUp = document.createElement("button");
var ButtonDown = document.createElement("button");
var ButtonLeft = document.createElement("button");
var ButtonRight = document.createElement("button");
var ButtonMarker = document.createElement("button");
ButtonUp.textContent = "Up";
ButtonDown.textContent = "Down";
ButtonLeft.textContent = "Left";
ButtonRight.textContent = "Right";
ButtonMarker.textContent = "Mark Cell";
/*Create Table*/
var Table = makeTable(4,4);
Table.border = "solid";
var markedCell = Table.rows[1].cells[0];
markedCell.style.border = "solid";

/*Add Events*/
ButtonUp.addEventListener("click", upClick);
ButtonDown.addEventListener("click", downClick);
ButtonLeft.addEventListener("click", leftClick);
ButtonRight.addEventListener("click", rightClick);
ButtonMarker.addEventListener("click", markCell);

/*Add table and buttons to body*/
document.body.appendChild(Table);
document.body.appendChild(ButtonUp);
document.body.appendChild(ButtonDown);
document.body.appendChild(ButtonLeft);
document.body.appendChild(ButtonRight);
document.body.appendChild(ButtonMarker);

