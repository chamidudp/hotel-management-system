import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PlaceBookings() {
        //use useState hook to save fetch data
        const [bookings, setBookings]=useState([]);
        
        //get data from backend
        useEffect(()=>{
            axios.get("http://localhost:8000/booking").then((response)=>{
                setBookings(response.data);
            }).catch((err)=>{
                console.log(err)
            })
        },[])

        
  //handle delete booking 
  const handleDelete=(id)=>{
    axios.delete(`http://localhost:8000/booking/delete/${id}`).then((response)=>{
      
      alert(response.data);
      setBookings(bookings.filter((booking)=>booking._id !==id));
 
    }).catch((error)=>{
      alert(error)
    })
 
  }
  return (
    <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Vehicle Name</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Contact Number</th>
            <th scope="col">Address</th>
            <th scope="col">Days</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>

        {bookings.map((booking,index) => (
          <tr key={booking._id}>
            <th scope="row">{index+1}</th>
            <td>{booking.place}</td>
            <td>{booking.name}</td>
            <td>{booking.contactNumber}</td>
            <td>{booking.address}</td>
            <td>{booking.days}</td>
            <td> 
              <button type="button" class="btn btn-success" onClick={()=>handleDelete(booking._id)}>Accept</button>
            </td>
            
            
          </tr>
        ))}

        </tbody>
      </table>
    
  )
}

export default PlaceBookings
