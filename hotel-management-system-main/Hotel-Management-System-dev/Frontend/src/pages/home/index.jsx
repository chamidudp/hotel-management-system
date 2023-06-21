import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import './Home.css'

import roomService from '../../services/room.service';
import hallService from '../../services/hall.service';



export default function Home() {

  const image = "https://firebasestorage.googleapis.com/v0/b/srigo-21aaf.appspot.com/o/hotels-hd-wallpapers-image-wallpaper-hotel-ogk-luxury-hotels-1670859821asd.jpg?alt=media&token=97eb21cd-fe4d-458c-ae8c-b6b0bc7c747d"
  const [rooms, setRooms] = useState([]);
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    roomService.getAllRooms().then((res) => {
      setRooms(res.data);
    });
    hallService.getAllHalls().then((res) => {
      setHalls(res.data);
    });
  }, []);

  return (
    <>
      {/* add image */}
      <div className="homeContainer">
        <img src={image} alt=".." style={{ width: '100%' }} />
      </div>
      <br />

      <div className="homeRibbon">
        <Alert variant='secondary'>
          {/* get text on the center */}
          <h4 style={{ textAlign: 'center' }}>Rooms</h4>
        </Alert>

        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {rooms.slice(0, 6).map((item) => (
            <SwiperSlide key={item.id}>
              <a href={`/hallOne/${item.id}`} className="content">
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
                    <ListGroup.Item style={{ height: '3rem' }}><Button variant="primary">View Hall</Button></ListGroup.Item>
                  </ListGroup>
                </Card>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
      <br />

      <div className="homeRibbon">
        <Alert variant='secondary'>
          {/* get text on the center */}
          <h4 style={{ textAlign: 'center' }}>Halls</h4>
        </Alert>

        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {halls.slice(0, 6).map((item) => (
            <SwiperSlide key={item.id}>
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
                    <ListGroup.Item style={{ height: '3rem' }}><Button variant="primary">View Hall</Button></ListGroup.Item>
                  </ListGroup>
                </Card>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>

      <br /><br /><br />


    </>
  )
}
