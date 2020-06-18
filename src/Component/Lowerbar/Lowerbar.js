import React, { Component } from 'react'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export class Lowerbar extends Component {
    constructor(props){
        super(props)
        this.state={
        
        }
    }


    render() {
        return (
            <p>
            <div >
                <Toolbar>
                    <Typography edge="start" variant="h6" >
                        Books ({this.props.data} Items)
                        <select style={{ marginLeft: '565px', fontSize: '17px' }}>
                            <option>Sort by relevance</option>
                            <option >Price : High to low</option>
                            <option>Price : Low to High</option>
                            <option>Newest Arrivals</option>
                     </select>
                    </Typography>
                    </Toolbar>
               </div>
            </p>
        )
    }
}

export default Lowerbar
