import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import '../../styles/dashboard.css'

import receptService from '../../services/reception.service';

export default function AdminRecepts() {
    const [customers, setCustomers] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        receptService.getAllReceptionist().then(response => {
            setCustomers(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    //validation schema
    const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required"),
        phone: Yup.string()
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(10, "Must be exactly 10 digits")
            .max(10, "Must be exactly 10 digits")
            .required("Phone is required"),

    });

    async function handleDelete(id) {
        //ask from user
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this Receptionist!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await receptService.deleteReceptionist(id).then(
                    response => {
                        if (response.status === 204) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Deleted!',
                                text: 'Receptionist has been deleted.',
                            })
                                .then(() => {
                                    receptService.getAllReceptionist().then(response => {
                                        setCustomers(response.data);
                                    }).catch(error => {
                                        console.log(error);
                                    })
                                })
                        }
                    },
                    error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        })
                    }
                )
            }
        })
    }

    async function addNewReceptionist(values) {
        const data = {
            name: values.name,
            email: values.email,
            password: values.password,
            phone: values.phone
        }

        await receptService.addReceptionist(data).then(
            response => {
                if (response.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'New Receptionist has been added.',
                    })
                        .then(() => {
                            handleClose();
                            receptService.getAllReceptionist().then(response => {
                                setCustomers(response.data);
                            }).catch(error => {
                                console.log(error);
                            })
                        })
                }
            },
            error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
        )
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
                    <Modal.Title>Add New Receptionist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        validationSchema={schema}
                        onSubmit={(values) => {
                            addNewReceptionist(values);
                        }}
                        initialValues={{
                            name: '',
                            email: '',
                            password: '',
                            phone: ''
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.name}</div>
                                </div>
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
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <Field name="phone" type="text" className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.phone}</div>
                                </div>
                                <br />
                                <div className="form-group">
                                    <Button variant="primary" type="submit">Submit</Button>
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

            <div className="dashContainerNorm">
                <Button variant="success" onClick={handleShow}>Add New Receptionist</Button>{' '}
                <br />
                <br />
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone}</td>
                                <td><Button variant="danger" onClick={() => {
                                    handleDelete(customer.id)
                                }}>Delete</Button>{' '}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div >
            <br /><br /><br /><br /><br />
        </>
    )
}
