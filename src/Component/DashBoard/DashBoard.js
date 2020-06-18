import React from 'react';
import Headerbar from '../Header/Headerbar';
import Footer from "../Footer/Footer";
import Gridview from '../GridView/Gridview';
import Pagination from '../Pagination/Pagination';
import Lowerbar from '../Lowerbar/Lowerbar';
import HTTPService from '../../HTTPServices'

var book = new HTTPService();
class DashBoard extends React.Component {

constructor(props) {
    super(props)
    this.state = {
        books: []
    }

}

componentDidMount() {
    book.fetchgetAllBook(response => {
        console.log(response)
        this.setState({
            books: response
        })
    })
}


    render() {
        return (
            <div>
                <Headerbar data={this.state.books.map.length}/>
                <div style={{ width: '74%', margin: 'auto' }}>
                <Lowerbar data={this.state.books.length} book={this.state.books}/>
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