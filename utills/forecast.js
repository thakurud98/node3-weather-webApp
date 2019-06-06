const request = require("request");

const key = "335da3fa7fd974d632da011f274da1b0"
// si for celcius && lang for language
// const url = "https://api.darksky.net/forecast/"+key+"/37.8267,-122.4233?units=si"
const forecast = (lat, long, callback) => {
    const url = "https://api.darksky.net/forecast/" + key + "/" + lat + "," + long + "?units=si"
    request({ url: url, json: true }, (error, response) => {
        if (error && response.code !== 200) {
            callback("Unable to connect to API", undefined)
        } else if (response.body.error) {
            callback("Unable to find location", undefined)
        } else {
            let temp = response.body.currently.temperature
            let rainPercentage = response.body.currently.precipProbability
            callback(undefined, `${response.body.daily.data[0].summary} It is currently ${temp} degree out. There is ${rainPercentage}% chance of rain`)
        }
    })
}

module.exports = forecast