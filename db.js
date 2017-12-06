//Make some schema stuff!
// db.js
const findOrCreate = require('mongoose-findorcreate');
const mongoose = require('mongoose');
//my schema goes here!
const Accessory = new mongoose.Schema({
  xPos: Number, //number representing x coordinate of the accessory on the fruit image
  yPos: Number, //number representing y coordinate of the accessory on the fruit image

  name: String, //string representing the name of the accessory

  xSize: Number, //number representing the width of the accessory
  ySize: Number //number representing the height of the accessory
});
const Food = new mongoose.Schema({
  user: String, //reference to a user object who created the fruit
  foodType: String, //type of fruit in the user's image
  accessories: [Accessory], //list of accessory objects
});
const Testimonial = new mongoose.Schema({
  title: String, //Title of the testimonial
	name: String, //Name representing the person who posted the testimonial
	contents: String,
	date: String //Date posted
});
const User = new mongoose.Schema({
  googleId: String,
  displayName: String,
  images: [Food]
});
User.plugin(findOrCreate);
mongoose.model('Accessory', Accessory);
mongoose.model('Food', Food);
mongoose.model('Testimonial', Testimonial);
mongoose.model('User', User);

let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 const fs = require('fs');
 const path = require('path');
 const fn = path.join(__dirname, 'config.json');
 const data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 const conf = JSON.parse(data);
 dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/final';
}
mongoose.connect(dbconf);