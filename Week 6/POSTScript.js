/*Assignment #6*/
/*Build Response Table*/
function showResponse(data,resForm){
	
	//make response form visible
	var newData = JSON.parse(data);
	console.log(newData);
	resForm.style.display = "inline";
	/*Fill in data*/
	for(var key in newData)
	{
		var label = document.createElement("label");
		label.textContent = key + ":  " + newData[key];
		var br = document.createElement("br");
		resForm.appendChild(label);
		resForm.appendChild(br);
	}
	
	/*add image*/
	var image = document.createElement("img");
	image.src = "body.jpg";
	resForm.appendChild(image);

}
/*Submit*/
function submit(event){

	/*grap data into payload*/
	var payload = {
	name:document.getElementById('name').value,
	personality:document.getElementById('personality').value,
	species:document.getElementById('species').value,
	homeWorld:document.getElementById('homeWorld').value,
	skills:document.getElementById('skills').value,
	allegiance:document.getElementById('allegiance').value,
	background:document.getElementById('backgroundInput').value
	};
	
	var req = new XMLHttpRequest();
	var resForm = document.getElementById("responseForm");
	while (resForm.firstChild) {
    resForm.removeChild(resForm.firstChild);
	}

	/*We don't know if the data entered is valid or not. for now, make response form invisible*/
	resForm.style.display = "none";
	//for loop to verify data;
	
	req.open("POST", "http://httpbin.org/post", true);
			
	req.setRequestHeader('Content-Type', 'application/json');	
	req.addEventListener('load',function(){
		if((req.status >= 200 && req.status < 400) || (req.cod >= 200 && req.cod < 400 )){
			var response = JSON.parse(req.responseText);
				
				showResponse(response.data, resForm);
		}
		else{
			alert(request.statusText + "Error");
			return;
		}
	});
	req.send(JSON.stringify(payload));
	event.preventDefault();			

	
}

/*add button*/
var submitButton = document.getElementById("submit");

/*Add Events*/
submitButton.addEventListener("click", submit);

