function deepEqual(x, y){
	//are they both objects?
	if ((typeof x == "object" & x != null)  && (typeof y == "object" & y != null)) 
	{
		//are they equal?
		if(x == y){
			return true;
		}
		//are the properties the same?
		for (var index in x) {
			//are properties equal?
			if (y.hasOwnProperty(index)) {
				//return result of deepEqual
				return deepEqual(x[index], y[index]);
			} 
			else {
				return false; 
			}
		}
	}
	//they are both not objects
	//are they equal?
	else if (x === y){
		return true;
	}
	//otherwise, no other option
	return false;
}//deepEquals()

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true