class Item {
    position = {
        x:0,
        y:0,
    };

    type = '';

    constructor(x, y, type) {
        this.position.x = x;
        this.position.y = y;
        this.type = type;
    }

    draw() {
        if (this.position.x + 1 > game.showBlock.minX && this.position.x - 1 < game.showBlock.maxX && this.position.y + 1 > game.showBlock.minY && this.position.y  < game.showBlock.maxY) {
			let building = game.buildings[this.type];
            let x = this.position.x * game.settings.blockSize.x;
            let y = this.position.y * game.settings.blockSize.y;
            let offset = 0;
            if (this.position.y % 2 != 0) {
                offset = game.settings.blockSize.x/2;
            }
            game.ctx.drawImage(building.img, (x + offset) + game.position.x,(y+ game.position.y)/2,game.settings.tileSize.x,game.settings.tileSize.y);
        }
    }

    static add(x,y,type) {
        game.objects.push(new Item(x,y,type));
        general.sortObjects();
    }
}