import React from 'react'

function Footer() {
    return (
        <footer style={{
            background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
            color: 'rgba(255,255,255,0.6)',
            padding: '24px 0',
            textAlign: 'center',
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            letterSpacing: '0.3px',
            marginTop: 'auto',
        }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
                Copyright © {new Date().getFullYear()}, Bookstore Private Limited. All Rights Reserved.
            </div>
        </footer>
    )
}

export default Footer
