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

function lerpComplex(a, b, frac){
	return new Complex(lerp(a.re, b.re, frac), lerp(a.im, b.im, frac));	
}

function drawPixel(ctx, pt, size){
	ctx.fillRect(pt.x - size/2, pt.y - size/2, size, size);
}


function sandline(ctx, a, b){
	var res = diff(a, b).length() / 5;
	for(var i = 0; i < res; ++i){
		var frac = Math.random();
		drawpoint = lerpPoint(a, b, frac);
		drawPixel(ctx, drawpoint, 1);
	}
}

function complexToPoint(c, scale, width, height){
	var x = c.re * width/scale + width/2;
	var y = -c.im * height/scale + height/2;

	return new Point(x, y);
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
	        ctx.globalAlpha = 0.1;

	        A = new Point(w/3, h/2);
	        B = new Point(w/3*2, h/2);

		    //interval = window.setInterval(draw, 10, ctx, w, h);
		    drawComplex(ctx, w, h);
	    }
	    resizeCanvas();

	}else{
		console.log("Browser not supported.");
	}
}


function drawComplex(ctx, width, height){
	var offset = new Complex(0.3, 0.4409);
	var cPoints = [new Complex(0.3, 0.5)];
	for(var i = 0; i < 5000; i++){
		var newCPoint = cPoints[cPoints.length - 1].square();	
		cPoints.push(newCPoint.add(offset));
	}
	

	for(var i = 0; i < cPoints.length; i++){
		var elem = cPoints[i];
		//console.log(elem);
		drawPixel(ctx, complexToPoint(elem, 2, width, height), 1);

		if(i < cPoints.length-1){
			sandline(ctx, complexToPoint(elem, 2, width, height), complexToPoint(cPoints[i+1], 2, width, height));
		}
	}



	/*var res = 40;
	for(var i = 0; i < res; i++){
		var frac = i/res;
		var lc = lerpComplex(loga, logb, frac).exp();
		drawPixel(ctx, complexToPoint(lc, 1, width, height), 2);
	}
	for(var i = 0; i < res; i++){
		var frac = i/res;
		var lc = lerpComplex(logb, logc, frac).exp();
		drawPixel(ctx, complexToPoint(lc, 1, width, height), 2);
	}*/
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


