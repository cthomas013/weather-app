const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const darksky_url = 'https://api.darksky.net/forecast/c58ee6746374e5cbff33b3f318ef23b5/' + latitude + ',' + longitude

    request({url: darksky_url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find weather information for specified location', undefined)
        } else {
            const weather_data = {
                temp: body.currently.temperature,
                precipProbability: body.currently.precipProbability,
                daily_summary: body.daily.data[0].summary
            }
            callback(undefined, weather_data)
        }
    })
}

module.exports = forecast