// complex number in polar coordinates. Doesn't map angles to -pi, pi

function PolComplex(r, t){
	this.r = r; // radius
	this.t = t; // theta
	
	this.add = function(c){
		var r1 = this.r;
		var r2 = c.r;
		var alpha = c.t - this.t;

		var a = r1 + r2 * Math.cos(alpha);
		var b = r2 * Math.sin(alpha);
		var r = Math.sqrt(a*a + b*b);

		var dt = Math.atan2(b, a);

		return new PolComplex(r, this.t + dt);
	}
	this.scale = function(fac){
		return new PolComplex(this.r*fac, this.t);
	}
	this.square = function(){
		return new PolComplex(this.r * this.r, this.t * 2);
	}
	this.log = function(){
		var re = Math.log(this.r); // real and imaginary part of exponent
		var im = this.t;

		// note that log of a polar complex returns a cartesian complex
		return new Complex(re, im);
	}
	this.toCartesian = function(){
		var re = this.r * Math.cos(this.t);
		var im = this.r * Math.sin(this.t);

		return new Complex(re, im);
	}
	this.toPoint = function(scale){
		return this.toCartesian().toPoint(scale);
	}

}