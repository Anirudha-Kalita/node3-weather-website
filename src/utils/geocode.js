const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYW5pNDEiLCJhIjoiY2s3dnNqazByMDBkaTNmdDdrb285cGx0NiJ9.INftc64KvnoOjqaP-bQ9YQ&limit=1'

    request({url, json:true},(error,{body}) => {
        if(error){
            callback('Unable to Connect to Weather Service !',undefined)
        }else if(body.features.length === 0){
            callback('Unable to Find Location ! Try Again with Another Search !',undefined)
        }else{
            callback(undefined,{
                latitude : body.features[0].geometry.coordinates[1],
                longitude : body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode