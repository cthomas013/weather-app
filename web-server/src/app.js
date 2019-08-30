const path = require('path')
const express = require('express')
const hbs = require('hbs')

// console.log(__dirname)
// // console.log(__filename)

// console.log(path.join(__dirname, '..', 'public'))

// define project paths
const public_path = path.join(__dirname, '..', 'public')
const views_path = path.join(__dirname, '..', 'templates', 'views')
const partials_path = path.join(__dirname, '..', 'templates', 'partials')

var app = express()

// set up handlebars 
app.set('view engine', 'hbs') 
app.set('views', views_path)
hbs.registerPartials(partials_path) 

// set up public directory to use
app.use(express.static(public_path))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Express Homepage',
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

    res.send({
        address: req.query.address
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'Must provide a search term'
        })
        return
    }

    res.send({
        products: []
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
app.listen(3000, () => {
    console.log('Server listening on port 3000')
})