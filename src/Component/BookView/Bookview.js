import React, { Component } from 'react'
import './Book.css'
import Button from '@material-ui/core/Button';
import HTTPServices from '../../HTTPServices'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

var book = new HTTPServices();
export class Bookview extends Component {
    constructor(props) {
        super(props)
        this.state = { cardHover: false }
    }

    isLoggedIn = () => {
        return !!localStorage.getItem("token");
    }

    handleClickAddToCart = async (e) => {
        if (!this.isLoggedIn()) {
            this.props.history.push('/UserLogin');
            return;
        }
        await book.addToCart(e, 1)
        book.fetchAllCartBook(response => {
            this.props.dispatch({ type: "methodCalled", payload: response.length })
        })
    }

    handleClickAddToWishList = async (e) => {
        if (!this.isLoggedIn()) {
            this.props.history.push('/UserLogin');
            return;
        }
        await book.addToWishList(0, e)
        book.fetchAllWishlistBooks(response => {
            this.props.dispatch({ type: "wishListUpdate", payload: response.length })
        })
    }

    render() {
        const { data } = this.props;
        return (
            <div className="book-card">
                <div className="book-image-wrap">
                    <img src={data.picPath} alt={data.nameOfBook} />
                </div>
                <div className="book-info">
                    <div className="book-title">{data.nameOfBook}</div>
                    <div className="book-author">by {data.author}</div>
                    <div className="book-price">Rs. {data.price}</div>
                </div>
                <div className="book-actions">
                    <Button className="btn-buy" variant="contained"
                        onClick={() => this.handleClickAddToCart(data.id)}>
                        Add to Cart
                    </Button>
                    <Button className="btn-wishlist" variant="outlined"
                        onClick={() => this.handleClickAddToWishList(data.id)}>
                        Wishlist
                    </Button>
                </div>
                <div className="book-detail-popup">
                    <h4>Book Detail</h4>
                    <p>{data.description}</p>
                </div>
            </div>
        )
    }
}

export default withRouter(connect()(Bookview))
