import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import '../../styles/view.css'

import roomService from '../../services/room.service';

export default function Rooms() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        roomService.getAllRooms().then((res) => {
            setRooms(res.data);
        });
    }, []);


    return (
        <>
            <div className="viewContainer">
                <Alert variant='secondary'>
                    {/* get text on the center */}
                    <h4 style={{ textAlign: 'center' }}>Wedding Rooms</h4>
                </Alert>

                <div className="viewContainerInner">
                    {rooms.map((item) => (
                        <a href={`/roomOne/${item.id}`} className="content">
                            <Card style={{ width: '18rem', margin: '10px' }}>
                                <Card.Img variant="top" src={item.image} style={{ height: '10rem', }} />
                                <Card.Body>
                                    <Card.Title style={{ height: '1rem' }}>{item.name}</Card.Title>
                                    <br />
                                    <Card.Title style={{ height: '2rem' }}>{item.type}</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item style={{ height: '3rem' }}>Capacity : {item.capacity}</ListGroup.Item>
                                </ListGroup>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item style={{ height: '3rem' }}>Price: Rs. {item.price.toFixed(2)}</ListGroup.Item>
                                </ListGroup>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item style={{ height: '3rem' }}><Button variant="primary">View Room</Button></ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </a>
                    ))}
                </div>
            </div>
            <br />
        </>
    )
}
