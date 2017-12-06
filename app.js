const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./db');
const Testimonial = mongoose.model("Testimonial");
const Accessory = mongoose.model("Accessory");
const Food = mongoose.model("Food");
const User = mongoose.model("User");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const session = require('express-session');

const sessionOptions = {
  secret: 'secret for signing session id',
  saveUninitialized: false,
  resave: false
};
app.use(session(sessionOptions));

const displayMessages = [];
displayMessages.push("Where dreams become reality");
displayMessages.push("Kid tested, mom approved.");
displayMessages.push("Nothing but the best.");
displayMessages.push("Satisfaction guaranteed.");
displayMessages.push("Mmm, tasty!");
displayMessages.push("Now with ten times the spice!");
displayMessages.push("Pushing science to the limit!");
displayMessages.push("The secret's in the sauce.");
displayMessages.push("Teaching you to live your life to the fullest.");
displayMessages.push("Are you ready to be in the next generation of innovators?");
displayMessages.push("Bada bing, bada FOOD!");
displayMessages.push("Witness the miracle of life, right here.");
displayMessages.push("The only way to get your vitamins and minerals");

const getDisplayMessage = function(req, res, next){
	const rand = Math.floor(Math.random() * 13);
	req.displayMessage = displayMessages[rand];
	next();
}

const p5 = [];
p5.push("p5.min.js");
p5.push("p5.dom.js");
p5.push("p5.sound.js");
p5.push("sketch.js");
p5.push("buttonListeners.js");

const path = require('path');
const public = path.resolve(__dirname, 'public');
const bodyParser =  require('body-parser');
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(public));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(getDisplayMessage);

//Setup passport
passport.use(new GoogleStrategy({
	clientID: "259868719807-b78pc296uksbcf4so63k8dsvfbknt92t.apps.googleusercontent.com",
	clientSecret: "g-IO59l_ajMvlZyHDvi-d1c_",
	callbackURL: "/auth/google/callback"
},
	function(accessToken, refreshToken, profile, done) {
		User.findOrCreate({ googleId: profile.id, displayName: profile.displayName}, function (err, user) {
			return done(err, user);
		});
	}
));
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
    done(err, user);
  });
});
//Set view engine
app.set('view engine', 'hbs');

app.get('/auth/google',
	passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
app.get('/auth/google/callback', 
	passport.authenticate('google', { failureRedirect: '/login' }),
	function(req, res) {
		res.redirect('/');
});
app.get('/', (req, res)=>{
	//redirect to home
	res.redirect('/home');
});
app.get('/home', (req, res)=>{
	//display home page
	if(req.user){
		res.render('home', {user: req.user, message: req.displayMessage});
	}
	else{
		res.render('home', {message: req.displayMessage});	
	}
});
app.get('/login', (req, res)=>{
	//Login page displayed if user is logged out, else redirect to the home page
	if(req.user){
		res.render('login', {user: req.user, message: req.displayMessage});
	}
	else{
		res.render('login', {message: req.displayMessage});	
	}
});
app.get('/logout', function(req, res) {
    req.session.destroy(function(e){
        req.logout();
        res.redirect('/');
    });
});
app.get('/gallery', (req, res)=>{
	//Displays the gallery containing all of the fruit pics.
	//Can be viewed by users not logged in
	Food.find((err, food)=>{
		if(err){
			console.log(err.message);
		}
		else{
			if(req.user){
				res.render('gallery', {user: req.user, food: food, message: req.displayMessage});
			}
			else{
				res.render('gallery', {food: food, message: req.displayMessage});
			}
		}
	});
});
app.get('/myGallery', (req,res)=>{
	//Displays the user's personal gallery if logged in
	//Otherwise, displays a login page and tells the user they cannot access this until they log in
	if(req.user){
		res.render("myGallery", {user: req.user, food: req.user.images, message: req.displayMessage, myGal: "yes"});
	}
	else{
		res.redirect('/login');
	}
});
//Route handler to delete an entry
app.post('/myGallery', (req, res)=>{
	if(req.body.id){
		console.log(req.body.id);
		console.log(req.user.images);
		req.user.images.id(req.body.id).remove();
		req.user.save(function(err){
			if(err){
				console.log("Error in saving user object");
			}
			else{
				console.log("Saved successfully");
			}
		});
		Food.remove({_id: req.body.id}, function(err){
			if(err){
				console.log("Error in removing from collection");
			}
			else{
				console.log("Successfully removed entry");
			}
		});
	}
	res.redirect('/myGallery');
});
app.get('/about', (req, res)=>{
	//Displays the about page with "user testimonials"
	if(req.user){
		res.render('about', {user: req.user, message: req.displayMessage});
	}
	else{
		res.render('about', {message: req.displayMessage});
	}
});
app.get('/testimonials', (req, res)=>{
	Testimonial.find((err, testimonials)=>{
		if(err){
			console.log(err.message);
		}
		else{
			if(req.user){
				res.render('testimonials', {testimonial: testimonials, user: req.user, message: req.displayMessage});
			}
			else{
				res.render('testimonials', {testimonial: testimonials, message: req.displayMessage});
			}
		}
	});
});
app.post('/newtestimonial', (req, res)=>{
	const newTest = new Testimonial({
		title: req.body.title,
		name: req.body.name,
		contents: req.body.contents,
		date: new Date().toString()
	});
	newTest.save((err)=>{
		if(err){
			console.log(err.message);
		}
		res.redirect('/testimonials');
	});
});
app.get('/createafruit', (req,res)=>{
	//If the use is logged in, display the page
	//containing the front end p5 that allows
	//the user to decorate a fruit.

	//If the user is not logged in, instead redirect them to a login page
	if(req.user){
		res.render('createafruit', {p5: p5, user: req.user, message: req.displayMessage});
	}
	else{
		res.redirect('login');
	}
});
app.post('/createafruit', (req, res)=>{
	let newAcc = [];
	if(req.body.accessories){
		const accs = JSON.parse(req.body.accessories);
		for(let i = 0; i < accs.length; i++){
			const a = new Accessory({
				type: accs[i].type,
				name: `/img/game/${accs[i].type}s/${accs[i].type}${accs[i].num}.png`,
				xPos: (accs[i].x)/2,
				yPos: (accs[i].y)/2
			});
			newAcc.push(a);
			console.log(a);
		}
	}
	const f = new Food({
		foodType: req.body.type,
		accessories: newAcc, 
		user: req.user.displayName
	});
	f.save(function(err){
		if(err){
			console.log("Error has occured in saving");
		}
		else{
			console.log("Your food has been saved to the gallery!");
		}
	});
	req.user.images.push(f);
	req.user.save(function(err){
		if(err){
			console.log("Error has occured in saving to your gallery");
		}
		else{
			console.log("Your food has been saved to your gallery");
		}
	});
	res.redirect('/createafruit');
});

app.listen(process.env.PORT || 3000);