import React, { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import html2pdf from 'html2pdf.js';

import '../../styles/dashboard.css'

import hallBookingService from '../../services/hallBooking.Service';
import roomBookingService from '../../services/roomBooking.Service';
import hallService from '../../services/hall.Service';
import roomService from '../../services/room.Service';
import customerService from '../../services/customer.Service';

export default function CusDash() {

    const [hallBookings, setHallBookings] = useState([]);
    const [roomBookings, setRoomBookings] = useState([]);

    const [hall, setHall] = useState({});
    const [room, setRoom] = useState({});
    const [date, setDate] = useState('');

    const [filterDate, setFilterDate] = useState('');

    const [hallBooking, setHallBooking] = useState({});
    const [roomBooking, setRoomBooking] = useState({});
    const [user, setUser] = useState({});

    const [showHall, setShowHall] = useState(false);

    const handleCloseHall = () => setShowHall(false);
    const handleShowHall = () => setShowHall(true);

    const [showRoom, setShowRoom] = useState(false);

    const handleCloseRoom = () => setShowRoom(false);
    const handleShowRoom = () => setShowRoom(true);

    const [showCus, setShowCus] = useState(false);

    const handleCloseCus = () => setShowCus(false);
    const handleShowCus = () => setShowCus(true);

    const [showRoomStats, setShowRoomStats] = useState(false);

    const handleCloseRoomStats = () => setShowRoomStats(false);
    const handleShowRoomStats = () => setShowRoomStats(true);

    const [showHallStats, setShowHallStats] = useState(false);

    const handleCloseHallStats = () => setShowHallStats(false);
    const handleShowHallStats = () => setShowHallStats(true);

    //validation schema
    const validationSchema = Yup.object().shape({
        booking_date: Yup.date()
            .required('Booking Date is required')
            .min(new Date(), 'Booking Date cannot be in the past'),
        booking_time: Yup.string()
            .required('Booking Time is required'),
    });

    //validation schema
    const userValidationSchema = Yup.object({
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
    })

    useEffect(() => {
        hallBookingService.getHallBookingByCustomerId(localStorage.getItem("id")).then((res) => {
            //console.log(res.data);
            setHallBookings(res.data);
        });
    }, []);

    useEffect(() => {
        roomBookingService.getRoomBookingByCustomerId(localStorage.getItem("id")).then((res) => {
            //console.log(res.data);
            setRoomBookings(res.data);
        });
    }, []);

    useEffect(() => {
        customerService.getCustomerById(localStorage.getItem("id")).then((res) => {
            console.log(res.data);
            setUser(res.data);
        });
    }, []);

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

    function generatePDF(element) {
        const opt = {
            margin: 1,
            filename: 'Receipt.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().from(element).set(opt).save();
    }

    const stats = useRef(null);

    function handleDownloadPDF() {
        console.log(stats.current, "stats")
        generatePDF(stats.current);
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

    function handleRoomEdit(record) {
        setRoomBooking(record);
        handleShowRoom();
    }

    function handleHallEdit(record) {
        setHallBooking(record);
        handleShowHall();
    }

    async function setHallRecord(values, date) {
        await hallService.getHallById(values.customer_id).then((res) => {
            setHall(res.data);
        });
        console.log(hall);
        setHallBooking(values);
        handleShowHallStats();
        setDate(date);
    }

    async function setRoomRecord(values, date) {
        await roomService.getRoomById(values.room_id).then((res) => {
            setRoom(res.data);
        });
        console.log(room);
        setRoomBooking(values);
        handleShowRoomStats();
        setDate(date);
    }

    return (
        <>

            <Modal
                show={showRoomStats}
                onHide={handleCloseRoomStats}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Receipt</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div ref={stats}>
                        <div className="row">
                            <div className="col-md-8">
                                <h5>Room Booking Details</h5>
                                <p>Room Booking ID: {roomBooking.id}</p>
                                <p>Room ID: {roomBooking.room_id}</p>
                                <p>Room Name: {room.name}</p>
                                <p>Room Type: {room.type}</p>
                                <p>Room Price: Rs. {room.price}</p>
                                <p>Room Booking Date: {date}</p>
                                <p>Room Booking Time: {roomBooking.booking_time}</p>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRoomStats}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDownloadPDF}>Download Stats</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showHallStats}
                onHide={handleCloseHallStats}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Receipt</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div ref={stats}>
                        <div className="row">
                            <div className="col-md-10">
                                <h5>Hall Booking Details</h5>
                                <p>Hall Booking ID: {hallBooking.id}</p>
                                <p>Hall ID: {hallBooking.hall_id}</p>
                                <p>Hall Name: {hall.name}</p>
                                <p>Hall Type: {hall.type}</p>
                                <p>Hall Price: Rs. {hall.price}</p>
                                <p>Room Booking Date: {date}</p>
                                <p>Hall Booking Time: {hallBooking.booking_time}</p>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseHallStats}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDownloadPDF}>Download Stats</Button>
                </Modal.Footer>
            </Modal>
            {/* cus update modal */}
            <Modal
                show={showCus}
                onHide={handleCloseCus}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={
                            {
                                name: user.NAME,
                                email: user.EMAIL,
                                nic: user.NIC,
                                address: user.ADDRESS,
                                phone: user.PHONE,
                                password: ''
                            }
                        }
                        validationSchema={userValidationSchema}
                        onSubmit={(values) => {
                            console.log(values);
                            const data = {
                                name: values.name,
                                email: values.email,
                                nic: values.nic,
                                address: values.address,
                                phone: values.phone,
                                password: values.password,
                            };

                            customerService.updateCustomer(localStorage.getItem("id"), data).then((res) => {
                                console.log(res.data);
                                Swal.fire(
                                    'Updated!',
                                    'Your customer has been updated.',
                                    'success'
                                ).then(() => {
                                    customerService.getCustomerById(localStorage.getItem("id")).then((res) => {
                                        console.log(res.data);
                                        setUser(res.data);
                                        handleCloseCus();
                                    });
                                });
                            });
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
                                <br />
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-2">Update</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCus}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>



            <Modal
                show={showHall}
                onHide={handleCloseHall}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Hall Booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={hallBooking}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            const data = {
                                booking_date: values.booking_date,
                                hall_id: hallBooking.id,
                                customer_id: localStorage.getItem("id"),
                                booking_time: values.booking_time,
                            };
                            hallBookingService.updateHallBooking(hallBooking.id, data).then((res) => {
                                console.log(res.data);
                                Swal.fire(
                                    'Updated!',
                                    'Your hall booking has been updated.',
                                    'success'
                                ).then(() => {
                                    hallBookingService.getHallBookingByCustomerId(localStorage.getItem("id")).then((res) => {
                                        console.log(res.data);
                                        setHallBookings(res.data);
                                        handleCloseHall();
                                    });
                                });
                            });
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="booking_date">Booking Date</label>
                                    <Field
                                        type="date"
                                        name="booking_date"
                                        id="booking_date"
                                        className={`form-control ${touched.booking_date && errors.booking_date ? 'is-invalid' : ''
                                            }`}
                                    />
                                    <small id="booking_date" className="form-text text-muted">
                                        {touched.booking_date && errors.booking_date ? (
                                            <div className="invalid-feedback">{errors.booking_date}</div>
                                        ) : null}
                                    </small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="booking_time">Booking Time</label>
                                    <Field
                                        type="time"
                                        name="booking_time"
                                        id="booking_time"
                                        className={`form-control ${touched.booking_time && errors.booking_time ? 'is-invalid' : ''
                                            }`}
                                    />
                                    <small id="booking_time" className="form-text text-muted">
                                        {touched.booking_time && errors.booking_time ? (
                                            <div className="invalid-feedback">{errors.booking_time}</div>
                                        ) : null}
                                    </small>
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Update
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
            </Modal >


            <Modal
                show={showRoom}
                onHide={handleCloseRoom}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Room Booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={
                            {
                                booking_date: roomBooking.booking_date,
                                booking_time: roomBooking.booking_time,
                            }
                        }
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            const data = {
                                booking_date: values.booking_date,
                                room_id: roomBooking.id,
                                customer_id: localStorage.getItem("id"),
                                booking_time: values.booking_time,
                            };
                            roomBookingService.updateRoomBooking(roomBooking.id, data).then((res) => {
                                console.log(res.data);
                                Swal.fire(
                                    'Updated!',
                                    'Your room booking has been updated.',
                                    'success'
                                ).then(() => {
                                    roomBookingService.getRoomBookingByCustomerId(localStorage.getItem("id")).then((res) => {
                                        console.log(res.data);
                                        setRoomBookings(res.data);
                                        handleCloseRoom();
                                    });
                                });
                            });
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="booking_date">Booking Date</label>
                                    <Field
                                        type="date"
                                        name="booking_date"
                                        id="booking_date"
                                        className={`form-control ${touched.booking_date && errors.booking_date ? 'is-invalid' : ''

                                            }`}
                                    />
                                    <small id="booking_date" className="form-text text-muted">
                                        {touched.booking_date && errors.booking_date ? (
                                            <div className="invalid-feedback">{errors.booking_date}</div>
                                        ) : null}
                                    </small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="booking_time">Booking Time</label>
                                    <Field
                                        type="time"
                                        name="booking_time"
                                        id="booking_time"
                                        className={`form-control ${touched.booking_time && errors.booking_time ? 'is-invalid' : ''

                                            }`}
                                    />
                                    <small id="booking_time" className="form-text text-muted">
                                        {touched.booking_time && errors.booking_time ? (
                                            <div className="invalid-feedback">{errors.booking_time}</div>
                                        ) : null}
                                    </small>
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Update
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
            </Modal >


            <br />
            <div className="dashContainerNorm cus">
                <Row>
                    <Col><h1>Customer Dashboard</h1>
                    </Col>
                    <Col>
                        {/* input date for filtering */}
                        <div className="filter">
                            <h4>Filter by Date</h4>
                            <input type="date" onChange={(e) => {
                                setFilterDate(e.target.value);
                            }} />
                        </div>

                    </Col>
                </Row>

                <Button variant="primary" onClick={handleShowCus}>Update Customer Profile</Button>{' '}
                <br /><br /><br />
                <h4>Hall Bookings</h4>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>View Hall</th>
                            <th>Booked Date</th>
                            <th>Booked Time</th>
                            <th>Get Receipt</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hallBookings.filter((val) => {
                            if (filterDate === "") {
                                return val;
                            } else if (val.booking_date.slice(0, 10) === filterDate) {
                                return val;
                            }
                        }).map((item) => (
                            <tr>
                                <td>{item.id}</td>
                                <td><a href={`/hallOne/${item.customer_id}`} target='_blank'><td><Button variant="primary">View Hall</Button></td></a></td>
                                <td>{item.booking_date.slice(0, 10)}</td>
                                <td>{item.booking_time}</td>
                                <td><Button variant="info" onClick={() => {
                                    setHallRecord(item, item.booking_date.slice(0, 10));
                                }}>Download</Button>{' '}</td>
                                <td>
                                    <Button variant="success" onClick={() => {
                                        handleHallEdit(item);
                                    }}>Update Booking</Button>
                                    &nbsp;
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
                            <th>Get Receipt</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roomBookings.filter((val) => {
                            if (filterDate === "") {
                                return val;
                            } else if (val.booking_date.slice(0, 10) === filterDate) {
                                return val;
                            }
                        }).map((item) => (
                            <tr>
                                <td>{item.id}</td>
                                <td><a href={`/roomOne/${item.customer_id}`} target='_blank'><td><Button variant="primary">View Room</Button></td></a></td>
                                <td>{item.booking_date.slice(0, 10)}</td>
                                <td>{item.booking_time}</td>
                                <td><Button variant="info" onClick={() => {
                                    setRoomRecord(item, item.booking_date.slice(0, 10));
                                }}>Download</Button>{' '}</td>
                                <td>
                                    <Button variant="success" onClick={() => {
                                        handleRoomEdit(item);
                                    }}>Update Booking</Button>
                                    &nbsp;
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
        </>
    )
}
