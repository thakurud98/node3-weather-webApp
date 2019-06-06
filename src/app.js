const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require("../utills/geocode")
const forecast = require("../utills/forecast")

//Paths for express  config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views/")
const partialsPath = path.join(__dirname, "../templates/partials/")

//setup handlebars view engine and location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static dir to server
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Uday'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Uday'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        msg: 'Help me out',
        name: 'Uday'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : true,
            errorMessage : "You must provide address"
         })
     }
     geocode(req.query.address, (error, {latitude, longtitude, location}={}) => {
        if (error) {
            return res.send({
                error : true,
                errorMessage : error
             })
        }
        forecast(latitude, longtitude, (error, forcastData) => {
            if (error) {
                return res.send({
                    error : true,
                    errorMessage : error
                 })
            }
            res.send({
                forecast: forcastData,
                location,
                address: req.query.address,
                name: 'Uday'
            })
        })

    })
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error : "Provide search"
        })
    }
    res.send({
        products :[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Uday',
        errorMessage: 'Help articale not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Uday',
        errorMessage: 'Page not found'
    })
})

app.listen(4000, () => {
    console.log("server is running on 4000...")
})