function planetSim(run, ctx, width, height){
	var timer;
	if(run === false){
		clearInterval(timer);
		return;
	}



	function mAdd(p1, p2){
		var n = p1.length;
		var out = [];
		for(var i = 0; i < n; i++){
			out[i] = p1[i].add(p2[i]);
		}
		return out;
	}
	function mScale(p1, r){
		var n = p1.length;
		var out = [];
		for(var i = 0; i < n; i++){
			out[i] = p1[i].scale(r);
		}
		return out;
	}

	function compAcc(p1, p2, mass2){
		// acceleration on p1 towards p2
		var d = p2.sub(p1);
		var r = d.magnitude();
		var fac = G/(r*r*r) * mass2;
		return d.scale(fac);
	}

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

	function midpointMethod(pos, vel, mass){
		var midpoint = mAdd(pos, mScale(vel, DT/2));
		var midAcc = computeAccelerations(midpoint, mass);
		
		var newVel = mAdd(vel, mScale(midAcc, DT));
		var newPos = mAdd(pos, mScale(newVel, DT));
		return {pos: newPos, vel: newVel};
	}

	function euler(pos, vel, mass){
		var acc = computeAccelerations(pos, mass);
		var newVel = mAdd(vel, mScale(acc, DT));
		var newPos = mAdd(pos, mScale(vel, DT));
		return {pos: newPos, vel: newVel};
	}

	

	function toScreenSpace(positions, radius_visible, width, height){
		var scale = Math.min(width, height)/2/radius_visible;
		var center = new Point(width/2, height/2);

		var out = positions.map(function(p){
			return p.scale(scale).add(center);
		});
		return out;
	}

	function drawPlanets(ctx, positions, width, height){
		var screenSpace = toScreenSpace(positions, 10, width, height);

		sandline(ctx, screenSpace[1], screenSpace[6], 100);

		screenSpace.map(function(p){
			drawPixel(ctx, p, 1);
		});
	}

	function initVals(n, posRange, velRange, massRange){
		for(var i = 0; i < n; i ++){
			positions[i] = random_move(posRange);
			velocities[i] = random_move(velRange);
			masses[i] = Math.random(massRange);
		}
	}

	function tick(ctx, width, height){
		
		var newState = rungeKutta(positions, velocities, masses);
		positions = newState.pos;
		velocities = newState.vel;
		drawPlanets(ctx, positions, width, height);
	}

	var positions = [];
	var velocities = [];
	var masses = [];

	var G = 10;
	var DT = 0.0007;
	initVals(10, 20, 30, 10);

	masses[0] = 500;
	positions[0] = new Point(0, 0);
	velocities[0] = new Point(0, 0);


	masses[1] = 3;
	positions[1] = new Point(10, 0);
	velocities[1] = new Point(0, 10.02);
	/*
	masses[2] = 0.1;
	positions[2] = new Point(3, 0);
	velocities[2] = new Point(0, 150);

	masses[3] = 50;
	positions[3] = new Point(-2, 3);
	velocities[3] = new Point(0, 10);
	*/

	timer = setInterval(tick, 1, ctx, width, height);


	

}