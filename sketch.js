function preload(){

}
function setup(){
	imageMode(CENTER);
}
function draw(){

}
function MyFruit(info){
	this.display = function(){
		image(this.type + ".png", 375, 375);
	}
	if(!info){
		this.addons = [];
		this.name = "";
		this.type = "";
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