class Game {
	
	canvas = false;
	ctx = false;
	res = {};

    version = '0.0.2';

    pause = true;
    debug = false;

    scale = 1;

    countResourceLoad = 0;

    deltaTime = 1;

    select_item = false;
	
	position = {
		x:0,
		y:0,
	};

    showBlock = {
        minX:0,
        minY:0,
        maxX:20,
        maxY:20,
    }

    resource = {
        money: {
            amount:110,
            extractPerSecond: 0,
            spendPerSecond:0,
        },
		energy: {
            amount:0,
            extractPerSecond: 0,
            spendPerSecond:0,
        },
		wood: {
            amount:0,
            extractPerSecond: 0,
            spendPerSecond:0,
        },
        water: {
            amount:0,
            extractPerSecond: 0,
            spendPerSecond:0,
        },
		iron: {
            amount:0,
            extractPerSecond: 0,
            spendPerSecond:0,
        },
        coal:{
            amount:0,
            extractPerSecond: 0,
            spendPerSecond:0,
        },
		oil: {
            amount:0,
            extractPerSecond: 0,
            spendPerSecond:0,
        },
		steel: {
            amount:0,
            extractPerSecond: 0,
            spendPerSecond:0,
        },
		copper: {
            amount:0,
            extractPerSecond: 0,
            spendPerSecond:0,
        },
		rubber:{
            amount:0,
            extractPerSecond: 0,
            spendPerSecond:0,
        },
		plastic:{
            amount:0,
            extractPerSecond: 0,
            spendPerSecond:0,
        },
		wire:{
            amount:0,
            extractPerSecond: 0,
            spendPerSecond:0,
        },
		silicon: {
            amount:0,
            extractPerSecond: 0,
            spendPerSecond:0,
        },
        aluminum:{
            amount:0,
            extractPerSecond: 0,
            spendPerSecond:0,
        },
        microcontroller:{
            amount:0,
            extractPerSecond: 0,
            spendPerSecond:0,
        },
        uranium:{
            amount:0,
            extractPerSecond: 0,
            spendPerSecond:0,
        },
		diamond : {
			amount:0,
            extractPerSecond: 0,
            spendPerSecond:0,
		},
		tiberium : {
			amount:0,
            extractPerSecond: 0,
            spendPerSecond:0,
		},
		graviton : {
			amount:0,
            extractPerSecond: 0,
            spendPerSecond:0,
		},
        collapsar: {
            amount:0,
            extractPerSecond: 0,
            spendPerSecond:0,
        },
    }
	
	buildings = {
		// Energy
		windPower : {
            name: 'Ветрянная эл.с.',
            description: 'устройство для преобразования кинетической энергии ветрового потока в механическую энергию вращения ротора с последующим её преобразованием в электрическую энергию',
			category: 'energyBuildings',
			cost: 10,
            rise: 0.3,
            level: 1,
            levelCost: 1000,
            levelRise: 0.5,
			extractAmount: 10,
			extractType: 'energy',
			spend: []
		},
		coalPower : {
            name: 'Тепловая электростанция',
            description: 'Переработка угля в электричество',
			category: 'energyBuildings',
			cost: 1000,
            rise: 0.3,
            level: 1,
            levelCost: 10000,
            levelRise: 0.5,
			extractAmount: 100,
			extractType: 'energy',
			spend: [
				{
					type: 'coal',
					amount: 2,
				},
			]
		},
        geothermalPower : {
            name: 'Геотермальная станция',
            description: '',
			category: 'energyBuildings',
			cost: 10000,
            rise: 0.5,
            level: 1,
            levelCost: 1000,
            levelRise: 0.5,
			extractAmount: 100,
			extractType: 'energy',
			spend: []
		},
		nuclearPower : {
            name: 'Атомная электростанция',
            description: '',
			category: 'energyBuildings',
			cost: 100000,
            rise: 0.5,
            level: 1,
            levelCost: 1000,
            levelRise: 0.3,
			extractAmount: 1000,
			extractType: 'energy',
			spend: [
				{
					type: 'uranium',
					amount: 2,
				},
			]
		},
        tokamakPower : {
            name: 'Токамак',
            description: '',
			category: 'energyBuildings',
			cost: 100000000,
            rise: 0.5,
            level: 1,
            levelCost: 1000,
            levelRise: 0.3,
			extractAmount: 10000,
			extractType: 'energy',
			spend: [
                {
					type: 'energy',
					amount: 1000,
				},
				{
					type: 'water',
					amount: 1,
				},
			]
		},
        singularPower : {
            name: 'Сингулярный реактор',
            description: '',
			category: 'energyBuildings',
			cost: 10000000000,
            rise: 0.5,
            level: 1,
            levelCost: 1000,
            levelRise: 0.3,
			extractAmount: 1000000,
			extractType: 'energy',
			spend: [
                {
					type: 'collapsar',
					amount: 2,
				},
			]
		},
		
		// extract
		sawmill : {
            name: 'Лесопилка',
            description: 'Предприятие первичной переработки леса на лесоматериалы в системе лесозаготовительной промышленности',
			category: 'extractBuildings',
			cost: 50,
            rise: 0.01,
            level: 1,
            levelCost: 100,
            levelRise: 0.5,
			extractAmount: 1,
			extractType: 'wood',
			spend: [
				{
					type: 'energy',
					amount: 1,
				}
			]
		},
        waterMine : {
            name: 'Водяной насос',
            description: '',
			category: 'extractBuildings',
			cost: 50,
            rise: 0.01,
            level: 1,
            levelCost: 100,
            levelRise: 0.5,
			extractAmount: 1,
			extractType: 'water',
			spend: [
				{
					type: 'energy',
					amount: 2,
				}
			]
		},
		ironMine : {
            name: 'Железная шахта',
            description: 'Промышленное предприятие, осуществляющее добычу железной руды с помощью системы подземных горных выработок',
			category: 'extractBuildings',
			cost: 50,
            rise: 0.01,
            level: 1,
            levelCost: 100,
            levelRise: 0.5,
			extractAmount: 1,
			extractType: 'iron',
			spend: [
				{
					type: 'energy',
					amount: 2,
				}
			]
		},
        coalMine : {
            name: 'Угольная шахта',
            description: 'Промышленное предприятие, осуществляющее добычу угля с помощью системы подземных горных выработок',
			category: 'extractBuildings',
			cost: 100,
            rise: 0.01,
            level: 1,
            levelCost: 1000,
            levelRise: 0.5,
			extractAmount: 1,
			extractType: 'coal',
			spend: [
				{
					type: 'energy',
					amount: 1,
				}
			]
		},
        copperMine : {
            name: 'Медная шахта',
            description: 'Промышленное предприятие, осуществляющее добычу медной руды с помощью системы подземных горных выработок',
			category: 'extractBuildings',
			cost: 1000,
            rise: 0.01,
            level: 1,
            levelCost: 10000,
            levelRise: 0.5,
			extractAmount: 1,
			extractType: 'copper',
			spend: [
				{
					type: 'energy',
					amount: 1,
				}
			]
		},
        oilMine : {
            name: 'Нефтяная вышка',
            description: 'устройство, добывающее сырую нефть из месторождений',
			category: 'extractBuildings',
			cost: 1000,
            rise: 0.01,
            level: 1,
            levelCost: 10000,
            levelRise: 0.5,
			extractAmount: 1,
			extractType: 'oil',
			spend: [
				{
					type: 'energy',
					amount: 5,
				}
			]
		},
		aluminumMine : {
            name: 'Алюминевая шахта',
            description: 'Промышленное предприятие, осуществляющее добычу алюминевой руды с помощью системы подземных горных выработок',
			category: 'extractBuildings',
			cost: 10000,
            rise: 0.01,
            level: 1,
            levelCost: 10000,
            levelRise: 0.5,
			extractAmount: 1,
			extractType: 'aluminum',
			spend: [
				{
					type: 'energy',
					amount: 5,
				}
			]
		},
        siliconMine : {
            name: 'Кремниевая шахта',
            description: 'Промышленное предприятие, осуществляющее добычу кремниевой руды с помощью системы подземных горных выработок',
			category: 'extractBuildings',
			cost: 10000,
            rise: 0.01,
            level: 1,
            levelCost: 10000,
            levelRise: 0.5,
			extractAmount: 1,
			extractType: 'silicon',
			spend: [
				{
					type: 'energy',
					amount: 10,
				}
			]
		},
        uraniumMine : {
            name: 'Урановая шахта',
            description: 'Добыча урана',
			category: 'extractBuildings',
			cost: 10000,
            rise: 0.01,
            level: 1,
            levelCost: 10000,
            levelRise: 0.5,
			extractAmount: 1,
			extractType: 'uranium',
			spend: [
				{
					type: 'energy',
					amount: 10,
				}
			]
		},
		tiberiumMine : {
            name: 'Тибериумная шахта',
            description: 'Добыча тибериума',
			category: 'extractBuildings',
			cost: 1000000,
            rise: 0.01,
            level: 1,
            levelCost: 10000,
            levelRise: 0.5,
			extractAmount: 1,
			extractType: 'tiberium',
			spend: [
				{
					type: 'energy',
					amount: 100,
				}
			]
		},
        
		//factory
		slingshot : {
            name: 'Завод по производству рогаток',
            description: 'Завод по производству метательное оружие, в котором ускоряемое тело (снаряд) приобретает кинетическую энергию за счёт потенциальной энергии, запасённой в растянутой резине. Применяется для развлечения, для охоты, для метания различных предметов и иногда как оружие',
			category: 'factoryBuildings',
			cost: 50,
            rise: 0.4,
            level: 1,
            levelCost: 100,
            levelRise: 0.5,
			extractAmount: 1,
			extractType: 'money',
			spend: [
				{
					type: 'energy',
					amount: 1,
				},
				{
					type: 'wood',
					amount: 1,
				}
			]
		},
		bolt : {
            name: 'Производство болтов',
            description: 'Болт - крепёжное изделие в виде стержня с наружной резьбой, как правило, с шестигранной головкой под гаечный ключ, образующее соединение при помощи гайки или иного резьбового отверстия',
			category: 'factoryBuildings',
			cost: 1000,
            rise: 0.4,
            level: 1,
            levelCost: 1000,
            levelRise: 0.5,
			extractAmount: 5,
			extractType: 'money',
			spend: [
				{
					type: 'energy',
					amount: 1,
				},
				{
					type: 'iron',
					amount: 2,
				}
			]
		},
		rake : {
            name: 'Грабельный завод',
            description: 'Грабли - сельскохозяйственный инструмент, применяемый для разбивания комьев уже разрыхлённой почвы, очистки от выкопанных корней сорных трав, лёгкого разрыхления последней между рядами растений, а также для грабления, сгребания или сгромаживания скошенной травы,',
			category: 'factoryBuildings',
			cost: 50000,
            rise: 0.4,
            level: 1,
            levelCost: 50000,
            levelRise: 0.5,
			extractAmount: 10,
			extractType: 'money',
			spend: [
				{
					type: 'energy',
					amount: 1,
				},
				{
					type: 'wood',
					amount: 2,
				},
				{
					type: 'iron',
					amount: 2,
				}
			]
		},
		weapon : {
            name: 'Оружейная мастерская',
            description: 'Производство оружие',
			category: 'factoryBuildings',
			cost: 500000,
            rise: 0.4,
            level: 1,
            levelCost: 500000,
            levelRise: 0.5,
			extractAmount: 50,
			extractType: 'money',
			spend: [
				{
					type: 'energy',
					amount: 20,
				},
				{
					type: 'steel',
					amount: 2,
				},
				{
					type: 'coal',
					amount: 2,
				}
			]
		},
        auto : {
            name: 'Автомобильный завод',
            description: 'Завод по производству автомобилей',
			category: 'factoryBuildings',
			cost: 5000000,
            rise: 0.4,
            level: 1,
            levelCost: 5000000,
            levelRise: 0.5,
			extractAmount: 1000,
			extractType: 'money',
			spend: [
				{
					type: 'energy',
					amount: 100,
				},
				{
					type: 'plastic',
					amount: 2,
				},
				{
					type: 'rubber',
					amount: 2,
				},
                {
					type: 'steel',
					amount: 4,
				},
                {
					type: 'aluminum',
					amount: 4,
				},
                {
					type: 'wire',
					amount: 2,
				},
			]
		},
        computer : {
            name: 'Компьютерная фабрика',
            description: 'Производство компьютеров',
			category: 'factoryBuildings',
			cost: 100000000,
            rise: 0.4,
            level: 1,
            levelCost: 100000000,
            levelRise: 0.5,
			extractAmount: 10000,
			extractType: 'money',
			spend: [
				{
					type: 'energy',
					amount: 200,
				},
				{
					type: 'plastic',
					amount: 4,
				},
                {
					type: 'aluminum',
					amount: 2,
				},
                {
					type: 'wire',
					amount: 4,
				},
                {
                    type: 'microcontroller',
                    amount: 2,
                }
			]
		},
        airplane : {
            name: 'Авиационный завод',
            description: 'Производство самолетов',
			category: 'factoryBuildings',
			cost: 1000000000,
            rise: 0.4,
            level: 1,
            levelCost: 1000000000,
            levelRise: 0.5,
			extractAmount: 100000,
			extractType: 'money',
			spend: [
				{
					type: 'energy',
					amount: 400,
				},
				{
					type: 'plastic',
					amount: 4,
				},
                {
					type: 'rubber',
					amount: 2,
				},
                {
					type: 'steel',
					amount: 2,
				},
                {
					type: 'copper',
					amount: 2,
				},
                {
					type: 'aluminum',
					amount: 4,
				},
                {
					type: 'wire',
					amount: 4,
				},
                {
                    type: 'microcontroller',
                    amount: 4,
                }
			]
		},
		starship : {
            name: 'Фабрика звездолетов',
            description: '',
			category: 'factoryBuildings',
			cost: 100000000000,
            rise: 0.4,
            level: 1,
            levelCost: 100000000000,
            levelRise: 0.5,
			extractAmount: 100000,
			extractType: 'money',
			spend: [
				{
					type: 'energy',
					amount: 400,
				},
				{
					type: 'plastic',
					amount: 2,
				},
                {
					type: 'water',
					amount: 2,
				},
                {
					type: 'copper',
					amount: 2,
				},
                {
					type: 'aluminum',
					amount: 2,
				},
                {
					type: 'wire',
					amount: 4,
				},
                {
                    type: 'microcontroller',
                    amount: 4,
                },
				{
                    type: 'graviton',
                    amount: 4,
                }
			]
		},
		spaceStation: {
            name: 'Фабрика космических станций',
            description: '',
			category: 'factoryBuildings',
			cost: 10000000000000,
            rise: 0.4,
            level: 1,
            levelCost: 10000000000000,
            levelRise: 0.5,
			extractAmount: 100000,
			extractType: 'money',
			spend: [
				{
					type: 'energy',
					amount: 400,
				},
				{
					type: 'plastic',
					amount: 4,
				},
                {
					type: 'aluminum',
					amount: 4,
				},
                {
					type: 'wire',
					amount: 4,
				},
                {
                    type: 'microcontroller',
                    amount: 4,
                },
				{
                    type: 'diamond',
                    amount: 4,
                },
				{
                    type: 'graviton',
                    amount: 4,
                }
			]
		},
		
		//processingBuildings
		steel : {
            name: 'Металургический цех',
            description: 'Перерабатывает железо в сталь',
			category: 'processingBuildings',
			cost: 1000,
            rise: 0.01,
            level: 1,
            levelCost: 5000,
            levelRise: 0.5,
			extractAmount: 1,
			extractType: 'steel',
			spend: [
				{
					type: 'energy',
					amount: 20,
				},
				{
					type: 'iron',
					amount: 2,
				}
			]
		},
		plastic : {
            name: 'Фабрика пластика',
            description: 'Переработка нефти в пластик',
			category: 'processingBuildings',
			cost: 10000,
            rise: 0.01,
            level: 1,
            levelCost: 50000,
            levelRise: 0.5,
			extractAmount: 1,
			extractType: 'plastic',
			spend: [
				{
					type: 'energy',
					amount: 20,
				},
				{
					type: 'oil',
					amount: 2,
				},
			]
		},
		rubber : {
            name: 'Фабрика по производству резины',
            description: 'Переработка нефти в резину',
			category: 'processingBuildings',
			cost: 1000,
            rise: 0.01,
            level: 1,
            levelCost: 50000,
            levelRise: 0.5,
			extractAmount: 1,
			extractType: 'rubber',
			spend: [
				{
					type: 'energy',
					amount: 20,
				},
				{
					type: 'oil',
					amount: 2,
				},
			]
		},
		wire : {
            name: 'Завод проводников',
            description: 'Завод по производству проводов',
			category: 'processingBuildings',
			cost: 10000,
            rise: 0.01,
            level: 1,
            levelCost: 50000,
            levelRise: 0.5,
			extractAmount: 1,
			extractType: 'wire',
			spend: [
				{
					type: 'energy',
					amount: 20,
				},
				{
					type: 'copper',
					amount: 2,
				},
				{
					type: 'rubber',
					amount: 2,
				},
			]
		},
		microcontroller : {
            name: 'Фабрика микроконтроллеров',
            description: 'Завод по производству микроконтроллеров',
			category: 'processingBuildings',
			cost: 50000,
            rise: 0.01,
            level: 1,
            levelCost: 100000,
            levelRise: 0.5,
			extractAmount: 1,
			extractType: 'microcontroller',
			spend: [
				{
					type: 'energy',
					amount: 20,
				},
				{
					type: 'silicon',
					amount: 2,
				},
				{
					type: 'copper',
					amount: 4,
				},
			]
		},
		diamond : {
            name: 'Фабрика алмазов',
            description: 'Завод по производству алмазов',
			category: 'processingBuildings',
			cost: 50000,
            rise: 0.01,
            level: 1,
            levelCost: 100000,
            levelRise: 0.5,
			extractAmount: 1,
			extractType: 'diamond',
			spend: [
				{
					type: 'energy',
					amount: 20,
				},
				{
					type: 'coal',
					amount: 4,
				},
			]
		},
		graviton : {
            name: 'Производство гравитонов',
            description: 'Создание безмассовых элементарных частиц - переносчик гравитационного взаимодействия',
			category: 'processingBuildings',
			cost: 50000,
            rise: 0.01,
            level: 1,
            levelCost: 100000,
            levelRise: 0.5,
			extractAmount: 1,
			extractType: 'graviton',
			spend: [
				{
					type: 'energy',
					amount: 200,
				},
				{
					type: 'diamond',
					amount: 4,
				},
				{
					type: 'tiberium',
					amount: 4,
				},
				{
					type: 'coal',
					amount: 2,
				},
			]
		},
        collapsar : {
            name: 'Генератор коллапсаров',
            description: 'Формирует микроскопические чёрные дыры',
			category: 'processingBuildings',
			cost: 1000000,
            rise: 0.01,
            level: 1,
            levelCost: 1000000,
            levelRise: 0.5,
			extractAmount: 1,
			extractType: 'collapsar',
			spend: [
				{
					type: 'energy',
					amount: 1000,
				},
                {
					type: 'plastic',
					amount: 2,
				},              
                {
					type: 'uranium',
					amount: 6,
				},
				{
					type: 'graviton',
					amount: 6,
				},
			]
		},
	}
	
	settings = {
		mapSize : {
			x:1000,
			y:1000,
		},
        blockSize : {
			x:300,
			y:150,
		},
		tileSize : {
			x:300,
			y:300,
		},
        scrollSpeed:0.5,
        fps:40,
        _fps:0,
        pathImg:'./image/',
        pathImgResource:'./image/resource/',
	};

	mapImages = [];

    objects = [];
	
	modern = [];
	
	constructor() {
        
        loaderUi.showMax(Object.keys(this.buildings).length);
        
		this.canvas = document.getElementById('canvas');
		this.ctx = canvas.getContext('2d');
		
        this.loadRes();
	}

    loadRes() {
        let parent = this;
        
        for (let i = 0; i < 7; i++) {
            this.mapImages[i] = new Image();
            this.mapImages[i].src = this.settings.pathImg  + 'ground0' + i + '.png';
        }
			
        for (let building in this.buildings) {
            this.buildings[building].img = new Image();
            this.buildings[building].img.src = this.settings.pathImg  + building + '.png';
            this.buildings[building].img.onload = function() {
                parent.onLoadResource();
            }
        }
    }

    onLoadResource() {
        console.log('Load img');
        this.countResourceLoad++;
        loaderUi.update(this.countResourceLoad,Object.keys(this.buildings).length);
        if (Object.keys(this.buildings).length == this.countResourceLoad) {
            this.pause = false;
            loaderUi.hide();
        }
    }

	draw() {
		game.ctx.rect(0, 0, 2000, 2000);
		game.ctx.fill();
        
        control.mapPosition();
        map.draw();

        if (control.mouse.click.active) {
            if (build.active) {
                build.click();
            } else {
                let current_item = general.getItem(control.mouse.gX,control.mouse.gY);
                if (current_item !== false) {
                    game.select_item = current_item;
                    ui.showItem(current_item);
                    control.mouse.click.active = false;
                }
            }
        }
        
        game.objects.forEach((currentValue, index, array)=>{
            currentValue.draw();
        });
        
        build.draw();
        
	}

    oneSecondLogic() {	
        ui.updateSysStat();
		
		game.updateCash();
		document.title = Math.round(this.resource.money.amount);	
		
        ui.updateResource();
        game.updateResourcePerSecond();
        ui.updateBuidingsCost();
    }

    updateResourcePerSecond() {
        for (let item in this.resource) {
            this.resource[item].extractPerSecond = 0;
            this.resource[item].spendPerSecond = 0;
        }
        for (let i = 0; i < game.objects.length; i++) {
			let type = game.objects[i].type;
            this.resource[this.getBuildingExtract(type).type].extractPerSecond += this.getBuildingExtract(type).amount;
            
            let spendTypes = this.getBuildingSpend(type);
            for (let item in spendTypes) {
                this.resource[spendTypes[item].type].spendPerSecond += spendTypes[item].amount;
            }
            
		}
    }
	
	updateCash() {
		for (let i = 0; i < game.objects.length; i++) {
			let type = game.objects[i].type;
			
			if (!game.hasResourceForExtract(type)) {
				continue;
			}

			game.spendResource(type);
			game.extractResource(type);
		}
	}
	
	hasResourceForExtract(type) {
		let spends = this.getBuildingSpend(type);
		for (let i = 0; i < spends.length; i++) {
			if (!game.hasResource(spends[i].type,spends[i].amount)) {
				return false;
			}
		}
		return true;
	}
	
	extractResource(type) {
		game.plusResource(this.getBuildingExtract(type).type, this.getBuildingExtract(type).amount);
	}
	
	spendResource(type) {
        let spends = this.getBuildingSpend(type);
		for (let i = 0; i < spends.length; i++) {
			game.minusResource(spends[i].type,spends[i].amount);
		}
	}

    plusMoney(amount) {
        this.resource.money.amount = this.resource.money.amount + amount;
    }

    minusMoney(amount) {
        this.resource.money.amount = this.resource.money.amount - amount;
    }
	
	hasMoney(amount) {
		if (amount <= this.resource.money.amount) {
			return true;
		} else {
			return false;
		}
	}
	
	hasResource(type, amount) {
		if (amount <= this.resource[type].amount) {
			return true;
		} else {
			return false;
		}
	}
	
	plusResource(resourceName, amount) {
		this.resource[resourceName].amount = this.resource[resourceName].amount + amount;
	}
	
	minusResource(resourceName, amount) {
		this.resource[resourceName].amount = this.resource[resourceName].amount - amount;
	}

    buildingRisePrice(type) {
        let building = game.buildings[type];
        game.buildings[type].cost = (building.cost * building.rise) + building.cost;
    }

    removeObject(id) {
        this.objects.splice(id, 1);
    }

    upgradeBuilding(type) {
        let building = this.buildings[type];
        let upgradeCost = this.getUpgradeBuildingCost(type);
        if (this.hasMoney(upgradeCost)) {
            building.level++;
            this.minusMoney(upgradeCost);
            return true;
        } else {
            return false;
        }
    }

    getUpgradeBuildingCost(type) {
        let building = this.buildings[type];
        let cost = 0;

        for (let i = 1; i <=  building.level; i++) {
            cost += (building.levelCost * building.levelRise) * building.level;
        }
        return cost;
    }

    getBuildingExtract(type) {
        let building = this.buildings[type];
        return {type:building.extractType, amount:building.extractAmount * building.level};
    }

    getBuildingSpend(type) {
        let building = this.buildings[type];
        let spends = [];
        for (let i = 0; i < building.spend.length; i++) {
            spends.push({type:building.spend[i].type, amount:building.spend[i].amount * building.level});
        }
        return spends;
    }

    save() {
        if (game.pause) {return;}
        ui.showMessage('Сохранение...');
        localStorage.setItem('objects', JSON.stringify(game.objects));
        localStorage.setItem('resource', JSON.stringify(game.resource));
        
        let costBuildings = {};
        for (let building in game.buildings) {
            costBuildings[building] = game.buildings[building].cost;
        }
        localStorage.setItem('buildingCost', JSON.stringify(costBuildings));
        
        let levelBuildings = {};
        for (let building in game.buildings) {
            levelBuildings[building] = game.buildings[building].level;
        }
        localStorage.setItem('buildingLevel', JSON.stringify(levelBuildings));
		
		localStorage.setItem('positionsPoint', JSON.stringify(positionsUi.points));
        
        localStorage.setItem('gameVersion', game.version);
    }

    load() {
        if (localStorage.getItem('objects') !== null && localStorage.getItem('gameVersion') == this.version) {
            let data_obj = JSON.parse(localStorage.getItem('objects'));
            let objects = [];
            for (let building in data_obj) {
                Item.add(data_obj[building].position.x,data_obj[building].position.y,data_obj[building].type);
            }
            
            let data_res = JSON.parse(localStorage.getItem('resource'));
            for (let res in game.resource) {
                game.resource[res].amount = data_res[res].amount;
                game.resource[res].extractPerSecond = data_res[res].extractPerSecond;
                game.resource[res].spendPerSecond = data_res[res].spendPerSecond;
            }
            
            let data_bcost = JSON.parse(localStorage.getItem('buildingCost'));
            for (let building in game.buildings) {
                game.buildings[building].cost = data_bcost[building];
            }
            
            let data_blevel = JSON.parse(localStorage.getItem('buildingLevel'));
            for (let building in game.buildings) {
                game.buildings[building].level = data_blevel[building];
            }
			
			positionsUi.points = JSON.parse(localStorage.getItem('positionsPoint'));
			positionsUi.updatePositionsUI();
        } else {
			let data_obj = JSON.parse('[{"position": {"x": 2, "y": 1}, "type": "windPower"},{"position": {"x": 2, "y": 2}, "type": "sawmill"},{"position": {"x": 1, "y": 3}, "type": "slingshot"}]');
            for (let building in data_obj) {
                Item.add(data_obj[building].position.x,data_obj[building].position.y,data_obj[building].type);
            }
		}
    }
	

	intlFormat(num) {
	  return new Intl.NumberFormat().format(Math.round(num*10)/10);
	}
	
	formatAmount(num)
	{
	  if(num >= 1000000000000000000000)
		return game.intlFormat(num/1000000000000000000000)+'S';
	  if(num >= 1000000000000000000)
		return game.intlFormat(num/1000000000000000000)+'QE';
	  if(num >= 1000000000000000)
		return game.intlFormat(num/1000000000000000)+'Q';
	  if(num >= 1000000000000)
		return game.intlFormat(num/1000000000000)+'T';
      if(num >= 1000000000)
		return game.intlFormat(num/1000000000)+'B';
	  if(num >= 1000000)
		return game.intlFormat(num/1000000)+'M';
	  if(num >= 1000)
		return game.intlFormat(num/1000)+'k';
	  return game.intlFormat(num);
	}
	
}