import React, { Component } from "react"
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default class Lowerbar extends Component{
    constructor(props){
        super(props)
        this.state={
        }
    }

    render(){
        return (
            <p>
            <div >
                <Toolbar>
                    <Typography edge="start" variant="h6" >
                        Books (52 items)
                    </Typography>
                    </Toolbar>
               </div>
            </p>
        )
    }

} 