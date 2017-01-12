function lerp(a, b, frac){
	return a*(1-frac) + b*frac;
}


function drawPixel(ctx, pt, size){
	if(size == 1){
		ctx.fillRect(pt.x, pt.y, size, size); // no anti-aliasing
	}else{
		ctx.fillRect(pt.x - size/2, pt.y - size/2, size, size);
	}
}


function sandline(ctx, a, b, res){
	if(res == -1){
		res = a.sub(b).magnitude() / 2;
	}
	for(var i = 0; i < res; ++i){
		var frac = Math.random();
		drawpoint = lerpPoint(a, b, frac);
		//drawpoint.x = Math.floor(drawpoint.x);
		//drawpoint.y = Math.floor(drawpoint.y);
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

	    	planetSim(false, ctx, 0,0); // stop planets
	    	
	    	w = window.innerWidth;
	    	h = window.innerHeight;
	        c.width = w;
	        c.height = h;

	        ctx.lineWidth = 1;
			ctx.globalCompositeOperation = "souce-over";
			ctx.fillStyle = "black";
			ctx.strokeStyle = "rgba(10, 10, 10, 0.2)";
	        ctx.globalAlpha = 0.06;
	        //ctx.translate(w/2, h/2);


	        A = new Point(w/2, h/2);
	        Last = A;
	        V = new Point(0, 0);
	        Drag = A;
	        Drag.x+=20;

		    //interval = window.setInterval(draw, 1, ctx, w, h);
		    //drawComplex(ctx, w, h);
		    planetSim(true, ctx, w, h); // start planets

	    }
	    resizeCanvas();

	}else{
		console.log("Browser not supported.");
	}
}


function random_move(dist){
	var hd = dist/2;
	var dx = Math.random()*hd - Math.random()*hd;
	var dy = Math.random()*hd - Math.random()*hd;
	return new Point(dx, dy);
}

var A, Last, V;

var Drag;

function draw(ctx, width, height){
	V = V.add(random_move(0.9)).scale(0.985);
	var center = new Point(width/2, height/2);
	V = V.add(center.sub(A).scale(0.00001));
	console.log(V);
	A = A.add(V);
	sandline(ctx, Last, A, 5);
	Last = A;

	Drag = Drag.add(A.sub(Drag).scale(0.008));

	sandline(ctx, Drag, A, -1);
	
}


function press(ev){
	var kc = ev.keyCode;
	//console.log(kc, "pressed");
}

function release(ev){
	var kc = ev.keyCode;
	//console.log(kc, "released");;
}
