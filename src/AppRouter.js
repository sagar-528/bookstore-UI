import DashBoard from './Component/DashBoard/DashBoard'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React, { Component } from 'react'
import Cart from './Component/Cart/Cart'
import WishList from './Component/WishList/WishList'
import ConfirmOrder from './Component/ConfirmOrder/ConfirmOrder'
import UserLogin from './Component/UserLogin/UserLogin'
import SignUp from './Component/SignUp/SignUp'
import Headerbar from './Component/Header/Headerbar'
import ForgotPassword from './Component/ForgotPassword/ForgotPassword'
import RestPassword from './Component/ResetPassword/RestPassword'
import AdminDashboard from './Component/AdminDashboard/AdminDashboard'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const initialState = {
  cartCount: 0,
  wishListCount: 0
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "methodCalled":
      return {
        cartCount: action.payload,
        wishListCount: state.wishListCount
      }
    case "wishListUpdate":
      return {
        cartCount: state.cartCount,
        wishListCount: action.payload
      }
    default:
      return {
        cartCount: state.cartCount,
        wishListCount: state.wishListCount
      };
  }
}

const store = createStore(reducer);

class AppRouter extends Component {
    render() {
        return (
            <Provider store={store}>
            <BrowserRouter>    
                <div>
                    <Switch>
                        <Route path="/" component={DashBoard} exact="true" /> 
                        <Route path="/Cart" component={Cart} />
                        <Route path="/WishList" component={WishList} /> 
                        <Route path="/ConfirmOrder" component={ConfirmOrder} />
                        <Route path="/UserLogin" component={UserLogin} />
                        <Route path="/SignUp" component={SignUp} />
                        <Route path="/admin" component={AdminDashboard} />
                        <Route path="/header" component={Headerbar} />
                        <Route path="/ForgotPassword" component={ForgotPassword} />
                        <Route path="/ResetPassword/*" component={RestPassword} />
                    </Switch>      
                </div>
            </BrowserRouter>
            </Provider>
        )
    }
}

export default AppRouter
