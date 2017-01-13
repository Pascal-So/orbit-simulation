function Point(x, y){
	this.x = x;
	this.y = y;
	this.magnitude = function(){
		return Math.sqrt(this.sqmag());
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
	this.sqmag = function(){
		return this.x * this.x + this.y * this.y;
	}

	this.boxRemap = function(boxA, boxB){
		function remap(a_start, a_end, b_start, b_end, x){
			frac = (x-a_start)/(a_end-a_start);
			return b_start + frac * (b_end - b_start);
		}

		var new_x = remap(boxA.min_x, boxA.max_x, boxB.min_x, boxB.max_x, x);
		var new_y = remap(boxA.min_y, boxA.max_y, boxB.min_y, boxB.max_y, y);

		return new Point(new_x, new_y);
	}
}

function lerpPoint(a, b, frac){ // expects point objects
	return new Point(lerp(a.x, b.x, frac), lerp(a.y, b.y, frac));
}

function random_move(dist){
	var hd = dist/2;
	var dx = Math.random()*hd - Math.random()*hd;
	var dy = Math.random()*hd - Math.random()*hd;
	return new Point(dx, dy);
}