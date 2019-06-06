const request  = require("request");


const token = "pk.eyJ1IjoidGhha3VydWQ5OCIsImEiOiJjancwYnhvZ3kwOHFjNDhvMmdmbnZrNTRlIn0.vYQUsuwSHoHWryCiFBgH4A"

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=" + token
    setTimeout(() => {

    })
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to API", undefined)
        } else if (response.body.error) {
            callback("Unable to find location", undefined)
        } else if (response.statusCode !== 200) {
            callback(response.body.message, undefined)
        }
        else if (response.body.features.length <= 0) {
            callback("Unable to find location, Search with correct term", undefined)
        }
        else {
            callback(undefined, {
                "latitude": response.body.features[0].center[1],
                "longtitude": response.body.features[0].center[0],
                "location": response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode