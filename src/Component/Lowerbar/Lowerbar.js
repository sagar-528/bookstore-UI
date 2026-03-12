import React, { Component } from 'react'
import HTTPServices from '../../HTTPServices';

var data = new HTTPServices()
export class Lowerbar extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleBookSorting = (e) => {
        if (e.target.value === "high")
            data.fetchAllBookDesc(response => {
                this.props.function(response.content)
            })
        else if (e.target.value === "low")
            data.fetchAllBookAsc(response => {
                this.props.function(response.content)
            })
        else
            data.fetchgetAllBook(response => {
                this.props.function(response)
            })
    }

    render() {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 0 12px',
                marginBottom: 8,
                borderBottom: '1px solid var(--border)',
            }}>
                <h2 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 22,
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    margin: 0,
                }}>
                    Books <span style={{
                        fontSize: 15,
                        fontWeight: 400,
                        color: 'var(--text-muted)',
                    }}>({this.props.data} items)</span>
                </h2>
                <select onChange={this.handleBookSorting} style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    padding: '8px 32px 8px 12px',
                    borderRadius: 8,
                    border: '1px solid var(--border)',
                    background: 'var(--bg-card)',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    outline: 'none',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23555' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 10px center',
                }}>
                    <option value="relevance">Sort by relevance</option>
                    <option value="high">Price: High to Low</option>
                    <option value="low">Price: Low to High</option>
                </select>
            </div>
        )
    }
}

export default Lowerbar
