import React, { useEffect, useState } from 'react';
import axios from 'axios';


function UpdatePlace() {
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

  // set place id
  const [placeId, setPlaceId]=useState(null);

  //set place data
  const [placeData, setPlaceData]=useState({
    name:"",
    description:"",
    days:"",
    price:"",
    activities:"",
    image:""
  });

// handle submit
const handleSubmit=(event)=>{
  event.preventDefault();

  // axios.put(`http://localhost:8000/place/update/${placeId}`,placeData,{
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  // }).then((response)=>{
  //   alert(response.data);
  // }).catch((error)=>{
  //   console.log(error)
  // });


}

  //handle onChange other inputes 
  const handleOnChange=(event)=>{
    setPlaceData({
      ...placeData,
      [event.target.name]:event.target.defaultValue 
    });
  }

 // const handleIdOnChange
  const handleIdOnChange=(event)=>{
    setPlaceId(event.target.value);

  }

  //handle Image onChange input
  const handleImageOnChange= async(event)=>{
    const file=event.target.files[0];
    // const base64=await convertToBase64(file);
    setPlaceData({
      ...placeData,
      image:file
  
    })
  }
  return (
    <form onSubmit={handleSubmit}>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Mongo ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Days</th>
              <th scope="col">Activities</th>
              <th scope="col">Image</th>
              <th scope="col">Upload Image</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
  
          {places.map((place,index) => (
            
              <tr key={place._id}>
                <th scope="row">{index+1}</th>
                <td><input  type="text" class="form-control" name='id' onChange={handleIdOnChange} value={place._id}  /></td>
                <td><input  type="text" class="form-control" name='name' onChange={handleOnChange} defaultValue={place.name}/></td>
                <td><input type="text" class="form-control"  name='description' onChange={handleOnChange} defaultValue={place.description}  /></td>
                <td><input type="text" class="form-control"  name='days' onChange={handleOnChange} defaultValue={place.days}  /></td>
                <td><input type="text" class="form-control"  name='activities'  onChange={handleOnChange} defaultValue={place.activities}  /></td>
                <td><img style={{width:"60px",height:"60px", borderRadius:"25px"}} src={`http://localhost:8000/${place.image}`}/></td>
                <input type="file" class="form-control"  name='image' accept='.jpg, .png, .jpeg'  onChange={handleImageOnChange} />
                <td><input type="text" class="form-control"  name='price'  onChange={handleOnChange} defaultValue={place.price}  /></td>
                <button style={{color:"white",backgroundColor:"green"}} type='submit' class="btn btn-success" >Update</button>
              </tr>
           
          ))}
  
          </tbody>
        </table>
      </form>

  )
}

export default UpdatePlace
