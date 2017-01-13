function background_lines(ctx, width, height){

	var x_step = 80;
	var y_step = x_step;

	for(var x = Math.random()*x_step; x < width; x += x_step){

		var start = Math.random()*height;
		var end = Math.random()*height;

		var a = new Point(x, start);
		var b = new Point(x, end);

		sandline(ctx, a, b, Math.abs(end-start)*2);
	}
	for(var y = Math.random()*y_step; y < height; y+= y_step){

		var start = Math.random()*width;
		var end = Math.random()*width;
		
		var a = new Point(start, y);
		var b = new Point(end, y);

		sandline(ctx, a, b, Math.abs(end-start)*4);
	}

}