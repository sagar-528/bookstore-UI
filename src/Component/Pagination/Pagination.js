import React, { Component } from 'react'

export class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 1,
      pages: [1, 2, 3, 4, 5]
    }
  }

  render() {
    const btnStyle = (active) => ({
      fontFamily: "'Inter', sans-serif",
      fontSize: 13,
      fontWeight: active ? 600 : 400,
      width: 36,
      height: 36,
      borderRadius: 8,
      border: active ? '2px solid var(--primary)' : '1px solid var(--border)',
      background: active ? 'var(--primary)' : 'var(--bg-card)',
      color: active ? 'white' : 'var(--text-secondary)',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'var(--transition)',
      margin: '0 3px',
    });

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button style={{ ...btnStyle(false), fontSize: 16 }}
          onClick={() => this.state.current > 1 && this.setState({ current: this.state.current - 1 })}>
          ‹
        </button>
        {this.state.pages.map(p => (
          <button key={p} style={btnStyle(p === this.state.current)}
            onClick={() => this.setState({ current: p })}>
            {p}
          </button>
        ))}
        <button style={{ ...btnStyle(false), fontSize: 16 }}
          onClick={() => this.state.current < 5 && this.setState({ current: this.state.current + 1 })}>
          ›
        </button>
      </div>
    )
  }
}

export default Pagination
