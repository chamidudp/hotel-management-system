
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllPlaces() {
  //use useState hook to save fetch data
  const [places, setPlaces]=useState([]);

  //get data from backend
  useEffect(()=>{
      axios.get("http://localhost:8000/place").then((response)=>{
          setPlaces(response.data);
          console.log(places);
      }).catch((err)=>{
          console.log(err)
      })
  },[])
  return (
    <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Days</th>
            <th scope="col">Activities</th>
            <th scope="col">Image</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>

        {places.map((place,index) => (
          <tr key={place._id}>
            <th scope="row">{index+1}</th>
            <td>{place.name}</td>
            <td>{place.description}</td>
            <td>{place.days}</td>
            <td>{place.activities}</td>
            <td><img style={{width:"60px",height:"60px", borderRadius:"25px"}} src={`http://localhost:8000/${place.image}`}/></td>
            <td>RS.{place.price}</td>
            
          </tr>
        ))}

        </tbody>
      </table>
  
  )

}

export default AllPlaces
