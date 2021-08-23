const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocoding = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express();

// Define Paths For Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templets/views');
const partialPath = path.join(__dirname, '../templets/partials')

// setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ashiqur'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About!!',
        name:'Ashiqur'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ashiqur Rahman'
    })
})

app.get('/weather', (req, res) => {
	console.log(req.query.address)
	if(!req.query.address){
		return res.send({
			message:'Provide address'
		})
	}

	geocoding(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error) {
      return res.send({
				error
			})
    }
    
    forecast(latitude, longitude, (error,forecastData) => {
      if(error) {
        return res.send({
					error
				})
      }

      res.send({
				forecast: forecastData,
				location,
				address: req.query.address
			})
    })
  })
	
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        message:'Help article not found.',
        name:'Ashiqur Rahman'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        message:'Page not found',
        name:'Ashiqur Rahman'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})