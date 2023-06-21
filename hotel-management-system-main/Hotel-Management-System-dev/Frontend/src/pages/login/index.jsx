import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import './login.css'

import AdminService from '../../services/admin.service';
import CustomerService from '../../services/customer.service';
import ReceptionistService from '../../services/reception.service';

export default function Login() {

    const image = "https://firebasestorage.googleapis.com/v0/b/srigo-c895d.appspot.com/o/rsssss%2F4957136.jpg?alt=media&token=2c4ac36a-9239-49f0-9f69-4774563f1fa8"
    const [role, setRole] = useState("")

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function handleLogin(role) {
        setRole(role)
        handleShow();
    }

    //login schema
    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
    });

    async function handleLoginSubmit(values) {

        const data = {
            email: values.email,
            password: values.password
        }

        if (role === "Customer") {
            console.log(role)
            await CustomerService.login(data).then(
                response => {
                    if (response.data) {
                        localStorage.setItem("id", response.data.id);
                        localStorage.setItem("role", "Customer");

                        Swal.fire({
                            icon: 'success',
                            title: 'Login Success!',
                            text: 'You are logged in as a Customer!',
                        })
                            .then(() => {
                                window.location.href = "/cusDash"
                            })
                    }
                },
                error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Invalid Credentials!',
                    })
                }
            )
        }
        else if (role === "Receptionist") {
            console.log(role)
            await ReceptionistService.login(data).then(
                response => {
                    if (response.data) {
                        localStorage.setItem("id", response.data.id);
                        localStorage.setItem("role", "Receptionist");

                        Swal.fire({
                            icon: 'success',
                            title: 'Login Success!',
                            text: 'You are logged in as a Receptionist!',
                        })
                            .then(() => {
                                window.location.href = "/receptDash"
                            })
                    }
                },
                error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Invalid Credentials!',
                    })
                }
            )
        }
        else if (role === "Admin") {
            console.log(role)
            await AdminService.login(data).then(
                response => {
                    if (response.data) {
                        localStorage.setItem("id", response.data.id);
                        localStorage.setItem("role", "Admin");

                        Swal.fire({
                            icon: 'success',
                            title: 'Login Success!',
                            text: 'You are logged in as an Admin!',
                        })
                            .then(() => {
                                window.location.href = "/adminDash"
                            })
                    }
                },
                error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Invalid Credentials!',
                    })
                }
            )
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
                    <Modal.Title>{role} Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            email: 'chamindu@gmail.com',
                            password: '12345',
                        }}
                        validationSchema={LoginSchema}
                        onSubmit={values => {
                            handleLoginSubmit(values)
                        }}

                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.email}</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.password}</div>
                                </div>
                                <br />
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-2">Login</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="loginContainer">
                <Row>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={image} />
                            <Card.Body>
                                <Card.Title>Login As a Customer</Card.Title>
                                <Button variant="primary" onClick={() => {
                                    handleLogin("Customer")
                                }}>Login</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={image} />
                            <Card.Body>
                                <Card.Title>Login As a Receptionist</Card.Title>
                                <Button variant="primary" onClick={() => {
                                    handleLogin("Receptionist")
                                }}>Login</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={image} />
                            <Card.Body>
                                <Card.Title>Login As an Admin</Card.Title>
                                <Button variant="primary" onClick={() => {
                                    handleLogin("Admin")
                                }}>Login</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
            <br /><br /><br /><br />

        </>
    )
}
