import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar';
import Swal from 'sweetalert2';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';

import './NavBar.css';

import CustomerService from '../../services/customer.service';

export default function NavBar() {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //validation schema
    const validationSchema = Yup.object({
        name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .min(3, 'Must be 3 characters or more')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Required'),
        nic: Yup.string()
            .required('Required'),
        address: Yup.string()
            .required('Required')
            .min(5, 'Must be 5 characters or more'),
        phone: Yup.string()
            .min(10, 'Must be 10 characters or more')
            .max(10, 'Must be 10 characters or less')
            .required('Required'),
        password: Yup.string()
            .required('Required')
            .min(8, 'Password is too short - should be 8 chars minimum.'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
    })

    async function registerCustomer(values) {
        console.log(values);
        const newCustomer = {
            name: values.name,
            email: values.email,
            nic: values.nic,
            address: values.address,
            phone: values.phone,
            password: values.password
        }
        await CustomerService.addCustomer(newCustomer)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Customer Registered Successfully',
                    })
                    navigate('/login');
                    handleClose();
                }
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
            )
    }

    function logout() {
        localStorage.clear();
        window.location.href = "/";
    }

    function hadnDashboard() {
        if (localStorage.getItem('role') === 'Admin') {
            window.location.href = "/adminDash";
        } else if (localStorage.getItem('role') === 'Receptionist') {
            window.location.href = "/receptDash";
        } else if (localStorage.getItem('role') === 'Customer') {
            window.location.href = "/cusDash";
        }
    }


    return (
        <>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Register Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            nic: '',
                            address: '',
                            phone: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={values => {
                            registerCustomer(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <Field
                                        name="name"
                                        type="text"
                                        className={`form-control ${touched.name && errors.name ? "is-invalid" : ""
                                            }`}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.name}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        name="email"
                                        type="email"
                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""
                                            }`}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.email}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="nic">NIC</label>
                                    <Field
                                        name="nic"
                                        type="text"
                                        className={`form-control ${touched.nic && errors.nic ? "is-invalid" : ""
                                            }`}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.nic}
                                    </div>
                                </div>

                                {/* address */}
                                <div className='form-group'>
                                    <label htmlFor='address'>Address</label>
                                    <Field
                                        name='address'
                                        type='text'
                                        className={`form-control ${touched.address && errors.address ? 'is-invalid' : ''
                                            }`}
                                    />
                                    <div className='invalid-feedback'>{errors.address}</div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <Field
                                        name="phone"
                                        type="text"
                                        className={`form-control ${touched.phone && errors.phone ? "is-invalid" : ""
                                            }`}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.phone}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className={`form-control ${touched.password && errors.password ? "is-invalid" : ""
                                            }`}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.password}
                                    </div>

                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <Field
                                        name="confirmPassword"
                                        type="password"
                                        className={`form-control ${touched.confirmPassword && errors.confirmPassword ? "is-invalid" : ""
                                            }`}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.confirmPassword}
                                    </div>
                                </div>
                                <br />

                                <button type="submit" className="btn btn-primary mr-2">
                                    Register
                                </button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>

            <Navbar className="NavBar">
                &nbsp;&nbsp;&nbsp;
                <Navbar.Brand href="/" style={{ color: 'white' }}>Nilwala Breeze</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-center">
                    <Navbar.Text>
                        <Button variant="dark" className="navbtn" as={Link} to="/halls" style={{ color: 'white' }}>Wedding Halls</Button>
                    </Navbar.Text>
                    <Navbar.Text>
                        <Button variant="dark" className="navbtn" as={Link} to="/rooms" style={{ color: 'white' }}>Rooms</Button>
                    </Navbar.Text>
                    <Navbar.Text>
                        <Button variant="dark" className="navbtn" as={Link} to="http://localhost:3006/" style={{ color: 'white' }}>Travel Management</Button>
                    </Navbar.Text>
                    <Navbar.Text>
                        <Button variant="dark" className="navbtn" as={Link} to="/contactUs" style={{ color: 'white' }}>Food Ordering</Button>
                    </Navbar.Text>
                    <Navbar.Text>
                        <Button variant="dark" className="navbtn" as={Link} to="/contactUs" style={{ color: 'white' }}>Contact Us</Button>
                    </Navbar.Text>
                    <Navbar.Text>
                        <Button variant="dark" className="navbtn" as={Link} to="/contactUs" style={{ color: 'white' }}>About Us</Button>
                    </Navbar.Text>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    {localStorage.getItem('id') ?
                        (
                            <>
                                <Navbar.Text>
                                    <Button variant="light" className="navbtn" onClick={hadnDashboard}>Dashboard</Button>{' '}
                                </Navbar.Text>
                                <Navbar.Text>
                                    <Button variant="light" className="navbtn" onClick={logout}>Log Out</Button>{' '}
                                </Navbar.Text>
                            </>
                        ) : (
                            <>
                                <Navbar.Text>
                                    <Button variant="light" className="navbtn" onClick={handleShow}>Register</Button>{' '}
                                </Navbar.Text>
                                <Navbar.Text>
                                    <Button variant="light" className="navbtn" href='/login'>Login</Button>{' '}
                                </Navbar.Text>
                            </>
                        )}
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}
