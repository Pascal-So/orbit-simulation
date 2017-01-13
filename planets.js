function planetSim(canvas, ctx, width, height, nr_planets, background_orbits, background_area_shading, shading_resolution){

	// [Point] -> [Point] -> [Point]
	function mAdd(p1, p2){
		// add arrays of points pair wise
		var n = p1.length;
		var out = [];
		for(var i = 0; i < n; i++){
			out[i] = p1[i].add(p2[i]);
		}
		return out;
	}

	// [Point] -> Double -> [Point]
	function mScale(p1, r){
		// s
		var n = p1.length;
		var out = [];
		for(var i = 0; i < n; i++){
			out[i] = p1[i].scale(r);
		}
		return out;
	}

	// Point -> Point -> Double -> Point
	function compAcc(p1, p2, mass2){
		// acceleration on p1 towards p2
		var d = p2.sub(p1);
		var r = d.magnitude();
		var fac = G/(r*r*r) * mass2;
		return d.scale(fac);
	}

	// [Point] -> [Point]
	function computeAccelerations(p){
		var n = p.length;
		var out = [];

		for(var i = 0; i < n; i++){
			out[i] = new Point(0, 0);
			for(var j = 0; j < n; j++){
				if(i!=j){
					out[i] = out[i].add(compAcc(p[i], p[j], masses[j]));
				}
			}
		}
		return out;
	}

	// [Point] -> [Point] -> ([Point], [Point])
	function rungeKutta(pos, vel){
		var kv_1 = computeAccelerations(pos);
		var kr_1 = vel;

		var kv_2 = computeAccelerations(mAdd(pos, mScale(kr_1, DT/2)));
		var kr_2 = mAdd(vel, mScale(kv_1, DT/2));

		var kv_3 = computeAccelerations(mAdd(pos, mScale(kr_2, DT/2)));
		var kr_3 = mAdd(vel, mScale(kv_2, DT/2));

		var kv_4 = computeAccelerations(mAdd(pos, mScale(kr_3, DT)));
		var kr_4 = mAdd(vel, mScale(kv_3, DT));

		var velSum = mAdd(kv_1, mAdd(mScale(kv_2, 2), mAdd(mScale(kv_3, 2), kv_4)));
		var newVel = mAdd(vel, mScale(velSum, DT/6));

		var posSum = mAdd(kr_1, mAdd(mScale(kr_2, 2), mAdd(mScale(kr_3, 2), kr_4)));
		var newPos = mAdd(pos, mScale(posSum, DT/6));

		return {pos: newPos, vel: newVel};
	}

	/*
	// [Point] -> [Point] -> ([Point], [Point])
	function midpointMethod(pos, vel, mass){
		var midpoint = mAdd(pos, mScale(vel, DT/2));
		var midAcc = computeAccelerations(midpoint, mass);
		
		var newVel = mAdd(vel, mScale(midAcc, DT));
		var newPos = mAdd(pos, mScale(newVel, DT));
		return {pos: newPos, vel: newVel};
	}

	// [Point] -> [Point] -> ([Point], [Point])
	function euler(pos, vel, mass){
		var acc = computeAccelerations(pos, mass);
		var newVel = mAdd(vel, mScale(acc, DT));
		var newPos = mAdd(pos, mScale(vel, DT));
		return {pos: newPos, vel: newVel};
	}

	
	*/

	// Int -> Double -> Double -> Double -> (changes: `positions`, `velocities`, `masses`)
	function initVals(n, posRange, velRange, massRange){
		for(var i = 0; i < n; i ++){
			positions[i] = random_move(posRange);
			velocities[i] = random_move(velRange);
			masses[i] = Math.random(massRange);
		}
	}

	// [Point] -> Bool
	function stopConditionReached(positions){
		var n = 3;//positions.length;
		for(var i = 0; i < n; i++){
			if(positions[i].sqmag() > 400){
				return true;
			}
		}
		return false;
	}

	// [Point] -> Double -> Double -> Double -> [Point]
	function toScreenSpace(positions, radius_visible, width, height){
		var scale = Math.min(width, height)/2/radius_visible;
		var center = new Point(width/2, height/2);

		var out = positions.map(function(p){
			return p.scale(scale).add(center);
		});
		return out;
	}
	
	function weightedSandline(ctx, a, b, res){
		if(res == -1){
			res = a.sub(b).magnitude() / 2;
		}
		for(var i = 0; i < res; ++i){
			var frac = Math.random();
			frac = 1-frac*frac;
			drawpoint = lerpPoint(a, b, frac);
			//drawpoint.x = Math.floor(drawpoint.x); // uncomment this to disable AA
			//drawpoint.y = Math.floor(drawpoint.y);
			drawPixel(ctx, drawpoint, 1);
		}
	}

	// Context -> [Point] -> Double -> Double -> IO()
	function drawPlanets(ctx, positions, width, height){
		var screenSpace = toScreenSpace(positions, 10, width, height);


		if(background_area_shading && NR_PLANETS > 4){
			weightedSandline(ctx, screenSpace[4], screenSpace[3], shading_resolution/20);
		}

		if(background_orbits){
			screenSpace.slice(2).map(function(p){
				drawPixel(ctx, p, 1);
			});
		}
	}

	// [Point] -> (changes: `stored`)
	function storePlanetPositions(positions){
		// has the side effect of storing pairs in the array `stored`.
		// if the simulation finishes without breaking the conditioins,
		// these will be drawn on to the canvas. Stroring them first has
		// the advantage that we can adjust the scale to the bounding box
		// later on.

		stored.push([positions[1], positions[2]]);
	}

	function tick(ctx, width, height){
		var newState = rungeKutta(positions, velocities, masses);
		positions = newState.pos;
		velocities = newState.vel;
		drawPlanets(ctx, positions, width, height);
		storePlanetPositions(positions);
	}

	


	
	function getBoundingBox(stored){
		var min_x = 100, max_x = -100, min_y = 100, max_y = -100;

		var n = stored.length;
		for(var i = 0; i < n; i++){
			for(var j = 0; j < 2; j ++){
				if(stored[i][j].x < min_x){
					min_x = stored[i][j].x;
				}
				if(stored[i][j].x > max_x){
					max_x = stored[i][j].x;
				}
				if(stored[i][j].y < min_y){
					min_y = stored[i][j].y;
				}
				if(stored[i][j].y > max_y){
					max_y = stored[i][j].y;
				}
			}
		}

		return {min_x: min_x, max_x: max_x, min_y: min_y, max_y: max_y};
	}

	function boxPadding(box, frac){
		var x_width = box.max_x - box.min_x;
		var y_width = box.max_y - box.min_y;

		var x_padding = x_width * frac;
		var y_padding = y_width * frac;

		box.max_x += x_padding;
		box.min_x -= x_padding;
		box.max_y += y_padding;
		box.min_y -= y_padding;

		return box;
	}

	function boxAspect(box){
		var dx = box.max_x - box.min_x;
		var dy = box.max_y - box.min_y;
		return dx/dy;
	}

	function boxToWindowCoords(box, width, height, stored){
		// clip window aspect ratio
		var w_s_x = 0;
		var w_e_x = width;
		var w_s_y = 0;
		var w_e_y = height;

		var simAspect = boxAspect(box);
		var windowAspect = width/height;
		if(simAspect < windowAspect){
			// adjust x of windowAspect to fit simAspect
			var contractionFac = 1 - (simAspect / windowAspect);
			var halfContractionLength = width * contractionFac / 2;
			w_s_x += halfContractionLength;
			w_e_x -= halfContractionLength;
		}else{
			// adjust y of windowAspect to fit simAspect
			var contractionFac = 1 - (windowAspect / simAspect);
			var halfContractionLength = width * contractionFac / 2;
			w_s_y += halfContractionLength;
			w_e_y -= halfContractionLength;
		}

		var windowBox = {min_x: w_s_x, max_x: w_e_x, min_y: w_s_y, max_y: w_e_y};

		// remap array of positions to screen space (aspect preserving)
		var n = stored.length;
		var out = [];
		for(var i = 0; i < n; i++){
			var curr = [];
			for(var j = 0; j < 2; j++){
				curr.push(stored[i][j].boxRemap(box, windowBox));
			}
			out.push(curr);
		}
		return out;
	}
	
	function drawStored(ctx, windowCoordsStored){
		var n = windowCoordsStored.length;
		for(var i = 0; i < n; i ++){
			var a = windowCoordsStored[i][0];
			var b = windowCoordsStored[i][1];
			weightedSandline(ctx, a, b, shading_resolution);
		}
	}




	function runSimulation(){
		stored = [];
		running = false;
		initVals(NR_PLANETS, 20, 60, 160);

		masses[0] = 500;
		positions[0] = new Point(0, 0);
		velocities[0] = new Point(0, 0);

		masses[1] = 3;
		positions[1] = new Point(10, 0);
		velocities[1] = new Point(0, 10.02);

		for(var i = 0; i < 7000; i ++){
			tick(ctx, width, height);
			if(stopConditionReached(positions)){
				if(i < 2000){
					// restart simulation
					running = true;
					log("Detected unstable orbit, changing velocities");

				} // otherwise, use up to this point.

				break;
			}
		}

		if(running){
			// need this recursive hack, otherwise the messages don't show up.
			setTimeout(runSimulation, 20);
		}else{
			log("Simulation done, start processing");
			setTimeout(processing, 20);
		}
	}

	function processing(){
		var box = boxPadding(getBoundingBox(stored), 0.1);
		var windowCoords = boxToWindowCoords(box, width, height, stored);
		drawStored(ctx, windowCoords);
		log("Rendering done");
		canvas.style.display = "block";

		setTimeout(function(){rendering = false;}, 50);
	}


	// [[Point]]
	var stored = [];

	var positions = [];
	var velocities = [];
	var masses = [];

	var G = 10;
	var DT = 0.0002;

	var NR_PLANETS = Math.max(3, parseInt(nr_planets));

	var running = true;

	setTimeout(runSimulation, 20);
	
}