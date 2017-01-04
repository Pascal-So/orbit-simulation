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

		var mag = Math.sqrt(re*re + im*im);
		var ang = Math.atan2(im, re);
		return new PolComplex(mag, ang);
	}
	this.exp = function(){
		var im = Math.sin(this.t) * this.r; // real and imaginary part of exponent
		var re = Math.cos(this.t) * this.r;

		return new PolComplex(Math.exp(re), im);
	}
}