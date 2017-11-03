const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const public = path.resolve(__dirname, 'public');
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
	res.render('home');	
});
app.get('/login', (req, res)=>{
	//Login page displayed if user is logged out, else redirect to the home page
	res.render('login');
});
app.get('/gallery', (req, res)=>{
	//Displays the gallery containing all of the fruit pics.
	//Can be viewed by users not logged in
	res.render('gallery');
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
app.get('/createafruit', (req,res)=>{
	//If the use is logged in, display the page
	//containing the front end p5 that allows
	//the user to decorate a fruit.

	//If the user is not logged in, instead redirect them to a login page
	res.render('createafruit')
});
/*app.get('/register', (req, res)=>{
	//Registration page; might not exist if I only do logging in with Google
	res.render('register');
}); */

app.listen(3000);