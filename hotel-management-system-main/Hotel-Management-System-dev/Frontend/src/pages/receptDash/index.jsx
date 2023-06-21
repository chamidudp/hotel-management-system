import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import '../../styles/dashboard.css'

import hallBookingService from '../../services/hallBooking.Service';
import roomBookingService from '../../services/roomBooking.Service';
import hallService from '../../services/hall.Service';
import roomService from '../../services/room.Service';

export default function ReceptDash() {
    const [hallBookings, setHallBookings] = useState([]);
    const [roomBookings, setRoomBookings] = useState([]);
    const [halls, setHalls] = useState([]);
    const [rooms, setRooms] = useState([]);

    const [showHall, setShowHall] = useState(false);

    const handleCloseHall = () => setShowHall(false);
    const handleShowHall = () => setShowHall(true);


    const [showRoom, setShowRoom] = useState(false);

    const handleCloseRoom = () => setShowRoom(false);
    const handleShowRoom = () => setShowRoom(true);


    //  get all hall bookings
    useEffect(() => {
        hallBookingService.getAllHallBookings().then((res) => {
            console.log(res.data);
            setHallBookings(res.data);
        });
    }, []);

    //  get all room bookings
    useEffect(() => {
        roomBookingService.getAllRoomBookings().then((res) => {
            console.log(res.data);
            setRoomBookings(res.data);
        });
    }, []);

    //  get all halls
    useEffect(() => {
        hallService.getAllHalls().then((res) => {
            console.log(res.data);
            setHalls(res.data);
        });
    }, []);

    //  get all rooms
    useEffect(() => {
        roomService.getAllRooms().then((res) => {
            console.log(res.data);
            setRooms(res.data);
        });
    }, []);

    const BookingSchema = Yup.object().shape({
        booking_date: Yup.date()
            .required('Required'),
        booking_time: Yup.string()
            .required('Required'),
        item_id: Yup.string()
            .required('Required'),
    });


    async function deleteHallBooking(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this hall booking!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await hallBookingService.deleteHallBooking(id);
                Swal.fire(
                    'Deleted!',
                    'Your hall booking has been deleted.',
                    'success'
                ).then(() => {
                    hallBookingService.getHallBookingByCustomerId(localStorage.getItem("id")).then((res) => {
                        console.log(res.data);
                        setHallBookings(res.data);
                    });
                });
            }
        });
    }

    async function deleteRoomBooking(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this room booking!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await roomBookingService.deleteRoomBooking(id);
                Swal.fire(
                    'Deleted!',
                    'Your room booking has been deleted.',
                    'success'
                ).then(() => {
                    roomBookingService.getRoomBookingByCustomerId(localStorage.getItem("id")).then((res) => {
                        console.log(res.data);
                        setRoomBookings(res.data);
                    });
                });
            }
        });
    }

    async function addHallBooking(values) {
        console.log(values);
        const data = {
            booking_date: values.booking_date,
            booking_time: values.booking_time,
            hall_id: values.item_id,
            customer_id: 99,
        };

        await hallBookingService.addHallBooking(data);
        Swal.fire(
            'Success!',
            'Your hall booking has been added.',
            'success'
        ).then(() => {
            hallBookingService.getAllHallBookings().then((res) => {
                console.log(res.data);
                setHallBookings(res.data);
                handleCloseHall();
            });
        });
    }

    async function addRoomBooking(values) {
        console.log(values);
        const data = {
            booking_date: values.booking_date,
            booking_time: values.booking_time,
            room_id: values.item_id,
            customer_id: 99,
        };

        await roomBookingService.addRoomBooking(data);
        Swal.fire(
            'Success!',
            'Your room booking has been added.',
            'success'
        ).then(() => {
            roomBookingService.getAllRoomBookings().then((res) => {
                console.log(res.data);
                setRoomBookings(res.data);
                handleCloseRoom();
            });
        });
    }

    return (
        <>
            <Modal
                show={showHall}
                onHide={handleCloseHall}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Book Hall</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            booking_date: '',
                            booking_time: '',
                            item_id: '',
                        }}

                        validationSchema={BookingSchema}

                        onSubmit={(values) => {
                            console.log(values);
                            addHallBooking(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                {/* booking date */}
                                <div className="form-group">
                                    <label htmlFor="booking_date">Booking Date</label>
                                    <Field
                                        type="date"
                                        className={`form-control ${touched.booking_date && errors.booking_date ? 'is-invalid' : ''
                                            }`}
                                        name="booking_date"
                                    />

                                </div>

                                {/* booking time */}
                                <div className="form-group">
                                    <label htmlFor="booking_time">Booking Time</label>
                                    <Field
                                        type="time"
                                        className={`form-control ${touched.booking_time && errors.booking_time ? 'is-invalid' : ''
                                            }`}
                                        name="booking_time"
                                    />
                                    {touched.booking_time && errors.booking_time ? (
                                        <div className="invalid-feedback">{errors.booking_time}</div>
                                    ) : null}
                                </div>

                                {/* hall */}
                                <div className="form-group">
                                    <label htmlFor="item_id">Hall</label>
                                    <Field
                                        as="select"
                                        name="item_id"
                                        className={`form-control ${touched.item_id && errors.item_id ? 'is-invalid' : ''
                                            }`}
                                    >
                                        <option value="">Select Hall</option>
                                        {halls.map((hall) => (
                                            <option key={hall.id} value={hall.id}>
                                                {hall.name}
                                            </option>
                                        ))}
                                    </Field>
                                    {touched.item_id && errors.item_id ? (
                                        <div className="invalid-feedback">{errors.item_id}</div>
                                    ) : null}
                                </div>
                                <br />

                                <button type="submit" className="btn btn-primary mr-2">
                                    Submit
                                </button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseHall}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showRoom}
                onHide={handleCloseRoom}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Book Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            booking_date: '',
                            booking_time: '',
                            item_id: '',
                        }}

                        validationSchema={BookingSchema}

                        onSubmit={(values) => {
                            console.log(values);
                            addRoomBooking(values);
                        }}
                    >

                        {({ errors, touched }) => (
                            <Form>
                                {/* booking date */}
                                <div className="form-group">
                                    <label htmlFor="booking_date">Booking Date</label>
                                    <Field
                                        type="date"
                                        className={`form-control ${touched.booking_date && errors.booking_date ? 'is-invalid' : ''
                                            }`}
                                        name="booking_date"
                                    />

                                </div>

                                {/* booking time */}
                                <div className="form-group">
                                    <label htmlFor="booking_time">Booking Time</label>
                                    <Field
                                        type="time"
                                        className={`form-control ${touched.booking_time && errors.booking_time ? 'is-invalid' : ''
                                            }`}
                                        name="booking_time"
                                    />
                                    {touched.booking_time && errors.booking_time ? (
                                        <div className="invalid-feedback">{errors.booking_time}</div>
                                    ) : null}
                                </div>

                                {/* room */}
                                <div className="form-group">
                                    <label htmlFor="item_id">Room</label>
                                    <Field
                                        as="select"
                                        name="item_id"
                                        className={`form-control ${touched.item_id && errors.item_id ? 'is-invalid' : ''
                                            }`}
                                    >
                                        <option value="">Select Room</option>
                                        {rooms.map((room) => (
                                            <option key={room.id} value={room.id}>
                                                {room.name}
                                            </option>
                                        ))}
                                    </Field>
                                    {touched.item_id && errors.item_id ? (
                                        <div className="invalid-feedback">{errors.item_id}</div>
                                    ) : null}

                                </div>
                                <br />

                                <button type="submit" className="btn btn-primary mr-2">
                                    Submit
                                </button>

                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRoom}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="dashContainerNorm cus">
                <h1>Receptionist Dashboard</h1>
                <Button variant="primary" onClick={handleShowRoom}>Add Room Booking</Button>{' '}
                <Button variant="primary" onClick={handleShowHall}>Add Hall Booking</Button>{' '}
                <br /><br /><br />
                <h4>Hall Bookings</h4>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>View Hall</th>
                            <th>Booked Date</th>
                            <th>Booked Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hallBookings.map((item) => (
                            <tr>
                                <td>{item.id}</td>
                                <td><a href={`/hallOne/${item.customer_id}`} target='_blank'><td><Button variant="primary">View Hall</Button></td></a></td>
                                <td>{item.booking_date.slice(0, 10)}</td>
                                <td>{item.booking_time}</td>
                                <td>
                                    <Button variant="danger" onClick={() => {
                                        deleteHallBooking(item.id);
                                    }}>Cancel Booking</Button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>

                <br />
                <h4>Room Bookings</h4>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>View Room</th>
                            <th>Booked Date</th>
                            <th>Booked Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roomBookings.map((item) => (
                            <tr>
                                <td>{item.id}</td>
                                <td><a href={`/roomOne/${item.id}`} target='_blank'><td><Button variant="primary">View Room</Button></td></a></td>
                                <td>{item.booking_date.slice(0, 10)}</td>
                                <td>{item.booking_time}</td>
                                <td>
                                    <Button variant="danger" onClick={() => {
                                        deleteRoomBooking(item.id);
                                    }}>Cancel Booking</Button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>

            </div>
            <br />
            <br />
        </>
    )
}
