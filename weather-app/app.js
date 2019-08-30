const yargs = require('yargs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


// yargs.version('1.0.0')

// yargs.command({
//     command: 'location',
//     describe: 'Location that you want to gather weather information for',
//     builder:
// })


let location = process.argv[2]


if (location) {
    geocode(location, (error, {longitude, latitude, location}) => {
        if (error) {
            console.log(error)
        } else {
            forecast(longitude, latitude, (error, {daily_summary, temp, precipProbability}) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('The forecast for', location, 'is', daily_summary,  'The current temperature is', temp, 'degress, and there is a ' + precipProbability + '% chance of rain.')
                }
            })
        }
    })    
} else {
    console.log('Please provide an address')
}

