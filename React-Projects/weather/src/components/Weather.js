import React from 'react'

const Weather = props => (
    <div className ='infoWeath'>
   {props.city && 
   <div>
       <h1>
        
       </h1>
   <p>Location: {props.city}, {props.country}</p>
   <p>Weather: {props.weatherData} {props.icon}</p>
    <p>Temperature: {props.temp}°С;  Min:{props.temp_min}°С;  Max:{props.temp_max}°С </p>
    <p>Wind speed: {props.speed}m/s</p>
    </div>
        }
    <p className='error'>{props.error}</p>
    </div>        
);

export default Weather;