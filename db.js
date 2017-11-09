//Make some schema stuff!
// db.js
var mongoose = require('mongoose');
//my schema goes here!
const Accessory = new mongoose.Schema({
  xPos: //number representing x coordinate of the accessory on the fruit image
  yPos: //number representing y coordinate of the accessory on the fruit image

  name: //string representing the name of the accessory

  xSize: //number representing the width of the accessory
  ySize: //number representing the height of the accessory
});
const Fruit = new mongoose.Schema({
  user: //reference to a user object who created the fruit
  fruitType: //type of fruit in the user's image
  accessories: //list of accessory objects
});

mongoose.model('Accessory', Accessory);
mongoose.model('Fruit', Fruit);

mongoose.connect('mongodb://localhost/final');