let clicked = false;

let thumbnail;
let appleImg;
let orangeImg;
let bananaImg; 

const buttons = [];

let saveButton;
let toggleFoodButton;

function preload(){
	saveButton = loadImage("/img/game/saveButton");
	toggleFoodButton = loadImage('/img/game/foodTypeButton.png');

	appleImg = loadImage("/img/game/Apple.png");
	orangeImg = loadImage("/img/game/Orange.png");
	bananaImg = loadImage("/img/game/Banana.png");
}
function setup(){
	const myCanvas = createCanvas(500,500);
	const myFood = new MyFood();
	buttons.push(new Button("togglefood", toggleFoodButton, 100, 75));
	buttons.push(new Button("save", saveButton, 400, 75));
	imageMode(CENTER);
}
function draw(){

	buttons.forEach( function(x){
		if(x.display()){
			if(x.name === "save"){
				const f = new Food({
					type: myFood.type,
					accessories: myFood.addons
				});
				f.save(function(err){
					if(err){
						alert("Error has occured in saving");
					}
					else{
						alert("Your food has been saved to the gallery!");
					}
				})
			}
			else if(x.name === "togglefood"){
				myFood.changeFood();
			}
		}
	});
	myFood.display();
	clicked = false;
}
function MyFood(info){
	this.display = function(){
		image(this.type + "img", 250, 250);
		for(let i = 0; i < this.addons.length; i++){
			image(this.addons[i].image, this.addons[i].xPos, this.addons[i].yPos);
		}
	}
	this.changeFood = function(){
		this.dictionaryIterator+1 === foodDictionary.length ? this.dictionaryIterator=0 : this.dictionaryIterator+=1;
		this.type = foodDictionary[dictionaryIterator]; 
	}
	if(!info){
		this.addons = [];
		this.name = "";
		this.dictionaryIterator = 0;
		this.type = foodDictionary[0];
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
function Accessory(type, x, y){

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