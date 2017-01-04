function Point(x, y){
	this.x = x;
	this.y = y;
	this.length = function(){
		return Math.sqrt(this.x*this.x + this.y*this.y);
	}
}

function diff(a, b){
	return new Point(b.x-a.x, b.y-a.y);
}

function lerp(a, b, frac){
	return a*(1-frac) + b*frac;
}

function lerpPoint(a, b, frac){ // expects point objects
	return new Point(lerp(a.x, b.x, frac), lerp(a.y, b.y, frac));
}

function drawPixel(ctx, pt){
	ctx.fillRect(pt.x, pt.y, 1, 1);
}

function sandline(ctx, a, b){
	var res = diff(a, b).length() / 10;
	for(var i = 0; i < res; ++i){
		var frac = Math.random();
		drawpoint = lerpPoint(a, b, frac);
		drawPixel(ctx, drawpoint);
	}
}


function main(){
	var c = document.getElementById('canvas');
	if (c.getContext){
		var ctx = c.getContext("2d");
		


		window.addEventListener('resize', resizeCanvas, false);

		var interval;

	    function resizeCanvas() {
	    	if(interval){
	    		clearInterval(interval);
	    	}
	    	
	    	w = window.innerWidth;
	    	h = window.innerHeight;
	        c.width = w;
	        c.height = h;

	        ctx.lineWidth = 1;
			ctx.globalCompositeOperation = "souce-over";
			ctx.fillStyle = "black";
			ctx.strokeStyle = "rgba(10, 10, 10, 0.2)";
	        ctx.globalAlpha = 0.2;

	        A = new Point(w/3, h/2);
	        B = new Point(w/3*2, h/2);

		    interval = window.setInterval(draw, 10, ctx, w, h);
	    }
	    resizeCanvas();

	}else{
		console.log("Browser not supported.");
	}
}

var A, B;

function draw(ctx, width, height){
	sandline(ctx, A, B);
	
	A.x += Math.random()*2-1; //  -.-
	A.y += Math.random()*2-Math.random()*2; //  /.\
	B.x += Math.random()*2-0.9; // -.--
	B.y += Math.random()*2-0.9; // -.--
}


function press(ev){
	var kc = ev.keyCode;
	//console.log(kc, "pressed");
}

function release(ev){
	var kc = ev.keyCode;
	//console.log(kc, "released");;
}