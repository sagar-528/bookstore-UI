import React, { Component } from 'react'
import './Cart.css'
import Headerbar from '../Header/Headerbar';
import Footer from '../Footer/Footer';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from 'react-router-dom';
import HTTTPServices from '../../HTTPServices';


var data = new HTTTPServices();
export class Cart extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             booklist: [],
             placeOrder: true,
             customerDetails: false,
             orderSummery: false,
             editbutton: false,
             continue: true,
             fields: {},
             errors: {}
        }
        this.changeEvent = this.changeEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setEditable = this.setEditable.bind(this);
        this.checkout = this.checkout.bind(this);
    }

    componentDidMount() {
        data.fetchAllCartBook(response => {
            console.log(response)
            this.setState({
                booklist: response
            })
        })
    }

    handleRemoveBookFromOrder = (e) =>{
        data.removeBookFromCart(101,e,1)
        console.log(e);
        window.location.reload(false);
    }
    
    setEditable() {
        this.setState({
            disabled: false,
            continue: true,
            orderSummery: !this.state.orderSummery,
            editbutton: !this.state.editbutton
        })
    }

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });
    
    }
    
    changeEvent() {
        this.setState({
            customerDetails: !this.state.customerDetails,
            placeOrder: !this.state.placeOrder,
        })
    }

    checkout() {
        if (this.validateForm()) 
            {
                console.log("form submitted");
                this.setState({
                    orderSummery: !this.state.orderSummery,
                    continue: !this.state.continue,
                    editbutton: !this.state.editbutton
                })
            }
        }

        validateForm() {
            let fields = this.state.fields;
            let errors = {};
            let formIsValid = true;
    
            if (!fields["name"]) {
                formIsValid = false;
                errors["name"] = "*Please enter your name.";
            }
    
            if (typeof fields["name"] !== "undefined") {
                if (!fields["name"].match(/^[a-zA-Z]{3,}$/)) {
                    formIsValid = false;
                    errors["name"] = "*Please enter alphabet only.";
                }
            }
    
            if (!fields["mobile"]) {
                formIsValid = false;
                errors["mobile"] = "*Please enter your mobile no.";
            }
    
            if (typeof fields["mobile"] !== "undefined") {
                if (!fields["mobile"].match(/^[0-9]{10}$/)) {
                    formIsValid = false;
                    errors["mobile"] = "*Please enter valid mobile no.";
                }
            }
    
            if (!fields["landmark"]) {
                formIsValid = false;
                errors["landmark"] = "*Please enter your landmark.";
            }
    
            if (typeof fields["landmark"] !== "undefined") {
                if (!fields["landmark"].match(/^[a-zA-Z ]{3,}$/)) {
                    formIsValid = false;
                    errors["landmark"] = "*Please enter valid landmark.";
                }
            }
        
            if (!fields["city"]) {
                formIsValid = false;
                errors["city"] = "*Please enter your city.";
            }
    
            if (typeof fields["city"] !== "undefined") {
                if (!fields["city"].match(/^[a-zA-Z ]{3,}$/)) {
                    formIsValid = false;
                    errors["city"] = "*Please enter valid city.";
                }
            }
    
            if (!fields["address"]) {
                formIsValid = false;
                errors["address"] = "*Please enter your address.";
            }
    
            if (typeof fields["address"] !== "undefined") {
                if (!fields["address"].match(/^[a-zA-Z0-9.,-:() ]{5,}$/)) {
                    formIsValid = false;
                    errors["address"] = "*Please enter valid address.";
                }
            }
    
            if (!fields["locality"]) {
                formIsValid = false;
                errors["locality"] = "*Please enter your locality.";
            }
    
            if (typeof fields["locality"] !== "undefined") {
                if (!fields["locality"].match(/^[a-zA-Z]{3,}$/)) {
                    formIsValid = false;
                    errors["locality"] = "*Please enter valid locality.";
                }
            }
    
            if (!fields["pincode"]) {
                formIsValid = false;
                errors["pincode"] = "*Please enter your pincode.";
            }
    
            if (typeof fields["pincode"] !== "undefined") {
                if (!fields["pincode"].match(/^[0-9]{6}$/)) {
                    formIsValid = false;
                    errors["pincode"] = "*Please enter valid pincode.";
                }
            }
    
            this.setState({
                errors: errors
            });
            return formIsValid;
        }
    render() {
        return (
            <div>
            <Headerbar />
                <div>
                <div className="mainCart">
                <Card className="userCard">
                    <div className="myCart">My Cart ({this.state.booklist.length}) </div>
                        <div className="box">
                            {this.state.booklist.map(book => (
                            <div className="cart">
                                <div>
                                    <img className="bookImages" src={book.picPath}/>
                                </div>
                                    <div style={{ marginLeft: '5%' }}>
                                            <Typography className="cartTitle" style={{ fontSize: '14px', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: '450' }}>{book.nameOfBook}</Typography>
                                            <Typography className="cartAuthor" style={{ fontSize: '10px' }}>by {book.author}</Typography>
                                            <Typography className="cartPrice" style={{ fontSize: '14px', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: '600' }}>Rs. {book.price}</Typography>
                                        <div>
                                            <RemoveCircleOutlineIcon />
                                            <input style={{ width: '20px', textAlign: 'center', fontWeight: 'bold', marginLeft: '2px', height: '20px', marginRight: '2px'}} placeholder="1"/>
                                            <AddCircleOutlineIcon />
                                            <Button style={{ marginLeft: '80px' }} onClick={() => this.handleRemoveBookFromOrder(book.id)}>Remove</Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="chekoutButton">
                                <Button variant="contained" color="primary" onClick={() => this.changeEvent()} style={this.state.placeOrder ? { display: 'block' } : { display: 'none' }}>
                                            Place order
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
                </div>
                <div>
                <Card className="customerCard" style={this.state.customerDetails ? { minHeight: '630px' } : { height: '60px' }}>
                    <div className="CustomerPage">
                        <Typography className="customerDetails" style={{ fontSize: '15px', fontFamily: 'Arial, Helvetica, sans-serif' }}>Customer Details</Typography>
                        <Button onClick={() => this.setEditable()}nstyle={{ fontSize: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }} style={this.state.editbutton ? { display: 'block' } : { display: 'none' }}>Edit</Button>
                    </div>

                    <div className="textFieldRow">
                        <div>
                            <TextField name="name" label="Name" variant="outlined" value={this.state.fields.name} onChange={this.handleChange} style={{ outlineColor: 'coral' }} />
                            <div className="errorMsg">{this.state.errors.name}</div>
                        </div>
                        <div>
                            <TextField name="mobile" label="Phone Number" variant="outlined" value={this.state.fields.mobile} onChange={this.handleChange} />
                            <div className="errorMsg">{this.state.errors.mobile}</div>
                        </div>
                    </div><br></br>

                    <div className="textFieldRow">
                        <div>
                            <TextField label="Pincode" variant="outlined" name="pincode" value={this.state.fields.pincode} onChange={this.handleChange} />
                            <div className="errorMsg">{this.state.errors.pincode}</div>
                        </div>
                        <div>
                            <TextField label="Locality" variant="outlined" name="locality" value={this.state.fields.locality} onChange={this.handleChange} />
                            <div className="errorMsg">{this.state.errors.locality}</div>
                        </div>
                    </div><br></br>

                    <div className="textFieldAddress">
                        <div>
                        <TextField  label="Address" multiline rows="4" name="address" value={this.state.fields.address} 
                        onChange={this.handleChange} variant="outlined" style={{ width: '472px' }} InputProps={{ disableUnderline: true }} />
                        <div className="errorMsg">{this.state.errors.address}</div>
                    </div>
                    </div><br></br>

                    <div className="textFieldRow">
                        <div>
                            <TextField label="City" name="city" variant="outlined" value={this.state.fields.city} onChange={this.handleChange} />
                            <div className="errorMsg">{this.state.errors.city}</div>
                        </div>
                        <div>
                            <TextField label="Landmark" variant="outlined" name="landmark" value={this.state.fields.landmark} onChange={this.handleChange} />
                            <div className="errorMsg">{this.state.errors.landmark}</div>
                        </div>
                    </div><br></br>

                    <div style={{ width: '92%', margin: 'auto', paddingBottom: '20px' }}>
                        <div >
                            <div className="typeRadio">Type</div>
                            <RadioGroup aria-label="Type" name="type" row>
                                <FormControlLabel value="home" control={<Radio />} label="home" />
                                <FormControlLabel value="work" control={<Radio />} label="work" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </div>
                        <div className="placeHolder">
                            <Button variant="contained" color="primary" onClick={() => this.checkout()} style={this.state.continue ? { display: 'block' } : { display: 'none' }}>
                                CONTINUE
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="mainCart">
                <Card className="userCard" style={this.state.orderSummery ? { height: '300px' } : { height: '60px' }}>
                    <div className="myCart">Order summery</div>
                        <div className="box">
                            {this.state.booklist.map(book => (
                            <div className="cart">
                                <div key={book.id}>
                                    <img className="bookImages" src={book.picPath}/>
                                </div>
                                    <div style={{ marginLeft: '5%' }}>
                                            <Typography className="cartTitle" style={{ fontSize: '14px', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: '450' }}>{book.nameOfBook}</Typography>
                                            <Typography className="cartAuthor" style={{ fontSize: '10px' }}>by {book.author}</Typography>
                                            <Typography className="cartPrice" style={{ fontSize: '14px', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: '600' }}>Rs. {book.price}</Typography>
                                        <div>
                                    </div>
                                </div>
                            </div>
                            ))}
                            <div className="chekoutButton">
                            <Link to="/ConfirmOrder" style={{ textDecoration: 'none', color: 'white' }} >
                                <Button variant="contained" color="primary">
                                    CHECKOUT
                                </Button>
                            </Link>
                        </div>
                        </div>
                </Card>
            </div>
            <Footer />
        </div>
        )
    }
}

export default Cart
