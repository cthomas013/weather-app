const request = require('request')

const geocode = (address, callback) => {
    const mapbox_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY3Rob21hczAxMyIsImEiOiJjanprNmI5NWYwMnkyM2RvMjVvZmRlbWs3In0.5GmVdIviuY5jlKGEtr992g&limit=1'

    request({url: mapbox_url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Please try another search', undefined)
        } else {
            const location_data = {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            }
            callback(undefined, location_data)
        }
    })
}

module.exports = geocode