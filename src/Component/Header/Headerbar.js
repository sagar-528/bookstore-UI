import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Badge from '@material-ui/core/Badge';
import { Link, withRouter } from 'react-router-dom';
import HTTPServices from '../../HTTPServices';
import { connect } from 'react-redux';
import './Headerbar.css';

var data = new HTTPServices();
export class Headerbar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
    }
  }

  handleChangeSearchText = (e) => {
    const text = e.target.value;
    this.setState({ searchText: text })
    if (text !== '' && this.props.function) {
      data.fetchAllSearchBook(text, response => {
        this.props.function(response)
      })
    }
    if (text === '' && this.props.function) {
      data.fetchgetAllBook(response => {
        this.props.function(response)
      })
    }
  }

  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.forceUpdate();
    if (this.props.history) {
      this.props.history.push('/');
    }
  }

  render() {
    const isLoggedIn = !!localStorage.getItem("token");
    const isAdmin = data.isAdmin();
    return (
      <div className="header-root">
        <AppBar position="static" className="header-bar">
          <Toolbar className="header-toolbar">
            <Typography className="header-logo" variant="h6" noWrap>
              <Link to='/'>
                <span role="img" aria-label="book">📚</span> Bookstore
              </Link>
            </Typography>

            <div className="header-search">
              <SearchIcon />
              <InputBase
                placeholder="Search books, authors..."
                style={{ width: '100%', marginLeft: 8 }}
                onChange={this.handleChangeSearchText}
                value={this.state.searchText}
              />
            </div>

            <div style={{ flexGrow: 1 }} />

            <Typography className="header-nav-item" variant="body1">
              <Link to='/WishList'>
                <Badge badgeContent={this.props.wishListCount || this.props.wishBookCount || 0} showZero color='secondary'>
                  Wishlist
                </Badge>
              </Link>
            </Typography>

            <Typography className="header-nav-item" variant="body1">
              <Link to='/Cart'>
                <Badge badgeContent={this.props.cartCount || this.props.cartBookCount || 0} showZero color='secondary'>
                  Cart
                </Badge>
              </Link>
            </Typography>

            {isAdmin && (
              <Typography className="header-nav-item" variant="body1">
                <Link to='/admin' style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 6, padding: '4px 12px' }}>
                  Admin
                </Link>
              </Typography>
            )}

            {isLoggedIn ? (
              <Typography className="header-nav-item" variant="body1">
                <span onClick={this.handleLogout} style={{ color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 8 }}>
                  Logout
                </span>
              </Typography>
            ) : (
              <Typography className="header-nav-item" variant="body1">
                <Link to='/UserLogin'>
                  Sign In
                </Link>
              </Typography>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cartCount: state.cartCount,
  wishListCount: state.wishListCount
});

export default withRouter(connect(mapStateToProps)(Headerbar));
