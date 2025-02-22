const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, "/views/partials"));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.all("/beers", async(req, res)=>{
  try{
    const getBeer = await punkAPI.getBeers();
    console.log(getBeer)
    res.render("beers", {getBeer})

  }
  catch(error){
    res.send(error)
  }
})

app.all("/random-beer", async(req, res)=>{
  try{
    const getRandomBeer = await punkAPI.getRandom();
    res.render("random-beer", {getRandomBeer})
  }
  catch(error){
    res.send(error)
  }
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
