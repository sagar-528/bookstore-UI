import React from 'react';
import Headerbar from '../Header/Headerbar';
import Footer from "../Footer/Footer";
import Gridview from '../GridView/Gridview';
import Pagination from '../Pagination/Pagination';
import Lowerbar from '../Lowerbar/Lowerbar';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import HTTPService from '../../HTTPServices'
import { withRouter } from 'react-router';
import App from '../../App';


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
      console.log("wishupdate", action.payload)
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
};

const store = createStore(reducer);
var book = new HTTPService();
class DashBoard extends React.Component {

constructor(props) {
    super(props)
    this.state = {
      cartBookCount: "",
      wishBookCount: "",
        books: [],
        cartCount: 0,
        wishCount: 0
    }
    this.setbooks = this.setbooks.bind(this);
    this.setSearch = this.setSearch.bind(this);
}

 async componentDidMount() {
   await book.fetchgetAllBook(response => {
        console.log(response)
        this.setState({
            books: response,
            cartBookCount: response.length,
        })
    })
    await book.getAllCartBook(response => {
      this.props.dispatch({ type: "methodCalled", payload: response.length })
  })

     book.fetchAllWishlistBooks(response => {
        console.log(response)
        this.setState({
            wishlistBooks: response.length
        })
    })
}

setbooks(newbooks) {
    console.log('dashboard',newbooks);
    console.log('hi',this);
    this.setState({
        books: newbooks
    })
    console.log('bind',this.state.books)
}

setSearch(searchbook){
    console.log('dashboard',searchbook);
    console.log('hi',this);
    this.setState({
        books: searchbook
    })
    console.log('bind',this.state.books)
}
    render() {
        return (
            <Provider store={store} >
            <div>
                <Headerbar function={this.setSearch} cartBookCount={this.state.cartBookCount} wishBookCount={this.state.wishBookCount} />
                <div style={{ width: '74%', margin: 'auto' }}>
                <Lowerbar data={this.state.books.length} function={this.setbooks}/>
                <Gridview data={this.state.books} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3%', marginTop: '2%' }}>
                    <Pagination />
                </div>
                <Footer />
            </div>
           </Provider>
        );
    }

}

export default DashBoard