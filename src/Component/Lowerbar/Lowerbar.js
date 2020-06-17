import React, { Component } from 'react'

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
                        Books (52 items)
                    </Typography>
                    </Toolbar>
               </div>
            </p>
        )
    }
}

export default Lowerbar
