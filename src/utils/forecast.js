const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/40257c5102437e43aa067c1518f9db1d/'+ encodeURIComponent(latitude) + ','+ encodeURIComponent(longitude) +'?units=si'

    request({url, json:true},(error,{body}) => {
        if(error){
            callback('Unable to Connect to Weather Service !',undefined)
        }else if(body.error){
            callback('Unable to Find Location !',undefined)
        }else{
            callback(undefined,body.daily.data[0].summary + 'It is currently '+ body.currently.temperature+ ' degree out. There is a '+ body.currently.precipProbability + '% chance of Raining.')
        }
    })
}

module.exports = forecast