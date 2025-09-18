import { LightningElement, track } from 'lwc';
import getWeatherData from '@salesforce/apex/WeatherApiController.getWeatherData';
import saveWeather from '@salesforce/apex/SimpleWeatherHandler.saveWeather';
import getWeatherReports from '@salesforce/apex/WeatherDataListController.getWeatherReports';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'; //Importing Toast event to show popup notifications in the UI

export default class WeatherAPIApp extends LightningElement {
    //Declaring variables
    city;
    weatherIcon;
    weatherText;
    isLoading = false;
    @track WeatherReports = [];

    //Updates city when user types into input box
    handleCity(event) {
        this.city = event.target.value;
    }

    //Shows spinner when Fetch Weather is clicked
    handleGetWeather() {
        this.isLoading = true;
        //Calls Apex method getWeatherData with city input
        getWeatherData({ city: this.city })
            //Parses JSON response
            //Sets weatherIcon and weatherText with data from API
            .then(response => {
                let weatherParseData = JSON.parse(response);
                this.weatherIcon = 'https:' + weatherParseData.current.condition.icon;
                this.weatherText = weatherParseData.current.condition.text;
            })
            //If API fails — shows fallback message and logs error
            .catch(error => {
                this.weatherText = 'No matching location or City found.';
                console.error('--- error-->', JSON.stringify(error));
            })
            //Hides spinner after operation finishes
            .finally(() => {
                this.isLoading = false;
            });
    }

    //Called when Save Weather to Org button is clicked
    handleSaveWeatherToOrg() {
    //Logs entered data and shows spinner
    console.log('City:', this.city);
    console.log('Condition:', this.weatherText);
    this.isLoading = true;
    //Calls Apex to save weather using Queueable in backend
    saveWeather({ city: this.city, condition: this.weatherText })
        //On success, logs success, shows toast, refreshes weather list
        .then(() => {
            console.log('Weather Data Saved Successfully');
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Weather data saved successfully!',
                    variant: 'success'
                })
            );
            this.fetchWeatherReports();
        })
        //On error, shows error toast and logs
        .catch(error => {
            console.error('Error:', JSON.stringify(error));
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Failed to save weather data.',
                    variant: 'error'
                })
            );
            console.error('Error:', error);
        })
        //Hides spinner after completion
        .finally(() => {
            this.isLoading = false;
        });
}

//When component loads → Fetch existing weather records
connectedCallback(){
    this.fetchWeatherReports();
}

//Calls Apex to get saved weather records from Salesforce
//Stores result in weatherReports or logs error
fetchWeatherReports(){
    getWeatherReports()
        .then(result => {
            this.weatherReports = result;
        })
        .catch(error => {
            console.error('Error fetching weather reports', error);
        });
    }
//Refreshes the weather list when Refresh button is clicked
    handleRefresh(){
        this.fetchWeatherReports();
    }
}

/*import { LightningElement } from 'lwc';
import getWeatherData from '@salesforce/apex/WeatherApiController.getWeatherData';
import saveWeatherData from '@salesforce/apex/WeatherDataHandler.saveWeatherData';

export default class WeatherAPIApp extends LightningElement {
    city;
    weatherIcon;
    weatherText;

    handleCity(event) {
        this.city = event.target.value;
    }

    handleGetWeather(){
        getWeatherData({city: this.city})
        .then(response=>{
            let weatherParseData = JSON.parse(response);
            this.weatherIcon = 'https:' + weatherParseData.current.condition.icon;
            this.weatherText = weatherParseData.current.condition.text;
        })
        .catch(error => {
            this.weatherText = 'No matching location or City found.';
            console.error('--- error-->', JSON.stringify(error));
        });
    }

     handleSaveWeatherToOrg() {
        const weatherData = {
            city: this.city,
            condition: this.weatherText
        };
        console.log('city' , weatherData.city);
        console.log('condition', weatherData.condition);
        console.log('weather data', JSON.stringify(weatherData));
        saveWeatherData({ weatherInfo: JSON.stringify(weatherData) })
            .then(() => {
                //console.log('My Weather Info', weatherInfo);
                console.log('Weather Data Saved Successfully');
            })
            .catch(error => {
                console.error('Error:', JSON.stringify(error));
            });

    }
}*/