var step_time;
var step_fps = new Date().getTime();
var active_page = true;

$(function() {

positionsUi = new PositionsUI();
loaderUi = new LoaderUI();
game = new Game();
map = new Map();
control = new Controls();
build = new Build();
general = new General();
ui = new UI();


control.resize();

game.load();

window.onfocus = function(){ active_page = true; }
window.onblur = function(){ active_page = false; } 

main_step();

setInterval(game.save,30000);

});

function step() {
    if (game.pause) {
        return;
    }
        
    let now = new Date().getTime(),
        dt = now - (step_time || now);

    let fps = now - step_fps;
    if (fps < 1000) {
        game._fps++;
    } else {
        step_fps = now;
        game.oneSecondLogic();
        
        if (game._fps < 50) {
            game.canvas.width = game.canvas.width;
        }
        game._fps = 0;
        
        
    }
    
    step_time = now;
    
    game.deltaTime = dt;
    
    game.draw();
	
}


function main_step() {
	requestAnimationFrame(main_step);
	if (active_page) {
		step();
	}
}


if (true) {
var checkStatus;
var element = new Image();
Object.defineProperty(element, 'id', {
  get:function() {
    checkStatus='on';
    throw   new Error("");
  }
});


setInterval(function() {
    checkStatus = 'off';
    console.dir(element);
    if (checkStatus == 'on') {
        game.pause = true;
        $('body').html('');
    }
    console.clear();
}, 1000);
}


var worker = new Worker('javascript/worker.js');
worker.onmessage = function (oEvent) {
	if (!active_page) {
		step();
	}
};
