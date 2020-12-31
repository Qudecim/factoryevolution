class Controls {
	button = {
		up:false,
		down:false,
		left:false,
		right:false,
	};
	

    mouse = {
        x:0,
        y:0,
        gX : 0,
        gY:0,
        click: {
            active:false,
            gX:0,
            gY:0,
        }
    }
	
	constructor() {
		//document.addEventListener('keydown', this.keyDown(event));
		document.addEventListener('keydown', (event) => {
			this.keyDown(event);
		});
		document.addEventListener('keyup', (event) => {
			this.keyUp(event);
		});
        document.addEventListener("wheel", (event) => {
			this.wheel(event);
		});
        window.addEventListener('resize', this.resize, false);
        game.canvas.addEventListener('mousemove', e => {
            this.mouse.x = e.offsetX + (game.position.x * -1);
            this.mouse.y = e.offsetY + ((game.position.y/2) * -1);
			
            
            let x = Math.floor(this.mouse.x / game.settings.blockSize.x);
            let y = Math.floor((this.mouse.y / game.settings.blockSize.y));

			let rhomb = [
				{
					x: x * game.settings.blockSize.x,
					y: y * game.settings.blockSize.y + (game.settings.blockSize.y/2),
				},
				{
					x: x * game.settings.blockSize.x + (game.settings.blockSize.x/2),
					y: y * game.settings.blockSize.y,
				},
				{
					x: (x+1) * game.settings.blockSize.x,
					y: y * game.settings.blockSize.y + (game.settings.blockSize.y/2),
				},
				{
					x: x * game.settings.blockSize.x + (game.settings.blockSize.x/2),
					y: (y+1) * game.settings.blockSize.y,
				},
			];
			
			// UP LEFT
			let fx = rhomb[1].x - rhomb[0].x;
			let fy = rhomb[1].y - rhomb[0].y;
			let torqueUL = fx * (this.mouse.y - rhomb[0].y) - fy * (this.mouse.x - rhomb[0].x);
			
			//UR
			fx = rhomb[2].x - rhomb[1].x;
			fy = rhomb[2].y - rhomb[1].y;
			let torqueUR = fx * (this.mouse.y - rhomb[1].y) - fy * (this.mouse.x - rhomb[1].x);
			
			//DR
			fx = rhomb[3].x - rhomb[2].x;
			fy = rhomb[3].y - rhomb[2].y;
			let torqueDR = fx * (this.mouse.y - rhomb[2].y) - fy * (this.mouse.x - rhomb[2].x);
			
			//DL
			fx = rhomb[0].x - rhomb[3].x;
			fy = rhomb[0].y - rhomb[3].y;
			let torqueDL = fx * (this.mouse.y - rhomb[3].y) - fy * (this.mouse.x - rhomb[3].x);
			

			let ox = 0;
			let oy = 0;
			if (torqueUL<0) {
				ox = - 1;
				oy = - 1;
			}
			if (torqueUR<0) {
				oy = - 1;
			}
			if (torqueDR<0) {
				oy = 1;
			}
			if (torqueDL<0) {
				oy = 1;
				ox = -1;
			}

            this.mouse.gX = x + ox;
            this.mouse.gY = ((y - 1) * 2) + oy;
        });
        game.canvas.addEventListener('mousedown', e => {
            if (e.button == 0) {
//                this.mouse.click.gX = this.mouse.gX;
//                this.mouse.click.gY = this.mouse.gY;
                this.mouse.click.active = true;
            }
        });
        game.canvas.addEventListener('mouseup', e => {
            this.mouse.click.active = false;
        });
        game.canvas.addEventListener('contextmenu', e => {
            build.active = false;
            return false;
        });
        
        
	}
	
	mapPosition() {
		if (this.button.up) {
			game.position.y += game.settings.scrollSpeed * game.deltaTime;
		}
		if (this.button.down) {
			game.position.y += -game.settings.scrollSpeed * game.deltaTime;
		}
		if (this.button.left) {
			game.position.x += game.settings.scrollSpeed * game.deltaTime;
		}
		if (this.button.right) {
			game.position.x += -game.settings.scrollSpeed * game.deltaTime;
		}
	}

    resize() {
        game.canvas.width = window.innerWidth;
        game.canvas.height = window.innerHeight;
    }
	
	keyDown(event) {
		switch (event.code) {
			case 'KeyW':
				this.button.up = true;
				break;
			case 'KeyS':
				this.button.down = true;
				break;
			case 'KeyA':
				this.button.left = true;
				break;
			case 'KeyD':
				this.button.right = true;
				break;
		}
	}
	
	keyUp(event) {
		switch (event.code) {
			case 'KeyW':
				this.button.up = false;
				break;
			case 'KeyS':
				this.button.down = false;
				break;
			case 'KeyA':
				this.button.left = false;
				break;
			case 'KeyD':
				this.button.right = false;
				break;
		}
	}

    wheel(event) {
//        if (event.deltaY > 0) {
//            if (game.settings.blockSize.x < 500) {
//                game.settings.blockSize.x += 6;
//                game.settings.blockSize.y += 3;
//                game.settings.tileSize.x += 6;
//                game.settings.tileSize.y += 6;
//                game.position.x = game.position.x + ((game.position.x / game.settings.blockSize.x) * 6);
//                game.position.y = game.position.y + ((game.position.y / game.settings.blockSize.y) * 3);
//            }
//        } else if (event.deltaY < 0) {
//            if (game.settings.blockSize.x > 150) {
//                game.settings.blockSize.x -= 6;
//                game.settings.blockSize.y -= 3;
//                game.settings.tileSize.x -= 6;
//                game.settings.tileSize.y -= 6;
//                game.position.x = game.position.x - ((game.position.x / game.settings.blockSize.x) * 6);
//                game.position.y = game.position.y - ((game.position.y / game.settings.blockSize.y) * 3);
//            }
//        }
        if (event.deltaY > 0) {
            game.scale += 0.1;
        } else {
            game.scale -= 0.1;
        }
    }
}