import React, { Component } from 'react';
import Bookview from '../BookView/Bookview'

class Gridview extends Component {
    render() {
        return (
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '24px',
                padding: '24px 0',
            }}>
                {this.props.data && this.props.data.map(o => (
                    <Bookview key={o.id} data={o} />
                ))}
            </div>
        );
    }
}

export default Gridview;
