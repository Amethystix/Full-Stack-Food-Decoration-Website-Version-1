//Make some schema stuff!
// db.js
var mongoose = require('mongoose');
//my schema goes here!
const Accessory = new mongoose.Schema({
  xPos: Number, //number representing x coordinate of the accessory on the fruit image
  yPos: Number, //number representing y coordinate of the accessory on the fruit image

  name: String, //string representing the name of the accessory

  xSize: Number, //number representing the width of the accessory
  ySize: Number //number representing the height of the accessory
});
const Fruit = new mongoose.Schema({
  user: String, //reference to a user object who created the fruit
  fruitType: String, //type of fruit in the user's image
  accessories: [Accessory] //list of accessory objects
});
const Testimonial = new mongoose.Schema({
	name: String, //Name representing the person who posted the testimonial
	contents: String,
	date: Date //Date posted
});
mongoose.model('Accessory', Accessory);
mongoose.model('Fruit', Fruit);
mongoose.model('Testimonial', Testimonial)

mongoose.connect('mongodb://localhost/final');