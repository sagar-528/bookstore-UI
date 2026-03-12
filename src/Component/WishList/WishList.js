import React, { Component } from 'react'
import Headerbar from '../Header/Headerbar'
import Button from '@material-ui/core/Button';
import HTTTPServices from '../../HTTPServices'
import Footer from '../Footer/Footer';
import { connect } from 'react-redux';
import './WishList.css'

var data = new HTTTPServices();
export class WishList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            wishlistBooks: []
        }
    }

    componentDidMount() {
        data.fetchAllWishlistBooks(response => {
            this.setState({ wishlistBooks: response })
            this.props.dispatch({ type: "wishListUpdate", payload: response.length })
        })
    }

    handleRemovebooks = (e) => {
        data.removeBookFromWishList(0, e).then(() => {
            data.fetchAllWishlistBooks(response => {
                this.setState({ wishlistBooks: response })
                this.props.dispatch({ type: "wishListUpdate", payload: response.length })
            })
        })
    }

    handleBookToCart = (e) => {
        data.addToCart(e, 1).then(() => {
            return data.removeBookFromWishList(0, e)
        }).then(() => {
            data.fetchAllWishlistBooks(response => {
                this.setState({ wishlistBooks: response })
                this.props.dispatch({ type: "wishListUpdate", payload: response.length })
            })
            data.fetchAllCartBook(response => {
                this.props.dispatch({ type: "methodCalled", payload: response.length })
            })
        })
    }

    render() {
        return (
            <div className="wishlist-page">
                <Headerbar />
                <div className="wishlist-content">
                    <div className="wishlist-section">
                        <div className="wishlist-header">My Wishlist ({this.state.wishlistBooks.length})</div>
                        <div className="wishlist-items">
                            {this.state.wishlistBooks.length === 0 && (
                                <div className="wishlist-empty">Your wishlist is empty.</div>
                            )}
                            {this.state.wishlistBooks.map(book => (
                                <div className="wishlist-item" key={book.id}>
                                    <img className="wishlist-item-image" src={book.picPath} alt={book.nameOfBook}/>
                                    <div className="wishlist-item-details">
                                        <div className="wishlist-item-title">{book.nameOfBook}</div>
                                        <div className="wishlist-item-author">by {book.author}</div>
                                        <div className="wishlist-item-price">Rs. {book.price}</div>
                                    </div>
                                    <div className="wishlist-item-actions">
                                        <Button variant="outlined" style={{ borderColor: '#C0392B', color: '#C0392B' }} onClick={() => this.handleRemovebooks(book.id)}>Remove</Button>
                                        <Button variant="contained" style={{ background: 'var(--primary)', color: 'white' }} onClick={() => this.handleBookToCart(book.id)}>Add to Cart</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default connect()(WishList)
