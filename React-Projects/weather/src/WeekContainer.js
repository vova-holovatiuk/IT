import React from 'react';
import Card from './Card';

const weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=Odessa&lang=eng&units=metric&APPID=733ec941db986633490b44c998a85cee";

class WeekContainer extends React.Component {
  state = {
    days: []
  }

  componentDidMount = () => {
    fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00"))
      this.setState({days: dailyData})
    })
  }

  formatCards = () => {
    return this.state.days.map((day, index) => <Card day={day} key={index}/>)
  }

  render() {
    return (
      <div className="">
      <h1 className="display-4 jumbotron">5 days weather forecast</h1>
      <h5 className="display-4 text-muted">Odessa</h5>
        <div className="row justify-content-center">

          {this.formatCards()}

        </div>
      </div>
    )
  }
}

export default WeekContainer
