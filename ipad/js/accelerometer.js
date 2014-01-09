(function(document)
{
	window.accelerometer = window.Accelerometer || {};
	var ball;
	var x = 310, y = 400,
		vx = 0, vy = 0,
		ax = 0, ay = 0;

	accelerometer.initialize = function()
	{
		ball = document.getElementById('ball');
	
		window.ondevicemotion = function(e) {
			ax = e.accelerationIncludingGravity.x * 10;
			ay = e.accelerationIncludingGravity.y * 10;
	
			ball.style.top = y+'px';
			ball.style.left = x+'px';
		}
		
		setInterval( function() {
			accelerometer.interval();
		}, 25);
	};
	
	accelerometer.interval = function()
	{
		var landscapeOrientation = window.innerWidth/window.innerHeight > 1;
		if (landscapeOrientation) {
			vx = vx + ay;
			vy = vy + ax;
		} else {
			vy = vy - ay;
			vx = vx + ax;
		}
		vx = vx * 0.9807;
		vy = vy * 0.9807;
		y = parseInt(y + vy / 50);
		x = parseInt(x + vx / 50);
		
		accelerometer.boundingBoxCheck();
		
		ball.style.top = y + "px";
		ball.style.left = x + "px";
	}
	
	accelerometer.boundingBoxCheck = function()
	{
		if (x < 0) {
			x = 0;
			vx = -vx;
		}
	
		if (y < 0) {
			y = 0;
			vy = -vy;
		}
	
		if (x > document.documentElement.clientWidth-128) {
			x = document.documentElement.clientWidth-128;
			vx = -vx;
		}
	
		if (y > document.documentElement.clientHeight-128) {
			y = document.documentElement.clientHeight-128;
			vy = -vy;
		}
	};
	
})(document);