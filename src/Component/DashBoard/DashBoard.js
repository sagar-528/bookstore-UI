import React from 'react';
import Headerbar from '../Header/Headerbar';
import Footer from "../Footer/Footer";
import Gridview from '../Gridview';
import Pagination from '../Pagination/Pagination';
import Lowerbar from '../Lowerbar/Lowerbar';
import HTTPService from '../../HTTPServices'

var book = new HTTPService();
class DashBoard extends React.Component {

constructor(props) {
    super(props)
    this.state = {
        
    }

}

    render() {
        return (
            <div>
                <Headerbar />
                <div style={{ width: '74%', margin: 'auto' }}>
                <Lowerbar />
                <Gridview data={this.state.books} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3%', marginTop: '2%' }}>
                    <Pagination />
                </div>
                <Footer />
            </div>
        );
    }

}

export default DashBoard;