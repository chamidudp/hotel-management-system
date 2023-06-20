import React, {useState, useEffect} from 'react';
import axios from "axios";


function DeletePlace() {
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

  //handle delete place 
  const handleDelete=(id)=>{
   axios.delete(`http://localhost:8000/place/delete/${id}`).then((response)=>{
     
     alert(response.data);
     setPlaces(places.filter((place)=>place._id !==id));

   }).catch((error)=>{
     alert(error)
   })

 }
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
            <th scope="col">Action</th>
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
            <td> 
              <button type="button" class="btn btn-danger" onClick={()=>handleDelete(place._id)}>Delete</button>
            </td>  
          </tr>
        ))}

        </tbody>
      </table>
  
  )

}

export default DeletePlace
