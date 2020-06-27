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
    this.setbooks = this.setbooks.bind(this);
    this.setSearch = this.setSearch.bind(this);
}

componentDidMount() {
    book.fetchgetAllBook(response => {
        console.log(response)
        this.setState({
            books: response
        })
    })
}

setbooks(newbooks) {
    console.log('dashboard',newbooks);
    console.log('hi',this);
    this.setState({
        books: newbooks
    })
    console.log('bind',this.state.books)
}

setSearch(searchbook){
    console.log('dashboard',searchbook);
    console.log('hi',this);
    this.setState({
        books: searchbook
    })
    console.log('bind',this.state.books)
}
    render() {
        return (
            <div>
                <Headerbar function={this.setSearch} />
                <div style={{ width: '74%', margin: 'auto' }}>
                <Lowerbar data={this.state.books.length} function={this.setbooks}/>
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