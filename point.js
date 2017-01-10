function Point(x, y){
	this.x = x;
	this.y = y;
	this.length = function(){
		return Math.sqrt(this.x*this.x + this.y*this.y);
	}
	this.scale = function(r){
		return new Point(this.x * r, this.y * r);
	}
	this.sub = function(p){
		return new Point(this.x - p.x, this.y - p.y);
	}
	this.add = function(p){
		return new Point(this.x + p.x, this.y + p.y);	
	}
}

function lerpPoint(a, b, frac){ // expects point objects
	return new Point(lerp(a.x, b.x, frac), lerp(a.y, b.y, frac));
}