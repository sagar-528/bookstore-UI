import React, { Component } from 'react'

export class Bookview extends Component {
    render() {
        return (  
                <div>
                <Card className="card"  id="info" variant="outlined">
                    <CardActionArea>
                        <div className="divName">
                            <img src="http://books.google.com/books/content?id=GHt_uwEACAAJ&printsec=frontcover&img=1&zoom=5,193" width="100px" height="130px" ></img>
                        </div>

                    </CardActionArea>
                    <div className="BookDetail">
                        <div className="BookTitle">
                            <span>The Girl in Room 105</span>
                        </div>
                        <div className="BookAuthor">
                            <span>by Chetan Bhagat</span>
                        </div>
                        <div className="BookPrice">
                            <span>Rs. 193</span>
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
                            Hi, I'm Keshav, and my life is screwed. I hate my job and my girlfriend left me. Ah, the beautiful Zara. Zara is from Kashmir. She is a Muslim. And did I tell you my family is a bit, well, traditional? Anyway, leave that. Zara and I broke up four years ago. She moved on in life. I didn''t. I drank every night to forget her. I called, messaged, and stalked her on social media. She just ignored me. However, that night, on the eve of her birthday, Zara messaged me. She called me over, like old times, to her hostel room 105. I shouldn''t have gone, but I did... and my life changed forever. This is not a love story. It is an unlove story.From the author of Five Point Someone and 2 States, comes a fast-paced, funny and unputdownable thriller about obsessive love and finding purpose in life against the backdrop of contemporary India.
                            </Typography>
                        </CardContent>
                    </Card>
                </Card>
            </div>
        )
    }
}

export default Bookview
