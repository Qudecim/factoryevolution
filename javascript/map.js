class Map {
	draw() {
        let startX = -2;
        if (game.position.x != 0) {
            startX = (Math.floor(game.position.x/game.settings.blockSize.x) + 2) * -1;
        }
        game.showBlock.minX = startX;
        game.showBlock.maxX = Math.floor((game.canvas.width + (game.position.x * -1))/game.settings.blockSize.x);
        
        let startY = -4;
        if (game.position.y != 0) {
            startY = (Math.floor(game.position.y/game.settings.blockSize.y) + 4) * -1;
        }
        game.showBlock.minY = startY;
        game.showBlock.maxY = Math.floor((game.canvas.height*2) + (game.position.y * -1)/game.settings.blockSize.y);
        
        let yB = 0;
        let xB = 0;
        for (let iY = startY; (iY * game.settings.blockSize.y) < (game.canvas.height*2) + (game.position.y * -1); iY++) {
            yB++;
            xB = 0;
			for (let iX = startX; (iX * game.settings.blockSize.x) < game.canvas.width + (game.position.x * -1); iX++) {
                xB++;
				let x = iX * game.settings.blockSize.x;
				let y = iY * game.settings.blockSize.y;
				let offset = 0;
				if (iY % 2 != 0) {
					offset = game.settings.blockSize.x/2;
				}
                
                let image = game.mapImages[0];
                
                let numOffset = (iX + iY) % 100;
                if (numOffset < 0) {
                    numOffset = numOffset * - 1;
                }
                
                if (numOffset >= 10) {
                    image = game.mapImages[0]
                }                
                if (numOffset > 20) {
                    image = game.mapImages[1]
                }                
                if (numOffset > 30) {
                    image = game.mapImages[2]
                }                
                if (numOffset > 40) {
                    image = game.mapImages[3]
                }
                if (numOffset > 50) {
                    image = game.mapImages[2]
                }
                if (numOffset > 60) {
                    image = game.mapImages[1]
                }
                if (numOffset > 70) {
                    image = game.mapImages[0]
                }
                if (numOffset > 80) {
                    image = game.mapImages[4]
                }
                if (numOffset > 90) {
                    image = game.mapImages[0]
                }
                
				game.ctx.drawImage(image, (x + offset) + game.position.x,(y + game.position.y)/2,game.settings.tileSize.x,game.settings.tileSize.y);
			}
		}
	}
}