var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res){
  res.render('home');
});

app.get('/Get',function(req,res){
  var params = [];
  var count = 0;
  var NANTest = 0;
  var highQty = 0;
  var lowQty = 10;
  var highItem = "";
  var lowItem = "";
  var response = "";
  var qtyNum = 0;
  for(var i in req.query){
  
	params.push({'type':i, 'qty':req.query[i]})
	qtyNum = parseInt(req.query[i]);
	
	if (isNaN(qtyNum)){
		NANTest = 1;
	}
	
	if(qtyNum > highQty){
		highQty = qtyNum;
		highItem = i;
	}
	else if(qtyNum < lowQty){
		lowQty = qtyNum;
		lowItem = i;
	}
	
	count = count +1;
	
	
  }
  if (NANTest == 1){
	rating = "One of the quantities is not a number. Please use numbers for quantity only";
  }
  else if(count < 1){
	rating = "You didn't enter any ingredients. Refer to the home page for instructions."
  }
  else{
	if(count > 10){//too many ingredients
		rating = "There are too many ingredients";
	}
	else if(count >= 5){//right amount of ingredients
		rating = "You have just the right amount of ingredients";
	}
	else//not enough ingredients
	{
		rating = "There are not enough ingredients";
	}
	
	if(highQty != 0){
		rating = rating + ", too much " + highItem;
	}
	
	if(lowQty != 0){
		rating = rating + " and not enough " + lowItem;
	}
	
	rating = rating + ". But otherwise Good. ;)";
  }
  var context = {};
  context.dataList = params;
  context.rating = rating;
  res.render('Get', context);
});

app.get('/Post',function(req,res){
  res.render('Post');
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
