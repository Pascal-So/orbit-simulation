// complex number in the form a + bi, as opposed to polar coordinates

function Complex(re, im){
	this.re = re;
	this.im = im;
	
	this.add = function(c){
		return new Complex(this.re + c.re, this.im + c.im);
	}
	this.scale = function(fac){
		return new Complex(this.re*fac, this.im*fac);
	}
	this.magnitude = function(){
		return Math.sqrt(this.re*this.re + this.im*this.im);
	}
	this.square = function(){
		return new Complex(this.re*this.re - this.im*this.im, this.re*this.im*2);
	}
	this.angle = function(){
		return Math.atan2(this.im, this.re);
	}
	this.exp = function(){
		var r = Math.exp(this.re);
		var t = this.im;

		// note that exp of a cartesian complex returns a polar complex
		return new PolComplex(r, t);
	}
	this.toPoint = function(scale){
		var x = this.re * scale;
		var y = this.im * scale;

		return new Point(x, y);
	}
}

function lerpComplex(a, b, frac){
	return new Complex(lerp(a.re, b.re, frac), lerp(a.im, b.im, frac));	
}