class LoaderUI {

    showMax(amount) {
        $('.fileLoadingMax').html(amount);
    }
    
    update(amount, amountMax) {
        $('.fileLoading').html(amount);
        $('.loader_black').css('opacity',amount/amountMax);
    }
    
    hide() {
        $('.loader').fadeOut(200);
    }

}