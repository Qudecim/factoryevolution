function worker_step() {
	//requestAnimationFrame(worker_step);
	
	postMessage("Hi ");
}

//worker_step();
setInterval(worker_step,1000/60);

