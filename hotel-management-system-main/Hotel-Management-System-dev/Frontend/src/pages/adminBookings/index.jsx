import React, { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import html2pdf from 'html2pdf.js';

import '../../styles/dashboard.css'

import hallBookingService from '../../services/hallBooking.Service';
import roomBookingService from '../../services/roomBooking.Service';
import hallService from '../../services/hall.Service';
import roomService from '../../services/room.Service';

export default function AdminBooking() {

    const [hallBookings, setHallBookings] = useState([]);
    const [roomBookings, setRoomBookings] = useState([]);

    useEffect(() => {
        hallBookingService.getAllHallBookings(localStorage.getItem("id")).then((res) => {
            setHallBookings(res.data);
        });
    }, []);

    useEffect(() => {
        roomBookingService.getAllRoomBookings(localStorage.getItem("id")).then((res) => {
            setRoomBookings(res.data);
        });
    }, []);

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

    const [showRoomStats, setShowRoomStats] = useState(false);

    const handleCloseRoomStats = () => setShowRoomStats(false);
    const handleShowRoomStats = () => setShowRoomStats(true);

    const [hallIncome, setHallIncome] = useState(0);
    const [roomIncome, setRoomIncome] = useState(0);

    async function manageReport() {
        handleShowRoomStats();

        var hallIncome = 0;
        var roomIncome = 0;

        //get hall id by hallBooking and get price by hall id
        for (let i = 0; i < hallBookings.length; i++) {
            let hallId = hallBookings[i].customer_id;
            let hall = await hallService.getHallById(hallId);
            console.log(hall.data, "hall")
            console.log(hallIncome, "hallIncome")
            const price = hall.data.price;
            hallIncome += price;
            setHallIncome(hallIncome);
        }

        //get room id by roomBooking and get price by room id
        for (let i = 0; i < roomBookings.length; i++) {
            let roomId = roomBookings[i].room_id;
            let room = await roomService.getRoomById(roomId);
            console.log(room.data, "room")
            console.log(roomIncome, "roomIncome")
            const price = room.data.price;
            roomIncome += price;
            setRoomIncome(roomIncome);
        }
    }

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
                    hallBookingService.getAllHallBookings().then((res) => {
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
                    roomBookingService.getAllRoomBookings().then((res) => {
                        console.log(res.data);
                        setRoomBookings(res.data);
                    });
                });
            }
        });
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
                    <Modal.Title>Report</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div ref={stats}>
                        <div className="row">
                            <p>Total Income by Wedding Halls : Rs. {hallIncome}</p>
                            <p>Total Income by Rooms : Rs. {roomIncome}</p>
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

            <br />
            <div className="dashContainerNorm cus">
                <h1>Admin Dashboard</h1>
                <Button variant="primary" onClick={manageReport}>Get Income Reports</Button>{' '}
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
        </>
    )
}
