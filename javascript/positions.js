class PositionsUI {
	
	points = [
		{
			name:'Стартовая позиция',
			x:0,
			y:0,
		},
	];
	
	constructor() {
		this.updateEvents();
		
		this.updatePositionsUI();
	}
	
	updateEvents() {
		let parent = this;
		$('.positions').mouseenter(function(){
			$('.positions').stop();
            $('.positions').animate({height: "315px"},100);
        });
        $('.positions').mouseleave(function(){
			$('.positions').stop();
            $('.positions').animate({height: "28px"},100);
        });
		$('.positions_all').click(function() {
			parent.changePostion($('.positions_all').val());
		});
	}
	
	updatePositionsUI() {
		$('.positions_all').html('');
		for(let point in this.points) {
			$('.positions_all').append('<option value="' + point + '">' + this.points[point].name + '</option>');
		}
	}
	
	changePostion(point) {
		game.position.x = this.points[point].x;
		game.position.y = this.points[point].y;
	}
	
	addPoint() {
		positionsUi.points.push({
			name:$('.positions_new_name').val(),
			x:game.position.x,
			y:game.position.y,
		});
		this.updatePositionsUI();
	}
}