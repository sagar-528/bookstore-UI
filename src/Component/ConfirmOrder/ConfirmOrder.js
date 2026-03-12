import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import "./ConfirmOrder.css"
import Button from '@material-ui/core/Button';
import Headerbar from '../Header/Headerbar';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import HTTPServices from '../../HTTPServices';

var data = new HTTPServices();
export class ConfirmOrder extends Component {
    constructor(props) {
        super(props)
        this.state = { orderId: '' }
    }

    componentDidMount() {
        data.OrderId(response => {
            this.setState({ orderId: response })
        })
    }

    render() {
        return (
            <div className="confirm-page">
                <Headerbar />
                <div className="confirm-content">
                    <div className="confirm-icon">
                        <span>✓</span>
                    </div>
                    <div className="confirm-title">Order Confirmed!</div>
                    <div className="confirm-sub">
                        Your order has been placed successfully. Save your order ID for future reference.
                    </div>
                    <div className="confirm-order-id">
                        Order #{this.state.orderId}
                    </div>

                    <div className="confirm-info-card">
                        <TableContainer>
                            <Table aria-label="contact info">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Email</TableCell>
                                        <TableCell align="center">Phone</TableCell>
                                        <TableCell align="center">Address</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center">admin@bookStore.com</TableCell>
                                        <TableCell align="center">9876543210</TableCell>
                                        <TableCell align="center">BridgeLabz, Mumbai</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Button className="confirm-continue" variant="contained">
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
                <Footer />
            </div>
        )
    }
}

export default ConfirmOrder
