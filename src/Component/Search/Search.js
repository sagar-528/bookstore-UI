import React, { Component } from 'react'
import DashBoard from '../DashBoard/DashBoard'
import HTTPServices from '../../HTTPServices'
import Headerbar from '../Header/Headerbar';
import Bookview from '../BookView/Bookview';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Footer from '../Footer/Footer';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const useStyles = createMuiTheme({
    root: {
        flexGrow: 1
    }
});

var data = new HTTPServices();
export class Search extends Component {
    constructor() {
        super()
        this.state = {
            books: [],
            searchText: ''
        }
    }

    handleOnHoverCard = () => {
        this.setState({
            cardHover: !this.state.cardHover
            
        })
    }

    componentDidMount() {
        data.fetchgetAllBook(response => {
            console.log(response)
            this.setState({
                books: response
            })
        })
    }

    handleChangeSearchText = async(e) => {
       await this.setState({
            searchText: e.target.value
        })
        if (this.state.searchText !== '') {
            data.fetchAllSearchBook(this.state.searchText, response => {
                console.log(this.state.searchText)
                this.setState({
                    books: response
                })
            })
        }
    }

    handleClickAddToCart = (e) => {
        data.addToCart(101, e, 1)
        console.log("sagar", e);
    }

handleClickAddToWishList = (e) => {
            data.addToWishList(101,e)
            console.log("sagar", e);
            
        }

    render() {
        return (
        <div>
            <Headerbar />
                <input style={{ marginLeft: '200px', height: '30px', width: '550px', fontFamily: 'fontawesome', marginBottom: '35px', marginTop:'35px' }} type='text' placeholder=' &#xf002; Search here...' onChange={(e) => this.handleChangeSearchText(e)} />
                <div style={{display:'flex', flexWrap: 'wrap', marginLeft:'35px',flexDirection:'row', justifyContent: 'space-evenly'}} >
                {this.state.books.map((book) =>
                <div onMouseOver= {() => this.handleOnHoverCard()} onMouseOut={() => this.handleOnHoverCard()} >
                <Card className="card"  id="info" variant="outlined">
                    <CardActionArea>
                        <div className="divName">
                            <img src={book.picPath} width="100px" height="130px" ></img>
                        </div>

                    </CardActionArea>
                    <div className="BookDetail">
                        <div className="BookTitle">
                            <span>{book.nameOfBook}</span>
                        </div>
                        <div className="BookAuthor">
                            <span>by {book.author}</span>
                        </div>
                        <div className="BookPrice">
                            <span>Rs. {book.price}</span>
                        </div>
                    </div>

                    <div className="BookButtons">
                        <Button variant="outlined" style={{ backgroundColor: '#A03037', color: 'white', width: '40%', height: '10%', fontSize: '10px' }}
                        onClick={() => this.handleClickAddToCart(book.id)} > buynow</Button>
                    <Button variant="outlined" style={{ width: '40%', height: '10%', fontSize: '10px' }}
                    onClick={() => this.handleClickAddToWishList(book.id)}> wishlist </Button>
                    </div>
                    <Card id="bookInfo" variant="outlined">
                        <CardContent>
                            <Typography color="textPrimary" style={{ fontFamily: 'Arial', fontSize: 16, fontWeight: 600 }} gutterBottom>
                                Book Detail
                            </Typography>
                            <Typography color="textSecondary" style={{ fontSize: 12, textAlign: 'initial' }} gutterBottom>
                                {book.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Card>
            </div>
            )}
            </div>
            </div>
        );
    }
}

export default Search
