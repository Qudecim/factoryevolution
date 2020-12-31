class Build {
    active = false;
    type = '';

    draw() {
        if (!this.active) {
            return;
        }

		let building = game.buildings[this.type];
        let x = control.mouse.gX * game.settings.blockSize.x;
        let y = control.mouse.gY * game.settings.blockSize.y;
        let offset = 0;
		if (control.mouse.gY % 2 != 0) {
			offset = game.settings.blockSize.x/2;
		}
        game.ctx.globalAlpha = 0.5;
        game.ctx.drawImage(building.img, (x + offset) + game.position.x,(y + game.position.y)/2,game.settings.tileSize.x,game.settings.tileSize.y);
        game.ctx.globalAlpha = 1;
    }

    click() {
        if (!this.active) {
            return;
        }
        
        let cost = game.buildings[this.type].cost;
		if (general.isFreePlace(control.mouse.gX,control.mouse.gY)) {
			if (game.hasMoney(cost)) {
					Item.add(control.mouse.gX,control.mouse.gY,this.type);
					game.minusMoney(cost);
					game.buildingRisePrice(this.type);
			} else {
				ui.showMessage('Don\'t have money');
			}
		}
    }
}