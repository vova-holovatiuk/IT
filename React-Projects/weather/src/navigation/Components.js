import React, {Component} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'
import Home from './Home'
import Cities from './Cities'

class Components extends Component{
    constructor (props){
        super(props);
        this.state = {

        };
    }

    render (){
        return(
            <Router>
            <div>
                <nav>
                    <ul>
            <li><Link to='./Home.js'>Home</Link></li>
            <li><Link to ='./Cities.js'>Cities</Link></li>
            {/* <li><Link to='../components/Info.js'>Info</Link></li> */}
            </ul>
            </nav>
            <Switch>
                <Route path='./Cities.js'>
                <Cities/>
                </Route>
                {/* <Route path='../components/Info.js'> */}
                {/* <Info/> */}
                {/* </Route> */}
                <Route path='./Home.js'>
                <Home/>
                </Route>
            </Switch>
            </div>
        </Router>
        )
    }
}

export default Components;