/*Assignment #6*/
/*Build Response Table*/
function buildTable(data,resForm){
	
	//make response form visible
	resForm.style.display = "inline";
	
	/*setup table*/
	var newTable = document.createElement("table");
	var newBody = document.createElement("tBody");
	var newHead = document.createElement("tHead");
	
	var cityRow	= document.createElement("tr");
	var cityCell = document.createElement("td");
	var cityCell2 = document.createElement("td");
			
	cityCell.textContent = "City: ";
	cityCell2.textContent = data.name;
	
	
	/*City Name*/
	cityRow.appendChild(cityCell);
	cityRow.appendChild(cityCell2);
	newHead.appendChild(cityRow);
	
	/*main Data*/
	for (var key in data.main) {
		var mainRow	= document.createElement("tr");
		var mainCell = document.createElement("td");
		var mainCell2 = document.createElement("td");
		
		mainCell.textContent = key;
		mainCell2.textContent = data.main[key];
		
		mainRow.appendChild(mainCell);
		mainRow.appendChild(mainCell2);		
		newBody.appendChild(mainRow);
	}
	console.log(data);		
	
	newTable.appendChild(newHead);
	newTable.appendChild(newBody);
	
	return(newTable);
}
/*Submit*/
function submit(event){
	var textEntry = document.getElementById('inputbox').value;
	var req = new XMLHttpRequest();
	var resForm = document.getElementById("responseForm");
	
	/*We don't know if the data entered is valid or not. for now, make response form invisible*/
	resForm.style.display = "none";
	if(resForm.firstChild){
		resForm.removeChild(resForm.firstChild);//remove any previous tables
	}
	/*Check if entry is not a number (not zip code)*/
	if(textEntry != ""){
		if (isNaN(textEntry)){
			/*Get weather by city*/
			req.open("GET", 'http://api.openweathermap.org/data/2.5/weather?q=' + textEntry + ',us&units=imperial&appid=' + key, true);
		}
		else{//Number
				/*Get weather by zip code*/
			req.open("GET", 'http://api.openweathermap.org/data/2.5/weather?zip=' + textEntry + ',us&units=imperial&appid=' + key, true);
		}
		
		
		req.addEventListener('load',function(){
			if((req.status >= 200 && req.status < 400) || (req.cod >= 200 && req.cod < 400 )){
				var response = JSON.parse(req.responseText);
				
				if(response.cod >=200 && response.cod < 400){
				/*add form here*/
					var Weather = buildTable(response, resForm);
					resForm.appendChild(Weather);
				}
				else{
					alert(response.message);
				}
			}
			else{
				alert(request.statusText + "Error");
				return;
			}
		});
		req.send(null);
				
	}
	
}

/*Get Key*/
var key  = "4463921e1800235230a5d5ee7b129ccb";

/*add button*/
var submitButton = document.getElementById("submit");

/*Add Events*/
submitButton.addEventListener("click", submit);

