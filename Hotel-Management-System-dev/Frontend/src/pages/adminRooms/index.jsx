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

import roomService from '../../services/room.service';

export default function AdminRooms() {

    const [rooms, setRooms] = useState([]);
    const [room, setRoom] = useState({});
    const [show, setShow] = useState(false);

    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true)

    useEffect(() => {
        roomService.getAllRooms().then(response => {
            setRooms(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    //validation schema
    const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        type: Yup.string().required("Type is required"),
        capacity: Yup.number().required("Capacity is required"),
        price: Yup.number().required("Price is required"),
        description: Yup.string().required("Description is required"),
    });

    //add room
    async function handleAdd(values) {
        console.log(values);
        const storageRef = ref(storage, `/images/${file.name}` + v4());

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
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
                        image: url,
                    };
                    roomService.addRoom(data).then(response => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Room added successfully',
                        })
                        handleCloseAdd();
                        setPercent(0);
                        roomService.getAllRooms().then(response => {
                            setRooms(response.data);
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

    //delete room
    async function handleDelete(id) {
        console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this room?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                roomService.deleteRoom(id).then(response => {
                    console.log(response.data);
                    Swal.fire(
                        'Deleted!',
                        'Room has been deleted.',
                        'success'
                    )
                    roomService.getAllRooms().then(response => {
                        setRooms(response.data);
                    }).catch(error => {
                        console.log(error);
                    })
                }).catch(error => {
                    console.log(error);
                })
            }
        })
    }

    function handleOpenEdit(record) {
        setRoom(record);
        handleShowEdit();
    }

    //edit room
    async function handleEdit(values) {
        console.log(values);
        const storageRef = ref(storage, `/images/${file.name}` + v4());

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    const data = {
                        name: values.name,
                        type: values.type,
                        capacity: values.capacity,
                        price: values.price,
                        description: values.description,
                        image: url,
                    };

                    roomService.updateRoom(room.id, data).then(response => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Room updated successfully',
                        })
                        handleCloseEdit();
                        setPercent(0);
                        roomService.getAllRooms().then(response => {
                            setRooms(response.data);
                        }).catch(error => {
                            console.log(error);
                        })
                    }
                    ).catch(error => {
                        console.log(error);
                    }
                    )
                });

            }
        );
    }

    return (
        <>
            <Modal
                show={showAdd}
                onHide={handleCloseAdd}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        validationSchema={schema}
                        initialValues={{
                            name: '',
                            type: '',
                            capacity: '',
                            price: '',
                            description: '',
                        }}

                        onSubmit={(values) => {

                            handleAdd(values);
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
                                    <label htmlFor="image">Image</label>
                                    <input
                                        type="file"
                                        id="image"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                    {percent > 0 && <progress value={percent} max="100" />}
                                </div>
                                <br />
                                <Button variant="primary" type="submit">
                                    Add
                                </Button>
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


            <Modal
                show={showEdit}
                onHide={handleCloseEdit}
                backdrop="static"
                keyboard={false}
            >

                <Modal.Header closeButton>
                    <Modal.Title>Edit Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        validationSchema={schema}
                        initialValues={{
                            name: room.name,
                            type: room.type,
                            capacity: room.capacity,
                            price: room.price,
                            description: room.description,
                        }}

                        onSubmit={(values) => {
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
                                    <label htmlFor="image">Image</label>
                                    <input
                                        type="file"
                                        id="image"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                    {percent > 0 && <progress value={percent} max="100" />}
                                </div>
                                <br />
                                <Button variant="primary" type="submit">
                                    Edit
                                </Button>
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
                <Button variant="primary" onClick={handleShowAdd}>
                    Add Room
                </Button>
                <br /><br />
                <div className="dashContainerInner">
                    {rooms.map((room) => (
                        <Card style={{ width: '18rem', height: '30rem', marginTop: '10px' }}>
                            <Card.Img variant="top" src={room.image} style={{ width: '18rem', height: '16rem' }} />
                            <Card.Body>
                                <Card.Title>{room.name}</Card.Title>
                                <Card.Text>
                                    Type - {room.type}
                                </Card.Text>
                                <Card.Text>
                                    Capacity - {room.capacity}
                                </Card.Text>
                                <Card.Text>
                                    Price - Rs.{room.price}
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleOpenEdit(room)}>Edit</Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button variant="danger" onClick={() => handleDelete(room.id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
            <br /><br />
        </>
    )
}
