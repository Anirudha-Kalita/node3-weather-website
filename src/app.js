const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//Define path for expres config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup handlbars engine and views,partials location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Page get Request
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        msg: 'Use This site to get your Weather !',
        name: 'Anirudha Kalita'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Anirudha Kalita'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        msg: 'How Can I Help You...',
        name: 'Anirudha Kalita'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address !'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({ error }) 
        }
        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({ error }) 
            }
            res.send({
                forcast: forecastData,
                location,
                address: req.query.address
            })
        })
    }) 
})


app.get('/help/*',(req,res)=>{
    res.render('page_not_found',{
        title: '404',
        errorMsg: 'Help article Not Found',
        name: 'Anirudha Kalita'
    })
})

app.get('*',(req,res)=>{
    res.render('page_not_found',{
        title: '404',
        errorMsg: 'Page Not Found',
        name: 'Anirudha Kalita'
    })
})

//expres start
app.listen(port, ()=>{
    console.log('Server is up on '+ port)
})