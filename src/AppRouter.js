import DashBoard from './Component/DashBoard/DashBoard'
import { BrowserRouter, Route, Switch, Router} from 'react-router-dom'
import React, { Component } from 'react'
import Cart from './Component/Cart/Cart'
import WishList from './Component/WishList/WishList'
import ConfirmOrder from './Component/ConfirmOrder/ConfirmOrder'

class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter>    
                <div>
                    <Switch>
                        <Route path="/" component={DashBoard} exact="true" /> 
                        <Route path="/Cart" component={Cart} />
                        <Route path="/WishList" component={WishList} /> 
                        <Route path="/ConfirmOrder" component={ConfirmOrder} />
                    </Switch>      
                </div>
            </BrowserRouter>
        )
    }
}

export default AppRouter
