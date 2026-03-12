import React from 'react';
import Headerbar from '../Header/Headerbar';
import Footer from "../Footer/Footer";
import Gridview from '../GridView/Gridview';
import Pagination from '../Pagination/Pagination';
import Lowerbar from '../Lowerbar/Lowerbar';
import HTTPService from '../../HTTPServices'
import { connect } from 'react-redux'

var book = new HTTPService();
class DashBoard extends React.Component {

constructor(props) {
    super(props)
    this.state = {
      cartBookCount: 0,
      wishBookCount: 0,
      books: []
    }
    this.setbooks = this.setbooks.bind(this);
    this.setSearch = this.setSearch.bind(this);
}

componentDidMount() {
    book.fetchgetAllBook(response => {
        this.setState({ books: response })
    })
    book.fetchAllCartBook(response => {
        this.setState({ cartBookCount: response.length })
        this.props.dispatch({ type: "methodCalled", payload: response.length })
    })
    book.fetchAllWishlistBooks(response => {
        this.setState({ wishBookCount: response.length })
        this.props.dispatch({ type: "wishListUpdate", payload: response.length })
    })
}

setbooks(newbooks) {
    this.setState({ books: newbooks })
}

setSearch(searchbook) {
    this.setState({ books: searchbook })
}

    render() {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Headerbar function={this.setSearch} cartBookCount={this.state.cartBookCount} wishBookCount={this.state.wishBookCount} />
                <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto', padding: '0 24px', flex: 1 }}>
                    <Lowerbar data={this.state.books.length} function={this.setbooks}/>
                    <Gridview data={this.state.books} />
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}>
                        <Pagination />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default connect()(DashBoard)
