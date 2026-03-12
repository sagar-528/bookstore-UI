import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Headerbar from '../Header/Headerbar';
import Footer from '../Footer/Footer';
import HTTPServices from '../../HTTPServices';
import { Redirect } from 'react-router-dom';
import './AdminDashboard.css';

var data = new HTTPServices();

export class AdminDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            nameOfBook: '',
            author: '',
            price: '',
            description: '',
            picPath: '',
            success: '',
            error: '',
            loading: false,
        }
    }

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        data.fetchgetAllBook(response => {
            this.setState({ books: response })
        })
    }

    handleAddBook = async (e) => {
        e.preventDefault();
        const { nameOfBook, author, price } = this.state;
        if (!nameOfBook || !author || !price) {
            this.setState({ error: 'Please fill in name, author, and price.', success: '' });
            return;
        }
        this.setState({ loading: true, error: '', success: '' });
        try {
            const book = await data.adminAddBook({
                nameOfBook: this.state.nameOfBook,
                author: this.state.author,
                price: this.state.price,
                description: this.state.description,
                picPath: this.state.picPath,
            });
            this.setState({
                success: `"${book.nameOfBook}" added successfully!`,
                nameOfBook: '',
                author: '',
                price: '',
                description: '',
                picPath: '',
                loading: false,
            });
            this.loadBooks();
        } catch (err) {
            this.setState({ error: 'Failed to add book. Check your admin permissions.', loading: false });
        }
    }

    handleDeleteBook = async (bookId, bookName) => {
        this.setState({ error: '', success: '' });
        try {
            await data.adminDeleteBook(bookId);
            this.setState({ success: `"${bookName}" deleted successfully.` });
            this.loadBooks();
        } catch (err) {
            this.setState({ error: 'Failed to delete book.' });
        }
    }

    render() {
        if (!data.isAdmin()) {
            return <Redirect to="/" />
        }

        return (
            <div className="admin-page">
                <Headerbar />
                <div className="admin-content">
                    <div className="admin-title">
                        <span>&#9881;</span> Admin Dashboard
                    </div>

                    {this.state.success && <div className="admin-success">{this.state.success}</div>}
                    {this.state.error && <div className="admin-error">{this.state.error}</div>}

                    <div className="admin-section">
                        <div className="admin-section-header">Add New Book</div>
                        <form className="admin-form" onSubmit={this.handleAddBook}>
                            <div className="admin-form-row">
                                <div>
                                    <TextField label="Book Title" variant="outlined" size="small" required
                                        value={this.state.nameOfBook}
                                        onChange={(e) => this.setState({ nameOfBook: e.target.value })} />
                                </div>
                                <div>
                                    <TextField label="Author" variant="outlined" size="small" required
                                        value={this.state.author}
                                        onChange={(e) => this.setState({ author: e.target.value })} />
                                </div>
                            </div>
                            <div className="admin-form-row">
                                <div>
                                    <TextField label="Price (Rs.)" variant="outlined" size="small" type="number" required
                                        value={this.state.price}
                                        onChange={(e) => this.setState({ price: e.target.value })} />
                                </div>
                                <div>
                                    <TextField label="Cover Image URL (optional)" variant="outlined" size="small"
                                        value={this.state.picPath}
                                        onChange={(e) => this.setState({ picPath: e.target.value })} />
                                </div>
                            </div>
                            <TextField label="Description (optional)" variant="outlined" size="small" multiline rows={3}
                                value={this.state.description}
                                onChange={(e) => this.setState({ description: e.target.value })} />
                            <div className="admin-form-actions">
                                <Button className="admin-btn-add" variant="contained" type="submit"
                                    disabled={this.state.loading}>
                                    {this.state.loading ? 'Adding...' : 'Add Book'}
                                </Button>
                            </div>
                        </form>
                    </div>

                    <div className="admin-section">
                        <div className="admin-section-header">
                            Manage Books ({this.state.books.length})
                        </div>
                        <div className="admin-book-list">
                            {this.state.books.map(book => (
                                <div className="admin-book-item" key={book.id}>
                                    <img className="admin-book-img" src={book.picPath} alt={book.nameOfBook} />
                                    <div className="admin-book-info">
                                        <div className="admin-book-name">{book.nameOfBook}</div>
                                        <div className="admin-book-meta">by {book.author}</div>
                                    </div>
                                    <div className="admin-book-price">Rs. {book.price}</div>
                                    <Button className="admin-btn-delete" variant="outlined"
                                        onClick={() => this.handleDeleteBook(book.id, book.nameOfBook)}>
                                        Delete
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default AdminDashboard
