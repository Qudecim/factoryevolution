class UI {
    
    constructor() {
		this.createListBuildings();
        this.createListResource();
        this.updateEvents();
    }
    
    build(type) {
        if (build.active && type === build.type) {
            build.active = false;
            return;
        }
        build.type = type;
        build.active = true;
    }
    
    showItem() {
        let type = game.objects[game.select_item].type;
        let building = game.buildings[type];
        $('.panel_item_header').html(building.name);
        $('.panel_item_img').attr('src',game.settings.pathImg + type + '.png');
        
        $('.panel_item_level').html(building.level);
        $('.panel_item_level_cost').html(game.formatAmount(game.getUpgradeBuildingCost(type)));
        
        $('#panel_item_resource_list_item_extract_img').attr('src', game.settings.pathImgResource + game.getBuildingExtract(type).type + '.png');
        $('#panel_item_resource_list_item_extract_amount').text(game.getBuildingExtract(type).amount);
        
        $('#panel_item_resource_list_spend').html('');
        let spend = game.getBuildingSpend(type);
        if (spend.length) {
            $('#panel_item_resource_spend').show();
            for (let i = 0; i < spend.length; i++) {
                let html = '<div class="panel_item_resource_list_item"><img class="panel_item_resource_list_item_img" id="panel_item_resource_list_item_extract_img" src="' + game.settings.pathImgResource + spend[i].type + '.png"><div id="panel_item_resource_list_item_extract_amount" class="panel_item_resource_list_item_amount">' + spend[i].amount + '</div></div>';
                $('#panel_item_resource_list_spend').append(html);
            }
        } else {
            $('#panel_item_resource_spend').hide();
        }
        
        
		$('#panel_item').show();
    }
    
    closeItem() {
        game.select_item = false;
        $('#panel_item').hide();
    }
	
	removeItem() {
		game.removeObject(game.select_item);
        ui.closeItem();
	}
    
    clickTab(id) {
        $('.content').hide();
        $('[data-tab=c'+id+']').show();
        
        $('.tab-active').removeClass('tab-active');
        $('[data-tab='+id+']').addClass('tab-active');
    }
    
    updateEvents() {
        parent = this;
        $('.tab').click(function(){
            parent.clickTab($(this).attr('data-tab'));
        });
        $('.item').mouseenter(function(){
            parent.showBuildingInfo($(this).attr('data-type'));
        });
        $('.item').mouseleave(function(){
            parent.hideBuildingInfo();
        });
    }
    
    showBuildingInfo(type) {
        let building = game.buildings[type];
        $('#bi_name').text(building.name);
        $('#bi_img').attr('src','image/' + type + '.png');
        $('#bi_description').text(building.description);
        $('#bi_extract_img').attr('src', 'image/resource/' + building.extractType + '.png');
        $('#bi_extract_amount').text(building.extractAmount);
        $('#bi_spend_list').html('');
        
        for (let i = 0; i < building.spend.length; i++) {
			let html = '<div class="bi_es_item"><img class="bi_es_item_img" src="' + game.settings.pathImgResource + building.spend[i].type + '.png"><div class="bi_es_item_amount">' + building.spend[i].amount + '</div></div>';
            $('#bi_spend_list').append(html);
		}
        
        if (building.spend.length) {
            $('#bi_spend').show();
        } else {
            $('#bi_spend').hide();
        }
        
        $('.building_info').show();
    }
    
    hideBuildingInfo() {
        $('.building_info').hide();
    }
    
    showWarning(text) {
        console.log(text);
    }
    
    updateResource() {
        $('#top_money').text(game.formatAmount(game.resource['money'].amount));
        $('#top_energy').text(game.formatAmount(game.resource['energy'].amount));
        for (let res in game.resource) {
            $('#res_' + res).text(game.formatAmount(game.resource[res].amount));
            $('#res_extractpersecond_' + res).text(game.formatAmount(game.resource[res].extractPerSecond));
            $('#res_spendpersecond_' + res).text(game.formatAmount(game.resource[res].spendPerSecond));
            if (game.resource[res].extractPerSecond < game.resource[res].spendPerSecond) {
                if (!$('#resource_item_' + res).hasClass('redColor')) {
                    $('#resource_item_' + res).addClass('redColor');
                }
            } else {
                if ($('#resource_item_' + res).hasClass('redColor')) {
                    $('#resource_item_' + res).removeClass('redColor');
                }
            }
        }
    }
    
    updateBuidingsCost() {
        for (let building in game.buildings) {
            $('[data-type=' + building + '] > .item_cost').text(game.formatAmount(game.buildings[building].cost));
        }
    }
    
    updateSysStat() {
        let domFPS = document.getElementById('domFPS');
        let domOBJS = document.getElementById('domOBJS');
        let domX = document.getElementById('domX');
        let domY = document.getElementById('domY');
        
        domFPS.innerHTML = game._fps;
        domOBJS.innerHTML = game.objects.length;
        domX.innerHTML = game.position.x;
        domY.innerHTML = game.position.y;
    }
    
    aimStart() {
        game.position.x = 0;
        game.position.y = 0;
    }

	createListBuildings() {
		for (let building in game.buildings) {
			let html = '';
			html += '<div class="item" data-type="' + building + '" onclick="ui.build(\'' + building + '\');">';
            html += '<div class="item_img_container"><img class="item_img" src="image/' + building + '.png"></div>';
            html += '<div class="item_name">' + game.buildings[building].name + '</div>';
            html += '<div class="item_cost">' + game.buildings[building].cost + '</div>';
            html += '</div>';
			
			$('#' + game.buildings[building].category).append(html);
		}
	}
    
    createListResource() {
        for (let res in game.resource) {
            let html = '<div class="resource_item" id="resource_item_' + res + '" title="' + res + '"><img class="top_item_img" src="image/resource/' + res + '.png"><span class="res_right_item_amount" id="res_' + res + '">0</span><span  class="res_right_item_amount" id="res_extractpersecond_' + res + '">0</span><span class="res_right_item_amount" id="res_spendpersecond_' + res + '">0</span></div>';
            $('#rightListResource').append(html);
        }
        
        let html_m = '<div class="top_item" title="money"><img class="top_img_resource" src="image/resource/money.png"><div id="top_money" class="top_item_amount">0</div></div>';
        $('.panel_top').append(html_m);
        
        let html_e = '<div class="top_item" title="energy"><img class="top_img_resource" src="image/resource/energy.png"><div id="top_energy" class="top_item_amount">0</div></div>';
        $('.panel_top').append(html_e);
    }
    
    showMessage(text) {
        $('.message').html(text);
        $('.message_container').stop();
        $('.message_container').fadeIn(200);
        setTimeout(function() {
            $('.message_container').stop();
            $('.message_container').fadeOut(200);
        },3000);
    }
    
    upgradeItem() {
        if (game.upgradeBuilding(game.objects[game.select_item].type)) {
            this.showItem();
        } else {
            this.showMessage('Don\'t have money...');
        }
    }
}