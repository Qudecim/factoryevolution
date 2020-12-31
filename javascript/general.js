class General {
    sortObjects() {
        game.objects.sort(function (a, b) {
            if (a.position.y > b.position.y) {
                return 1;
            }
            if (a.position.y < b.position.y) {
                return -1;
            }
            return 0;
        });
    }
    isFreePlace(x,y) {
        let isFree = true;
        game.objects.forEach((currentValue, index, array)=>{
            if (currentValue.position.x == x && currentValue.position.y == y) {
                isFree = false;
            }
        });
        return isFree;
    }
    getItem(x,y) {
        let oItem = false;
        game.objects.forEach((currentValue, index, array)=>{
            if (currentValue.position.x == x && currentValue.position.y == y) {
                oItem = index;
            }
        });
        return oItem;
    }
}