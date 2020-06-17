import DashBoard from './Component/DashBoard/DashBoard'
import { BrowserRouter, Route, Switch, Router} from 'react-router-dom'
import React, { Component } from 'react'

class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter>    
                <div>
                    <Switch>
                        <Route path="/" component={DashBoard} exact="true" /> 
                    </Switch>      
                </div>
            </BrowserRouter>
        )
    }
}

export default AppRouter
