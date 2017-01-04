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
	this.log = function(){
		var ang = this.angle();
		var mag = this.magnitude();
		return new Complex(Math.log(mag), ang);
	}
	this.exp = function(){
		var circ = new Complex(Math.cos(this.im), Math.sin(this.im));
		return circ.scale(Math.exp(this.re));
	}
}