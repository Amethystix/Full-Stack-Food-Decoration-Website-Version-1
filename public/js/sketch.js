
let clicked = false;

const foodDictionary = ["apple", "orange", "banana", "cherry", "dragonfruit", "pie", "lettuce", "squash", "tomato", "broccoli"];

let thumbnail;
let appleImg;
let orangeImg;
let bananaImg; 

let eyes = [];
let mouths = [];

let eyeButtons = [];
let mouthButtons = [];

const buttons = [];
let eyePressed = false;
let mouthPressed = false;

let saveButton;
let toggleFoodButton;
let mouthButton;
let eyeButton;
let undoButton;
let tempAcc;
let displayRegButtons = true;

var stringAccessories = [];

let foodImgs = [];

var myFood;

function preload(){
	saveButton = loadImage("/img/game/saveButton.png");
	toggleFoodButton = loadImage('/img/game/foodTypeButton.png');
	mouthButton = loadImage('/img/game/mouthButton.png');
	eyeButton = loadImage('/img/game/eyeButton.png');
	undoButton = loadImage('/img/game/undoButton.png');

	for(let i = 0; i < foodDictionary.length; i++){
		foodImgs.push(loadImage("/img/game/" + foodDictionary[i] + ".png"));
	}

	for(let i = 1; i <=10; i++){
		eyes.push(loadImage("/img/game/eyes/eye" + i + ".png"));
		mouths.push(loadImage("/img/game/mouths/mouth" + i + ".png"));
	}
}
function setup(){
	const myCanvas = createCanvas(500,550);
	myCanvas.parent("sketchHolder");

	myFood = new MyFood();
	buttons.push(new Button("togglefood", toggleFoodButton, 0, 500));
	buttons.push(new Button("eye", eyeButton, 125, 500));
	buttons.push(new Button("mouth", mouthButton, 250, 500));
	buttons.push(new Button("undo", undoButton, 375, 500));
	for(let i = 0; i < eyes.length; i++){
		eyeButtons.push(new AccessoryButton(eyes[i], i*50, 600, "eye", i));
		if(i < 5){
			mouthButtons.push(new AccessoryButton(mouths[i], i*100, 600,"mouth", i));
		}
		else{
			mouthButtons.push(new AccessoryButton(mouths[i], (i-5)*100, 650,"mouth", i));
		}
	}
}
function draw(){
	background(255);
	myFood.display();
	if(displayRegButtons){
		if(eyeButtons[0].yPos < 550){
			eyeButtons.map(function(e){
				e.yPos = 550;
			});
		}
		if(mouthButtons[0].yPos < 550){
			mouthButtons.map(function(m){
				if(m.yPos <= 450){
					m.yPos = 550;
				}
				else{
					m.yPos = 600;
				}
			});
		}
		buttons.forEach( function(x){
			if(x.display()){
				if(x.name === "togglefood"){
					myFood.changeFood();
				}
				else if(x.name === "eye"){
					displayRegButtons = false;
					eyePressed = true;
				}
				else if(x.name === "undo"){
					myFood.removeAccessory();
				}
				else if(x.name === "mouth"){
					displayRegButtons = false;
					mouthPressed = true;
				}
			}
		});
	}
	if(!displayRegButtons){
		if(eyePressed){
			if(eyeButtons[0].yPos > 500){
				eyeButtons.map(function(e){
					e.nudge(-1);
				});
			}
		}
		else if(mouthPressed){
			if(mouthButtons[0].yPos > 450){
				mouthButtons.map(function(m){
					m.nudge(-1);
				});
			}
		}
		eyeButtons.forEach(function(x){
			if(x.display()){
				clicked = false;
				tempAcc = new Accessory(x.img, "eye", x.num );
				displayRegButtons = true;
				eyePressed = false;
			}
		});
		mouthButtons.forEach(function(x){
			if(x.display()){
				clicked = false;
				tempAcc = new Accessory(x.img, "mouth", x.num);
				displayRegButtons = true;
				mouthPressed = false;
			}
		});
	}
	if(tempAcc){
		if(tempAcc.display()){
			stringAccessories.push({x: tempAcc.xPos, y: tempAcc.yPos, type: tempAcc.type, num: tempAcc.num});
			myFood.addons.push(tempAcc);
			tempAcc = undefined;
		}
	}
	clicked = false;
}
class MyFood{
	constructor(info){
		if(!info){
			this.addons = [];
			this.name = "";
			this.dictionaryIterator = 0;
			this.type = foodDictionary[0];
			this.image = this.type + "Img";
			this.bg = "";
			this.creator = "";
			this.description = "";
		}
		else{
			this.addons = info.addons;
			this.name = info.name;
			this.type = info.type;
			this.bg = info.bg;
			this.creator = info.creator;
			this.description = "";
		}
	}
	display(){
		image(foodImgs[this.dictionaryIterator], 0, 0, 500, 500);
		for(let i = 0; i < this.addons.length; i++){
			this.addons[i].display();
		}
	}
	changeFood(){
		this.dictionaryIterator+1 === foodDictionary.length ? this.dictionaryIterator=0 : this.dictionaryIterator+=1;
		this.type = foodDictionary[this.dictionaryIterator]; 
	}
	addAccessory(accessory){
		this.addons.push(accessory);	
	}
	removeAccessory(){
		this.addons.splice(this.addons.length-1, 1);
		stringAccessories.splice(stringAccessories.length-1, 1);
	}
}
class Accessory{
	constructor(img, type, num){
		this.type = type;
		this.xPos = mouseX;
		this.yPos = mouseY;
		this.set = false;
		this.image = img;
		this.num = num+1;
	}
	display(){
		if(this.set){
			image(this.image, this.xPos, this.yPos);
		}
		else{
			if(this.type === "eye"){
				image(this.image, mouseX-25, mouseY-25);
				if(clicked){
					if(mouseY < 475 && mouseY > 25){
						this.set = true;
						this.xPos = mouseX-25;
						this.yPos = mouseY-25;
						return true;
					}
					else{
						return false;
					}
				}
				else{
					return false;
				}
			}
			else{
				image(this.image, mouseX-50, mouseY-25);
				if(clicked){
					if(mouseY < 475 && mouseY > 25){
						this.xPos = mouseX-50;
						this.yPos = mouseY-25;
						this.set = true;
						return true;
					}
					else{
						return false;
					}
				}
				else{
					return false;
				}
			}
		}
	}
	isSet(){
		return this.set;
	}
}
class AccessoryButton{
	constructor(img, x, y, type, num){
		this.img = img;
		this.xPos = x;
		this.yPos = y;
		this.type = type;
		this.num = num;
	}
	checkHovering(){
		if(this.type === "eye"){
			if(mouseX > this.xPos && mouseX < this.xPos + 50 && mouseY > this.yPos && mouseY < this.yPos + 50){
				return true;
			}
			else{
				return false;
			}
		}
		else if(this.type === "mouth"){
			if(mouseX > this.xPos && mouseX < this.xPos + 100 && mouseY > this.yPos && mouseY < this.yPos + 50){
				return true;
			}
			else{
				return false;
			}
		}
	}
	display(){
		if(this.checkHovering() === false){
			image(this.img, this.xPos, this.yPos);
			return false;
		}
		else{
			fill(220,220,220);
			if(this.type === "eye"){
				rect(this.xPos, this.yPos, 50, 50);
			}
			else if(this.type === "mouth"){
				rect(this.xPos, this.yPos, 100, 50);
			}
			image(this.img, this.xPos, this.yPos);
			if(clicked){
				return true;
			}
			else{
				return false;
			}
		}
	}
	nudge(direction){
		if(direction>0){
			this.yPos+=5;
		}
		else{
			this.yPos-=5;
		}
	}
}
class Button{
	constructor(name, img, x, y){
		this.name = name;
		this.pic = img;
		this.xPos = x;
		this.yPos = y;
	}


	checkHovering(){
		if(mouseX > this.xPos && mouseX < this.xPos + 125 && mouseY > this.yPos && mouseY < this.yPos+50){
			return true;
		}
		else{
			return false;
		}
	}
	display(){
		if(this.checkHovering() === false){
			image(this.pic, this.xPos, this.yPos);
			return false;
		}
		else{
			fill(0);
			rect(this.xPos, this.yPos, 125, 50);
			image(this.pic, this.xPos, this.yPos);
			if(clicked){
				return true;
			}
			else{
				return false;
			}
		}
	}
}
function mousePressed(){
	clicked = true;
}