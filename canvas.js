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

