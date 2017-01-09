
function lerp(a, b, frac){
	return a*(1-frac) + b*frac;
}





function drawPixel(ctx, pt, size){
	ctx.fillRect(pt.x - size/2, pt.y - size/2, size, size);
}


function sandline(ctx, a, b){
	var res = a.sub(b).length() / 5;
	for(var i = 0; i < res; ++i){
		var frac = Math.random();
		drawpoint = lerpPoint(a, b, frac);
		drawPixel(ctx, drawpoint, 1);
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
	        ctx.globalAlpha = 0.1;
	        ctx.translate(w/2, h/2);


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

function dC(ctx, c, width, height){
	drawPixel(ctx, c.toPoint(width/3), 2);
}

function squareTrail(ctx, c, width, height){
	var offset = new PolComplex(0.7, 2.6);
	c = c.square().add(offset);
	c = c.square().add(offset);


	var d = c.square();

	var logc = c.log();
	var logd = d.log();
	//logd.im += Math.PI *2;

	

	var res = 1000;
	for(var i = 0; i < res; i++){
		var frac = i/res;
		var lc = lerpComplex(logc, logd, frac).exp().add(offset.scale(i/res));
		dC(ctx, lc, width, height);
	}
}

function drawIters(ctx, c, width, height){
	var iters = 5000;
	var offset = c;//new PolComplex(0.26, 0);
	c = c.square().add(offset);
	for(var i = 0; i < iters; i++){
		c = c.square().add(offset);
		dC(ctx, c, width, height);
		
		if(c.r > 4){
			break;
		}
	}
}

function timeToEscape(c){
	var iters = 400;
	var offset = c;
	c = c.square().add(offset);
	for(var i = 0; i < iters; i++){
		c = c.square().add(offset);
		if(c.r > 4){
			return i;
		}
	}
	return iters;
}

function mandelbrotPoint(ctx, c, width, height){
	var tte = timeToEscape(c);

	ctx.globalAlpha = Math.max(0, 1-tte/65);
	dC(ctx, c, width, height);
}

function mandelbrot(ctx, width, height){
	for(var x = -1.5; x < 1.5; x += 0.005){
		for(var y = -0.8; y < 0.8; y+=0.005){
			mandelbrotPoint(ctx, new Complex(x, y).toPolar(), width, height);
		}
	}
}


function drawComplex(ctx, width, height){
	/*var offset = new Complex(0.3, 0.4409);
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
	}*/

	var a = new Complex(0.4, 0.3);
	
	/*for(var i = 0; i < 6000; i++){
		var c = new PolComplex(Math.random()*2, Math.random()*6.283);
		//squareTrail(ctx, c, width, height);
		//drawIters(ctx, c, width, height);
		

	}*/
	mandelbrot(ctx, width, height);

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


