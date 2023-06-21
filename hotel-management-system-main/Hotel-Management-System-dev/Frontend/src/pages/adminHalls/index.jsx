import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import storage from "../../utils/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { v4 } from 'uuid';
import Swal from 'sweetalert2';

import '../../styles/dashboard.css'

import hallService from '../../services/hall.service';

export default function AdminHalls() {

    const [halls, setHalls] = useState([]);
    const [hall, setHall] = useState({}); //for edit
    const [image, setImage] = useState("");

    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true)

    useEffect(() => {
        hallService.getAllHalls().then(response => {
            setHalls(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    //validation schema
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        type: Yup.string().required("Type is required"),
        capacity: Yup.number().required("Capacity is required"),
        price: Yup.number().required("Price is required"),
        description: Yup.string().required("Description is required"),
    })

    //add new hall
    async function handleAdd(values) {
        const storageRef = ref(storage, `/images/${file.name}` + v4());

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update upload progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    const data = {
                        name: values.name,
                        type: values.type,
                        capacity: values.capacity,
                        price: values.price,
                        description: values.description,
                        image: url
                    }
                    hallService.addHall(data).then(response => {
                        console.log(response.data);
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Hall added successfully!',
                        })
                        handleCloseAdd();
                        setPercent(0);

                        hallService.getAllHalls().then(response => {
                            setHalls(response.data);
                        }).catch(error => {
                            console.log(error);
                        })
                    }).catch(error => {
                        console.log(error);
                    })
                });
            }
        );
    }

    function handleOpenEdit(record) {
        setHall(record);
        handleShowEdit();
    }

    //update hall
    async function handleEdit(values) {
        const storageRef = ref(storage, `/images/${file.name}` + v4());

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update upload progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    const data = {
                        name: values.name,
                        type: values.type,
                        capacity: values.capacity,
                        price: values.price,
                        description: values.description,
                        image: url
                    }

                    hallService.updateHall(hall.id, data).then(response => {
                        console.log(response.data);
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Hall updated successfully!',
                        })
                        handleCloseEdit();
                        setPercent(0);

                        hallService.getAllHalls().then(response => {
                            setHalls(response.data);
                        }).catch(error => {
                            console.log(error);
                        })
                    }).catch(error => {
                        console.log(error);
                    })
                });
            }
        );
    }

    //delete hall
    async function handleDelete(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                hallService.deleteHall(id).then(response => {
                    console.log(response.data);
                    Swal.fire(
                        'Deleted!',
                        'Hall has been deleted.',
                        'success'
                    )
                    hallService.getAllHalls().then(response => {
                        setHalls(response.data);
                    }).catch(error => {
                        console.log(error);
                    })
                }).catch(error => {
                    console.log(error);
                })
            }
        })
    }

    return (
        <>
            {/* add new hall */}
            <Modal
                show={showAdd}
                onHide={handleCloseAdd}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Hall</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: '',
                            type: '',
                            capacity: '',
                            price: '',
                            description: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={values => {
                            console.log(values);
                            handleAdd(values);
                        }
                        }>
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.name}</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="type">Type</label>
                                    <Field name="type" type="text" className={'form-control' + (errors.type && touched.type ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.type}</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="capacity">Capacity</label>
                                    <Field name="capacity" type="number" className={'form-control' + (errors.capacity && touched.capacity ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.capacity}</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Price</label>
                                    <Field name="price" type="number" className={'form-control' + (errors.price && touched.price ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.price}</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <Field name="description" type="text" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.description}</div>
                                </div>
                                <br />
                                <div className="form-group">
                                    <label htmlFor="image">Image</label>&nbsp;
                                    <input
                                        type="file"
                                        id="image"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                    {percent > 0 && <progress value={percent} max="100" />}

                                </div>
                                <br />
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-2">Add</button>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* edit hall */}
            <Modal
                show={showEdit}
                onHide={handleCloseEdit}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Hall</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: hall.name,
                            type: hall.type,
                            capacity: hall.capacity,
                            price: hall.price,
                            description: hall.description,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={values => {
                            console.log(values);
                            handleEdit(values);
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
                                    <label htmlFor="type">Type</label>
                                    <Field name="type" type="text" className={'form-control' + (errors.type && touched.type ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.type}</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="capacity">Capacity</label>
                                    <Field name="capacity" type="number" className={'form-control' + (errors.capacity && touched.capacity ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.capacity}</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Price</label>
                                    <Field name="price" type="number" className={'form-control' + (errors.price && touched.price ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.price}</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <Field name="description" type="text" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.description}</div>
                                </div>
                                <br />
                                <div className="form-group">
                                    <label htmlFor="image">Image</label>&nbsp;
                                    <input
                                        type="file"
                                        id="image"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                    {percent > 0 && <progress value={percent} max="100" />}
                                    {image && <img src={image} alt="uploaded" />}
                                </div>
                                <br />
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-2">Update</button>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="dashContainerNorm">
                <Button variant="success" onClick={handleShowAdd}>Add New Hall</Button>{' '}
                <br /><br />
                <div className="dashContainerInner">
                    {/* show in card */}
                    {halls.map((hall) => (
                        <Card style={{ width: '18rem', height: '30rem', marginTop: '10px' }}>
                            <Card.Img variant="top" src={hall.image} style={{ width: '18rem', height: '16rem' }} />
                            <Card.Body>
                                <Card.Title>{hall.name}</Card.Title>
                                <Card.Text>
                                    Type - {hall.type}
                                </Card.Text>
                                <Card.Text>
                                    Capacity - {hall.capacity}
                                </Card.Text>
                                <Card.Text>
                                    Price - Rs.{hall.price}
                                </Card.Text>
                                <Button variant="primary" onClick={() => {
                                    handleOpenEdit(hall);
                                }}>Edit</Button>{' '}
                                <Button variant="danger" onClick={() => {
                                    handleDelete(hall.id);
                                }}>Delete</Button>{' '}
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
            <br /><br />
        </>
    )
}
