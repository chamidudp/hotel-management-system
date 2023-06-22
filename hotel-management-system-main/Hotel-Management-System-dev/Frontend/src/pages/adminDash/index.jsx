import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import '../../styles/dashboard.css'

export default function AdminDash() {

    const booking = "https://firebasestorage.googleapis.com/v0/b/srigo-c895d.appspot.com/o/rsssss%2Fappointment-booking-with-woman-checking-smartphone_23-2148558795.jpg?alt=media&token=de9b9fe5-343e-4959-989b-993e481cbbf5"
    const msg = "https://firebasestorage.googleapis.com/v0/b/srigo-c895d.appspot.com/o/rsssss%2Fusers-with-speech-bubbles-vector_53876-77881.jpg?alt=media&token=cc7bd4c7-f293-4aa6-afce-7e524452f1fa"
    const cus = "https://firebasestorage.googleapis.com/v0/b/srigo-c895d.appspot.com/o/rsssss%2Fhospital-receptionist-pointing-man-without-mask-nurse-patient-quarantine-flat-vector-illustration-medicine-pandemic_74855-8427.jpg?alt=media&token=a1b7d18a-7686-4048-a4a6-1ab8c0617b65"
    const hall = "https://firebasestorage.googleapis.com/v0/b/srigo-c895d.appspot.com/o/rsssss%2Fmedieval-castle-ballroom-historical-museum-hall-cartoon-vector-background-shiny-tiled-floor-red-curtains-big-window-high-columns-flags-with-heraldic-emblem-tapestry-walls-illustration_1441-3108.jpg?alt=media&token=dcc988bd-9e34-499e-b388-243d41494a0a"
    const room = "https://firebasestorage.googleapis.com/v0/b/srigo-c895d.appspot.com/o/rsssss%2Fhotel-room-with-bed-interior-design-background-window-with-curtains-bed-with-pillows-towels-lamp-happy-holiday-vacation-staying-modern-hotel-with-view-city_575670-2063.avif?alt=media&token=d66225c3-6fcb-42a6-8dda-b40f657cc7b1"
    const rep = "https://firebasestorage.googleapis.com/v0/b/srigo-c895d.appspot.com/o/rsssss%2Ffemale-client-visitor-talking-with-receptionist-desk-speech-bubble-laptop-flat-vector-illustration-service-communication_74855-13068.jpg?alt=media&token=09827a55-f374-4e81-b937-e052e5d9d6db"

    return (
        <>
        <br />
        <Button variant="primary" href='https://rococo-pithivier-4cf4b9.netlify.app' style={{textAlign:'center'}}>Manage Inventory</Button>
            <div className="dashContainer">

                <Card style={{ width: '18rem', height: '19rem', backgroundColor: 'white' }}>
                    <Card.Img variant="top" src={booking} />
                    <Card.Body>
                        <Card.Title>View Bookings</Card.Title>
                        <Button variant="primary" href='/adminBookings'>View</Button>
                    </Card.Body>
                </Card>

                <Card style={{ width: '18rem', height: '19rem' }}>
                    <Card.Img variant="top" src={msg} />
                    <Card.Body>
                        <Card.Title>View Messages</Card.Title>
                        <Button variant="primary" href='/adminMessages'>View</Button>
                    </Card.Body>
                </Card>

                <Card style={{ width: '18rem', height: '19rem' }}>
                    <Card.Img variant="top" src={cus} />
                    <Card.Body>
                        <Card.Title>View Customers</Card.Title>
                        <Button variant="primary" href='/adminCustomers'>View</Button>
                    </Card.Body>
                </Card>

                <Card style={{ width: '18rem', height: '19rem' }}>
                    <Card.Img variant="top" src={hall} />
                    <Card.Body>
                        <Card.Title>Manage Wedding Halls</Card.Title>
                        <Button variant="primary" href='/adminHalls'>View</Button>
                    </Card.Body>
                </Card>

                <Card style={{ width: '18rem', height: '19rem' }}>
                    <Card.Img variant="top" src={room} />
                    <Card.Body>
                        <Card.Title>Manage Rooms</Card.Title>
                        <Button variant="primary" href='/adminRooms'>View</Button>
                    </Card.Body>
                </Card>

                <Card style={{ width: '18rem', height: '19rem' }}>
                    <Card.Img variant="top" src={rep} />
                    <Card.Body>
                        <Card.Title>Manage Receptionists</Card.Title>
                        <Button variant="primary" href='/adminRecepts'>View</Button>
                    </Card.Body>
                </Card>

                



            </div>
        </>
    )
}
