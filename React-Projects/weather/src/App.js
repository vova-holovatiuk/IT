//ТАК ВОВАН, ОПИШИ ЗАВТРА МАССИВ ИЗ ТРЁХ ГОРОДОВ МБ 4-х, СОЗДАЙ ОТДЕЛЬНЫЙ ФАЙЛ ОПИШИ ИХ ТАМ, И ВЫЗОВИ В РЕНДЕРЕ ВНИЗУ
import React, { Component } from 'react'
import './App.css';
import Info from './components/Info'
import Form from './components/From'
import Weather from './components/Weather'
import WeekContainer from './WeekContainer';
// import Components from './navigation/Components';

const API_KEY = "733ec941db986633490b44c998a85cee";

class App extends React.Component{


    state = {
        weatherData: undefined,
        // icon: undefined,
        temp: undefined,
        city: undefined,
        country: undefined,
        temp_min: undefined,
        temp_max: undefined,
        speed: undefined,
        error: undefined
    }

gettingWeather = async(e) =>{
e.preventDefault();
var city = e.target.elements.city.value;
   
    // console.log(data);

    if(city){
        const api_url = await 
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await api_url.json();
        console.log(data);
    //     var sunset = data.sys.sunset;
    //     var date = new Date ();
    //     date.setTime(sunset);
    //     var sunset_date = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();


    // var sunrise = data.sys.sunrise;
    // var date = new Date ();
    // date.setTime(sunrise);
    // var sunrise_date = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

 this.setState({
weatherData: data.weather[0].description,
// icon: data.weather[0].png,
temp: data.main.temp,
city: data.name,
country: data.sys.country,
temp_min: data.main.temp_min,
temp_max: data.main.temp_max,
speed: data.wind.speed,
error: undefined
    });
} else{
    this.setState({
        weatherData: undefined,
        icon: undefined,
        temp: undefined,
        city: undefined,
        country: undefined,
        temp_min: undefined,
        temp_max: undefined,
        speed: undefined,
        error: "Enter the name of the city"
        
});

} 

}

    render (){
    return(
        <div className="App">
<div className='wrapper'>
    <div className='main'>
 <div className='container'>
     <div className='row'>
     <div className='col-sm-5 info' >
     <Info />
     </div>
     <div className = 'col-sm-7 form'>
     <Form weatherMethod = {this.gettingWeather} />
    <Weather 
    weatherData={this.state.weatherData}
    // icon={this.state.icon}
    temp={this.state.temp}
    city={this.state.city}
    country={this.state.country}
    temp_min={this.state.temp_min}
    temp_max={this.state.temp_max}
    speed={this.state.speed}
    error={this.state.error}
    />
     </div>
     < WeekContainer />
     </div>
 </div>
 </div>
</div>
</div>
    );
}

}

export default App;