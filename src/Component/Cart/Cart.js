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
             errors: {},
             name: '',
             pincode: '',
             locality: '',
             address: '',
             city: '',
             landmark: '',
             addressType: '',
             home: false,
             work: false,
             other: false,
             orderId: ''
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

    handleChangeBookDec = (book) => {
        let q = book.bookQuantity - 1;
        if (q <= 0) {
            data.removeBookFromCart(book.id, 1).then(() => {
                data.fetchAllCartBook(response => {
                    this.setState({ booklist: response })
                })
            })
        } else {
            data.addToCart(book.id, q).then(() => {
                data.fetchAllCartBook(response => {
                    this.setState({ booklist: response })
                })
            })
        }
    }

    handleChangeBookInc = (book) => {
        let q = book.bookQuantity + 1;
        data.addToCart(book.id, q).then(() => {
            data.fetchAllCartBook(response => {
                this.setState({ booklist: response })
            })
        })
    }

    handleRemoveBookFromOrder = (e) => {
        data.removeBookFromCart(e, 1).then(() => {
            data.fetchAllCartBook(response => {
                this.setState({ booklist: response })
            })
        })
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
        let fields =  this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });
    
    }

    handleChangeEnableCustomerDetails = async() => {
        await data.isCustomerDetailsExisted(response => {
            console.log("result : ", response)
            if (response === 'true') {
             this.setState({
                placeOrder:true,
                customerDetails:false,
                orderSummery:true
            })
            console.log("toggle : ", );
            console.log("summarytoggle : ", );
        }else {
            this.setState({
                placeOrder:false,
                customerDetails:true,
                orderSummery:false
            })
            console.log("toggle123 : ", this.state.toggle);
            console.log("summarytoggle : ", this.state.summaryToggle);
        }
        })

       await this.changeEvent()
    }
    
    changeEvent() {
        this.setState({
            customerDetails: !this.state.customerDetails,
            placeOrder: !this.state.placeOrder,
        })
        console.log(this.state.customerDetails,"toggle");
        console.log(this.state.placeOrder,'after');
        
        
    }

    checkout() {
        if (this.validateForm()) {
            this.setState({
                orderSummery: true,
                continue: false,
                editbutton: true
            })
            this.handleChangeEnableOrderSummary();
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

        handleChangePlaceOrder() {
            data.placeOrder(response => {
                console.log("order id : ", response)
                // this.setState({
                //     orderId: response
                // })
            })
        }

        handleChangeEnableOrderSummary = async () => {

            if (this.state.home) {
                await this.setState({
                    addressType: 'home'
                })
            }
            if (this.state.work) {
                await this.setState({
                    addressType: 'work'
                })
            }
            if (this.state.other) {
                await this.setState({
                    addressType: 'other'
                })
            }
    
            console.log("type", this.state.addressType);
    
            await data.addCustomerDetails(this.state.name, this.state.pincode, this.state.locality, this.state.address, this.state.city, this.state.landmark, this.state.addressType)
            await this.setState({
                summaryToggle: true,
                toggle: false
            })
        }
    
        handleSetName = async(e) => {
            this.setState({
                name: e.target.value
            })
            console.log(this.state.name);
            await this.handleChange(e);
        }
    
        handleSetPincode = async(e) => {
            this.setState({
                pincode: e.target.value
            })
            console.log(this.state.pincode);
            await this.handleChange(e)
        }
    
        handleSetLocality = async (e) => {
            this.setState({
                locality: e.target.value
            })
            console.log(this.state.locality);
            await this.handleChange(e)
        }
    
        handleSetAddress = async(e) => {
            this.setState({
                address: e.target.value
            })
            console.log(this.state.address);
            await this.handleChange(e)
        }
    
        handleSetCity = async(e) => {
            this.setState({
                city: e.target.value
            })
            console.log(this.state.city);
            await this.handleChange(e)
        }
    
        handleSetLandmark = async (e) => {
             this.setState({
                landmark: e.target.value,
            })
            console.log(this.state.landmark);
            await this.handleChange(e)
        }
    
        handleSelectHome = async () => {
            await this.setState({
                work: false,
                home: true,
                other: false
            })
            console.log("home",this.state.home);
            
        }
    
        handleSelectWork = async () => {
            await this.setState({
                work: true,
                home: false,
                other: false
            })
            console.log("work", this.state.work);
        }
    
        handleSelectOther = async () => {
            await this.setState({
                work: false,
                home: false,
                other: true
            })
            console.log("other", this.state.other);
        }

    render() {
        return (
            <div className="cart-page">
            <Headerbar />
            <div className="cart-content">
                {/* Cart Items */}
                <div className="cart-section">
                    <div className="cart-section-header">My Cart ({this.state.booklist.length})</div>
                    <div className="cart-items">
                        {this.state.booklist.map(book => (
                            <div className="cart-item" key={book.id}>
                                <img className="cart-item-image" src={book.picPath} alt={book.nameOfBook}/>
                                <div className="cart-item-details">
                                    <div className="cart-item-title">{book.nameOfBook}</div>
                                    <div className="cart-item-author">by {book.author}</div>
                                    <div className="cart-item-price">Rs. {book.price}</div>
                                    <div className="cart-qty-controls">
                                        <RemoveCircleOutlineIcon onClick={() => this.handleChangeBookDec(book)}/>
                                        <input className="cart-qty-input" readOnly value={book.bookQuantity}/>
                                        <AddCircleOutlineIcon onClick={() => this.handleChangeBookInc(book)}/>
                                        <Button className="cart-item-remove" onClick={() => this.handleRemoveBookFromOrder(book.id)}>Remove</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {this.state.placeOrder && (
                        <div className="cart-actions">
                            <Button variant="contained" style={{ background: 'var(--primary)', color: 'white' }} onClick={this.handleChangeEnableCustomerDetails}>
                                Place Order
                            </Button>
                        </div>
                    )}
                </div>

                {/* Customer Details */}
                <div className="cart-section" style={this.state.customerDetails ? {} : { maxHeight: 56, overflow: 'hidden' }}>
                    <div className="cart-section-header">
                        Customer Details
                        {this.state.editbutton && <Button onClick={() => this.setEditable()}>Edit</Button>}
                    </div>
                    <div className="customer-form">
                        <TextField name="name" label="Full Name" variant="outlined" fullWidth value={this.state.fields.name || ''} onChange={(e) => this.handleSetName(e)} size="small"/>
                        <div className="errorMsg">{this.state.errors.name}</div>

                        <div className="form-row">
                            <div>
                                <TextField label="Pincode" variant="outlined" name="pincode" fullWidth value={this.state.fields.pincode || ''} onChange={(e) => this.handleSetPincode(e)} size="small"/>
                                <div className="errorMsg">{this.state.errors.pincode}</div>
                            </div>
                            <div>
                                <TextField label="Locality" variant="outlined" name="locality" fullWidth value={this.state.fields.locality || ''} onChange={(e) => this.handleSetLocality(e)} size="small"/>
                                <div className="errorMsg">{this.state.errors.locality}</div>
                            </div>
                        </div>

                        <TextField label="Address" multiline rows={3} name="address" fullWidth value={this.state.fields.address || ''} variant="outlined" onChange={(e) => this.handleSetAddress(e)} size="small"/>
                        <div className="errorMsg">{this.state.errors.address}</div>

                        <div className="form-row">
                            <div>
                                <TextField label="City" name="city" variant="outlined" fullWidth value={this.state.fields.city || ''} onChange={(e) => this.handleSetCity(e)} size="small"/>
                                <div className="errorMsg">{this.state.errors.city}</div>
                            </div>
                            <div>
                                <TextField label="Landmark" variant="outlined" name="landmark" fullWidth value={this.state.fields.landmark || ''} onChange={(e) => this.handleSetLandmark(e)} size="small"/>
                                <div className="errorMsg">{this.state.errors.landmark}</div>
                            </div>
                        </div>

                        <div className="type-label">Address Type</div>
                        <RadioGroup aria-label="Type" name="type" row>
                            <FormControlLabel value="home" control={<Radio color="primary"/>} label="Home" onChange={this.handleSelectHome}/>
                            <FormControlLabel value="work" control={<Radio color="primary"/>} label="Work" onChange={this.handleSelectWork}/>
                            <FormControlLabel value="other" control={<Radio color="primary"/>} label="Other" onChange={this.handleSelectOther}/>
                        </RadioGroup>

                        {this.state.continue && (
                            <div className="cart-actions" style={{ padding: '12px 0 0' }}>
                                <Button variant="contained" style={{ background: 'var(--primary)', color: 'white' }} onClick={this.checkout}>
                                    Continue
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="cart-section" style={this.state.orderSummery ? {} : { maxHeight: 56, overflow: 'hidden' }}>
                    <div className="cart-section-header">Order Summary</div>
                    <div className="cart-items">
                        {this.state.booklist.map(book => (
                            <div className="cart-item" key={book.id}>
                                <img className="cart-item-image" src={book.picPath} alt={book.nameOfBook}/>
                                <div className="cart-item-details">
                                    <div className="cart-item-title">{book.nameOfBook}</div>
                                    <div className="cart-item-author">by {book.author}</div>
                                    <div className="cart-item-price">Rs. {book.price * book.bookQuantity}</div>
                                    <div className="cart-item-author">Qty: {book.bookQuantity}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-actions">
                        <Link to="/ConfirmOrder" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" style={{ background: 'var(--primary)', color: 'white' }} onClick={this.handleChangePlaceOrder}>
                                Checkout
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        )
    }
}

export default Cart
