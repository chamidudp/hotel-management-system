import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import '../../styles/view.css'

import roomService from '../../services/room.service';
import roomBookingService from '../../services/roomBooking.service';

export default function RoomOne() {

    const [room, setRoom] = useState({});
    const { id } = useParams();

    //schema for validation
    //schema for validation
    const validationSchema = Yup.object({
        booking_date: Yup.date()
            .min(new Date(), "Date must be after today")
            .required('Required'),
        booking_time: Yup.string().required('Required'),
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        roomService.getRoomById(id).then((res) => {
            console.log(res.data);
            setRoom(res.data);
        });
    }, []);

    function handleBookingOpen() {
        if (localStorage.getItem('id') == null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Login to Continue!',
            })
        } else {
            handleShow();
        }
    }

    async function handleBooking(values) {
        const data = {
            booking_date: values.booking_date,
            booking_time: values.booking_time,
            room_id: id,
            customer_id: localStorage.getItem('id'),
        };

        await roomBookingService.addRoomBooking(data).then((res) => {
            console.log(res.data);
            if (res.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Booking Successful!',
                })
                    .then(() => {
                        // got to cus Dash
                        window.location.href = '/cusDash';

                    })
            }

        }).catch((err) => {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        })
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
                    <Modal.Title>Book This Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            booking_date: '',
                            booking_time: '',
                        }}

                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            handleBooking(values);
                        }}
                    >

                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="booking_date">Booking Date</label>
                                    <Field name="booking_date" type="date" className={'form-control' + (errors.booking_date && touched.booking_date ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.booking_date}</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="booking_time">Booking Time</label>
                                    <Field name="booking_time" type="time" className={'form-control' + (errors.booking_time && touched.booking_time ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.booking_time}</div>
                                </div>
                                <br />
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-2">Book</button>
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

            <br />
            <div className='viewOne'>

                <Row>
                    <Col sm={4}>
                        <h1>{room.name}</h1>
                        <br />
                        <h3>Type: {room.type}</h3>
                        <br />
                        <h3>Capacity: {room.capacity}</h3>
                        <br />
                        <h3>Price: Rs. {room.price}</h3>
                        <br />

                        <h4>{room.description}</h4>
                        <br />

                    </Col>
                    <Col>
                        <img src={room.image} alt="Hall Image" style={{ width: '500px', height: '300px' }} />
                        <br />
                        <br />
                        <Button variant="primary" onClick={handleBookingOpen}>Book This Hall</Button>{' '}
                    </Col>
                </Row>
            </div >
            <br />
            <br />
            <br />
        </>
    )
}
