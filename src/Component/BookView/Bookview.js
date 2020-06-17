import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import './Book.css'
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export class Bookview extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             cardHover: false
        }
    }

    render() {
        return (  
                <div>
                <Card className="card"  id="info" variant="outlined">
                    <CardActionArea>
                        <div className="divName">
                            <img src={this.props.data.picPath} width="100px" height="130px" ></img>
                        </div>

                    </CardActionArea>
                    <div className="BookDetail">
                        <div className="BookTitle">
                            <span>{this.props.data.nameOfBook}</span>
                        </div>
                        <div className="BookAuthor">
                            <span>by {this.props.data.author}</span>
                        </div>
                        <div className="BookPrice">
                            <span>Rs. {this.props.data.price}</span>
                        </div>
                    </div>

                    <div className="BookButtons">
                        <Button variant="outlined" style={{ backgroundColor: '#A03037', color: 'white', width: '40%', height: '10%', fontSize: '10px' }} > buynow</Button>
                    <Button variant="outlined" style={{ width: '40%', height: '10%', fontSize: '10px' }}> wishlist </Button>
                    </div>
                    <Card id="bookInfo" variant="outlined">
                        <CardContent>
                            <Typography color="textPrimary" style={{ fontFamily: 'Arial', fontSize: 16, fontWeight: 600 }} gutterBottom>
                                Book Detail
                            </Typography>
                            <Typography color="textSecondary" style={{ fontSize: 12, textAlign: 'initial' }} gutterBottom>
                                {this.props.data.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Card>
            </div>
        )
    }
}

export default Bookview
