const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')


// console.log(__dirname)
// // console.log(__filename)

// console.log(path.join(__dirname, '..', 'public'))

// define project paths
const public_path = path.join(__dirname, '..', 'public')
const views_path = path.join(__dirname, '..', 'templates', 'views')
const partials_path = path.join(__dirname, '..', 'templates', 'partials')

var app = express()
var port = process.env.PORT || 3000

// set up handlebars 
app.set('view engine', 'hbs') 
app.set('views', views_path)
hbs.registerPartials(partials_path) 

// set up public directory to use
app.use(express.static(public_path))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        header: 'Weather',
        creator: 'Me'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        header: 'About this Site',
        creator: 'Me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        header: 'Help',
        helpText: 'testing help paragraph',
        creator: 'Me'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'Address must be provided'
        })
        return
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            res.send({
                error
            })
        } else {
            forecast(longitude, latitude, (error, {temp, precipProbability, daily_summary} = {}) => {
                if (error) {
                    res.send({
                        error
                    })
                } else {
                    res.send({
                        location,
                        forecast: daily_summary,
                        address: req.query.address
                    })
                }
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        header: '404 Page Not Found',
        err_msg: 'Help article not found.',
        creator: 'Me'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        header: '404 Page Not Found',
        err_msg: 'Page not found.',
        creator: 'Me'
    })
})

// start the server
app.listen(port, () => {
    console.log('Server listening on port', port)
})