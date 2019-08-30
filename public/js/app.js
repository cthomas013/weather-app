console.log('Client side js file loaded')

let weatherForm = document.querySelector('.locationForm')
let searchLocation = document.querySelector('.locationInput')
let locationMsg = document.querySelector('.locationMsg')
let errorMsg = document.querySelector('.errMsg')
let forecastMsg = document.querySelector('.forecastMsg')

const getWeather = (address) => {
    fetch('/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorMsg.textContent = data.error
            } else {
                locationMsg.textContent = data.location
                forecastMsg.textContent = data.forecast
            }
        })
    })
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    console.log('form submitted!')

    let location = searchLocation.value
    console.log('Getting weather forecast for', location)

    // get the weather forecast for the input location
    locationMsg.textContent = 'Loading ...'
    forecastMsg.textContent = ''

    getWeather(location)
})