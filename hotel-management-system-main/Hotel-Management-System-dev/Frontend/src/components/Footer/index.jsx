import React from 'react'
import Navbar from 'react-bootstrap/Navbar';

import './Footer.css'

export default function Footer() {
    return (
        <>
            <Navbar bg="dark" className="footer">
                <Navbar.Brand href="/" style={{ color: 'white' }}>Nilwala Breeze</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text style={{ color: 'white' }}>
                        © 2023 Nilwala Breeze
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar></>
    )
}
