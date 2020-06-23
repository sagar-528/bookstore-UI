import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MenuBookTwoToneIcon from '@material-ui/icons/MenuBookTwoTone';
import Icon from "@material-ui/core/Icon";
import Badge from '@material-ui/core/Badge';
import { Link } from 'react-router-dom';
import HTTPServices from '../../HTTPServices';
import PersonIcon from '@material-ui/icons/Person';
import Lowerbar from '../Lowerbar/Lowerbar';

var data = new HTTPServices()
export class Headerbar extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
      book: [],
      searchText: ''
    }
  }

  handleChangeSearchText = async(e) => {
    await this.setState({
         searchText: e.target.value
     })
     if (this.state.searchText !== '') {
         data.fetchAllSearchBook(this.state.searchText, response => {
             console.log("text1",this.state.searchText)
             this.props.function(
                  response
             )
         })
     }
     if(this.state.searchText === ''){
      data.fetchAllSearchBook(this.state.searchText, response => {
        window.location.reload(true)
      })
     }
 }
  
  render() {
    return (
      <div>
      <AppBar position="static" style={{ backgroundColor: '#A03037', top: '0' }}>
        <Toolbar>
        <Typography variant="h6" noWrap> 
         <Link to= '/' style={{ textDecoration: 'none', color: 'white', fontFamily: 'fontawesome' }}>
            &#xf02d; Bookstore
          </Link>
          </Typography>
          <div style={{display:'flex',justifyContent:'start',marginLeft:'20px',borderRadius:'4px',backgroundColor:'aliceblue',width:'40%'}}>
            <SearchIcon style={{ color: 'grey', margin: '1%' }}/>
            <InputBase
              placeholder="Search…"
              style={{ width: '100%' }}
              onChange={(e) => this.handleChangeSearchText(e)}
            />
          </div>
          <div style={{flexGrow: 1}}/>
              <Typography variant="h6" style={{fontFamily: 'fontawesome', paddingRight: 20}}>
                <Link to= '/WishList' style={{ textDecoration: 'none', color: 'white'}}>
                <Badge badgeContent={2} color="secondary">
                  WhishList &#xf004;
                </Badge>
                </Link>
              </Typography>
          <Typography variant="h6"  style={{fontFamily: 'fontawesome', paddingRight: 60}}>
          <Link to= '/Cart' style={{ textDecoration: 'none', color: 'white' }}>
          <Badge badgeContent={1} color="secondary">
             Cart &#xf217;
          </Badge>
          </Link>
          </Typography>
          <Typography variant="h6"  style={{fontFamily: 'fontawesome', paddingRight: 10}}>
          <Link to= '/UserLogin' style={{ textDecoration: 'none', color: 'white' }}>
             SignIn &#xf2be;
          </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div >
    )
  }
}

export default Headerbar
