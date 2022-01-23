import Action from '../Action.js';
import { randomChoice } from '../funcs.js';

/** Action for getting the weather. */
export default class WeatherAction extends Action {
    name = 'getWeather';
    description = 'tell you the weather of any city.'

    apiKey = '218384b7d7d6b68594568b84c03237e2'; // Please don't abuse. ty.

    firstMessage = (
        'Sounds like you want the weather. Please enter ONLY the name of the city ' +
        'You want the weather forecast for.'
    )

    errorMessage = [
        'Hmm. Something went wrong making that request. Is your spelling correct?',
        'I couldn\'t make that request for some reason. Did you spell the city name correctly?'
    ]

    async act()
    {
        let callback = (inputText) => { this.handleInput(inputText); }
        this.chatbot.speak(this.firstMessage);
        this.chatbot.prompt(callback);
    }

    get(cityName)
    {
        return new Promise((resolve, reject) => {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiKey}`;
            let req = new XMLHttpRequest();
            req.open('GET', url);
            req.onload = () => resolve(req);
            req.onerror = () => reject(req);
            req.send();
        });
    }

    ToCelsius(f)
    {
        return parseFloat((f - 32) * 5 / 9);
    }

    getWeatherMessage(responseData)
    {
        return (
            `The weather description for ${responseData.name} is ${responseData.weather[0].main.toLowerCase()} ` +
            `with a ${responseData.weather[0].description}. The temperature is currently ` +
            `${responseData.main.temp}°C.`
        )
    }

    async handleInput(inputText)
    {

        if(inputText === ''){ this.sayError(); }

        let cityName = inputText[0].toUpperCase() + inputText.slice(1); // Capitalize first letter for api.
        this.get(cityName)
        .then((req) => {
            if(req.status >= 200 && req.status < 300){
                let responseData = JSON.parse(req.response);
                this.chatbot.speak(this.getWeatherMessage(responseData));
            }
            else {
                this.sayError();
            }
        })
        .catch(() => {
            this.sayError()
        });
    }

    sayError()
    {
        this.chatbot.speak(randomChoice(this.errorMessage));
    }
}
