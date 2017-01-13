function background_lines(ctx, width, height){

	var x_step = 80;
	var y_step = x_step;

	for(var x = Math.random()*x_step; x < width; x += x_step){
		var a = new Point(x, 0);
		var b = new Point(x, height);

		sandline(ctx, a, b, height);
	}
	for(var y = Math.random()*y_step; y < height; y+= y_step){
		var a = new Point(0, y);
		var b = new Point(width, y);

		sandline(ctx, a, b, width);
	}

}