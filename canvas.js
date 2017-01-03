
var Interval;

function main(){
	var c = document.getElementById('canvas');
	if (c.getContext){
		var ctx = c.getContext("2d");
		ctx.lineWidth = 1;
		ctx.globalAlpha = 0.1;
		ctx.globalCompositeOperation = "souce-over";

		window.addEventListener('resize', resizeCanvas, false);

	    function resizeCanvas() {
	    	if(Interval){
	    		clearInterval(Interval);
	    	}
	    	
	    	w = window.innerWidth;
	    	h = window.innerHeight;
	        c.width = w;
	        c.height = h;

		    drawStuff(ctx, w, h); 
	    }
	    resizeCanvas();

	}else{
		console.log("Browser not supported.");
	}
}

var PX, PY;

function drawStuff(ctx, width, height){
	ctx.fillStyle = "#222";
	ctx.strokeStyle = "rgba(10, 10, 10, 0.2)";

	PX = width/2;
	PY = height/2;

	Interval = window.setInterval(walk, 1, ctx, width, height);
	/*while(true){
		window.setTimeout(walk, 1, ctx, width, height);
	}*/

}



function walk(ctx, width, height){
	var range = 6;

	var dx = Math.random()*range-range/2;
	var dy = Math.random()*range-range/2;

	ctx.beginPath();
	ctx.moveTo(PX, PY);
	ctx.lineTo(PX+dx, PY+dy);
	ctx.stroke();

	PX = (PX+dx+width) % width;
	PY = (PY+dy+height) % height;
}

function press(ev){
	var kc = ev.keyCode;
	//console.log(kc, "pressed");
}

function release(ev){
	var kc = ev.keyCode;
	//console.log(kc, "released");;
}