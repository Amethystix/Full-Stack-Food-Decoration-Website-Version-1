const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./db');
const Testimonial = mongoose.model("Testimonial");
const Food = mongoose.model("Food");
const passport = require('passport');
const jquery = require('jquery');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const p5 = [];
p5.push("p5.min.js");
p5.push("p5.dom.js");
p5.push("p5.sound.js");
p5.push("sketch.js");
p5.push("buttonListeners.js");

passport.use(new GoogleStrategy({
	clientID: "259868719807-b78pc296uksbcf4so63k8dsvfbknt92t.apps.googleusercontent.com",
	clientSecret: "g-IO59l_ajMvlZyHDvi-d1c_",
	callbackURL: "/auth/google/callback"
},
	function(accessToken, refreshToken, profile, done) {
		User.findOrCreate({ googleId: profile.id }, function (err, user) {
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

const path = require('path');
const public = path.resolve(__dirname, 'public');
const bodyParser =  require('body-parser');
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(public));
app.use(bodyParser.urlencoded({ extended: false}));
//Set view engine
app.set('view engine', 'hbs');

app.get('/', (req, res)=>{
	//redirect to home
	res.redirect('/home');
});
app.get('/home', (req, res)=>{
	//display home page
	// if(req.user){
	// 	res.render('home', {user: req.user.})
	// }
	// else{
	// 	res.render('home', {not: "no"});	
	// }
	res.render('home');
});
app.get('/login', (req, res)=>{
	//Login page displayed if user is logged out, else redirect to the home page
	res.render('login');
});
app.get('/gallery', (req, res)=>{
	//Displays the gallery containing all of the fruit pics.
	//Can be viewed by users not logged in
	Food.find((err, food)=>{
		if(err){
			console.log(err.message);
		}
		else{
			res.render('gallery', {food: food});
		}
	});
});
app.get('/myGallery', (req,res)=>{
	//Displays the user's personal gallery if logged in

	//Otherwise, displays a login page and tells the user they cannot access this until they log in
	res.render('myGallery');
});
app.get('/about', (req, res)=>{
	//Displays the about page with "user testimonials"
	res.render('about');
});
app.get('/testimonials', (req, res)=>{
	Testimonial.find((err, testimonials)=>{
		if(err){
			console.log(err.message);
		}
		else{
			res.render('testimonials', {testimonial: testimonials})
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
	
	res.render('createafruit', {p5: p5})
});
app.post('/createafruit', (req, res)=>{
	console.log(req.body);
	const f = new Food({
		foodType: req.body.type,
		accessories: req.body.accessories, 
	});
	f.save(function(err){
		if(err){
			console.log("Error has occured in saving");
		}
		else{
			console.log("Your food has been saved to the gallery!");
		}
	});
	res.redirect('/createafruit');
});
/*app.get('/register', (req, res)=>{
	//Registration page; might not exist if I only do logging in with Google
	res.render('register');
}); */

app.listen(process.env.PORT || 3000);