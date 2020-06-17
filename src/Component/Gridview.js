import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Bookview from './BookView/Bookview'

const useStyles = createMuiTheme({
    root: {
        flexGrow: 1
    }
});

class Gridview extends Component {

    constructor(props) {
        super(props);
        this.state ={
           
        }
    }

        
render() {
    return (
        <MuiThemeProvider theme={useStyles}>
        <div className={useStyles.root} style={{display:'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
        <Bookview />
        </div>
        </MuiThemeProvider>
        );
    }
}


export default Gridview;