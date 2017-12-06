
let clicked = false;

let thumbnail;
let appleImg;
let orangeImg;
let bananaImg; 

let eyes = [];
let mouths = [];

const buttons = [];

let saveButton;
let toggleFoodButton;
var myFood;

function preload(){
	saveButton = loadImage("/img/game/saveButton.png");
	toggleFoodButton = loadImage('/img/game/foodTypeButton.png');

	appleImg = loadImage("/img/game/apple.png");
	orangeImg = loadImage("/img/game/orange.png");
	bananaImg = loadImage("/img/game/banana.png");

	for(let i = 1; i <=8; i++){
		eyes.push(loadImage("/img/game/eyes/eye" + i + ".png"));
		mouths.push(loadImage("/img/game/mouths/mouth" + i + ".png"));
	}
}
function setup(){
	const myCanvas = createCanvas(500,500);
	myCanvas.parent("sketchHolder");

	myFood = new MyFood();
	buttons.push(new Button("togglefood", toggleFoodButton, 65, 30));
}
function draw(){
	myFood.display();
	buttons.forEach( function(x){
		if(x.display()){
			if(x.name === "togglefood"){
				myFood.changeFood();
			}
		}
	});
	clicked = false;
}
function MyFood(info){
	this.display = function(){
		if(this.type === "apple"){
			image(appleImg, 0,0);
		}
		else if(this.type === "orange"){
			image(orangeImg, 0,0);
		}
		else if(this.type === "banana"){
			image(bananaImg, 0,0);
		}
		for(let i = 0; i < this.addons.length; i++){
			image(this.addons[i].image, this.addons[i].xPos, this.addons[i].yPos);
		}
	}
	this.changeFood = function(){
		this.dictionaryIterator+1 === foodDictionary.length ? this.dictionaryIterator=0 : this.dictionaryIterator+=1;
		this.type = foodDictionary[this.dictionaryIterator]; 
	}
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
function Accessory(num, type, x, y){
	this.num = num;
	this.type = type;
	this.xPos = mouseX;
	this.yPos = mouseY;
	this.set = false;

	if(this.type === "eye"){
		this.image = eyes[this.num];
	}
	else{
		this.image = mouths[this.num];
	}
	this.display = function(){
		if(this.set){
			image(this.image, this.xPos, this.yPos);
		}
		else{
			image(this.image, mouseX, mouseY);
			if(clicked){
				set = true;
				this.xPos = mouseX;
				this.yPos = mouseY;
			}
		}
	}
}
function AccessoryButton(img, x, y, type){
	this.img = img;
	this.xPos = x;
	this.yPos = y;
	this.type = type;

	if()
}
function Button(name, img,x,y){
	this.name = name;
	this.pic = img;
	this.xPos = x;
	this.yPos = y;


	this.checkHovering = function(){
		if(mouseX > this.xPos - 37 && mouseX < this.xPos + 37 && mouseY > this.yPos-18 && mouseY < this.yPos+18){
			return true;
		}
		else{
			return false;
		}
	}
	this.display = function(){
		if(this.checkHovering() === false){
			image(this.pic, this.xPos, this.yPos);
			return false;
		}
		else{
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

const foodDictionary = ["apple", "orange", "banana"];